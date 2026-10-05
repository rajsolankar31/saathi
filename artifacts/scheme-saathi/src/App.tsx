import { useMemo, useState } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, Check, ChevronRight, CircleHelp, ClipboardList, ExternalLink, Languages, Mic, Printer, RotateCcw, ShieldCheck, Sprout, Volume2 } from 'lucide-react';
import {
  schemes, type Profile, type Field, type Rule, type Truth, type Scheme, type Localized,
  options, fieldLabels, questionHelp, supportAreas, initialProfile, evaluate, unresolvedFields, getSchemeResult,
} from './scheme-data';

type Screen = 'language' | 'mode' | 'privacy' | 'category' | 'questions' | 'review' | 'results' | 'detail' | 'prep';
type Language = 'en' | 'hi';
type Mode = 'self' | 'assisted';

const copy: Record<string, Localized> = {
  start: { en: 'Find support that may fit your situation', hi: 'अपनी स्थिति के अनुसार सहायता खोजें' },
  intro: { en: 'A careful first look at selected central government schemes. Choose an area, answer only what is relevant, and check the official source before taking a next step.', hi: 'चुनी हुई केंद्र सरकार की योजनाओं की सावधानीपूर्वक शुरुआती जानकारी। क्षेत्र चुनें, सिर्फ ज़रूरी सवालों के जवाब दें और आगे बढ़ने से पहले आधिकारिक स्रोत देखें।' },
  language: { en: 'Choose a language', hi: 'भाषा चुनें' },
  modeTitle: { en: 'Would you like to explore alone or together?', hi: 'क्या आप अकेले देखना चाहेंगे या किसी के साथ?' },
  modeText: { en: 'Either way, the questions are the same. You can skip anything you do not know.', hi: 'दोनों तरीकों में सवाल एक जैसे हैं। जो जानकारी न हो, उसे छोड़ सकते हैं।' },
  self: { en: 'I am exploring for myself', hi: 'मैं अपने लिए देख रहा / रही हूँ' },
  selfHint: { en: 'Take each step at your own pace.', hi: 'हर कदम अपनी सुविधा से लें।' },
  assisted: { en: 'I am helping someone', hi: 'मैं किसी की मदद कर रहा / रही हूँ' },
  assistedHint: { en: 'Read the questions together. No account or personal identity details are needed.', hi: 'सवाल साथ में पढ़ें। खाते या निजी पहचान की जानकारी की ज़रूरत नहीं।' },
  privacyTitle: { en: 'Your answers stay with you', hi: 'आपके जवाब आपके पास ही रहते हैं' },
  privacyText: { en: 'Answers stay only in this page’s session memory. They are not saved or sent by SchemeSaathi, and disappear when you clear or close the session. Opening an official link transfers information only to that government site. Never type identity or bank numbers into SchemeSaathi.', hi: 'जवाब सिर्फ इस पेज की सेशन मेमोरी में रहते हैं। SchemeSaathi इन्हें सेव या भेजता नहीं है; सेशन मिटाने या पेज बंद करने पर जवाब हट जाते हैं। आधिकारिक लिंक खोलने पर जानकारी केवल उस सरकारी साइट को जाती है। SchemeSaathi में पहचान या बैंक नंबर कभी न लिखें।' },
  categoryTitle: { en: 'What kind of support are you looking for?', hi: 'आप किस तरह की सहायता ढूँढ रहे हैं?' },
  categoryText: { en: 'Choose one area, or look across all seven. We will ask only questions needed for schemes in that selection.', hi: 'एक क्षेत्र चुनें या सभी सात क्षेत्रों में देखें। चुनी गई योजनाओं के लिए ज़रूरी सवाल ही पूछेंगे।' },
  allAreas: { en: 'All support areas', hi: 'सभी सहायता क्षेत्र' },
  allDesc: { en: 'Look across the selected central-scheme catalog', hi: 'चुनी हुई केंद्रीय योजनाओं में देखें' },
  unknown: { en: 'I do not know / skip this', hi: 'पता नहीं / छोड़ें' },
  skipped: { en: 'Not known / skipped', hi: 'पता नहीं / छोड़ा' },
  reviewTitle: { en: 'Review the answers used', hi: 'इस्तेमाल किए गए जवाब देखें' },
  reviewText: { en: 'These are the answers used for this screening. Change any answer before viewing the results.', hi: 'इस शुरुआती जाँच में इन जवाबों का उपयोग होगा। नतीजे देखने से पहले कोई भी जवाब बदल सकते हैं।' },
  resultsTitle: { en: 'A careful first look', hi: 'सावधानीपूर्वक शुरुआती जानकारी' },
  resultsText: { en: 'These statuses compare your reported answers with published screening rules. They do not decide eligibility or promise approval.', hi: 'ये स्थितियाँ आपके बताए जवाबों की प्रकाशित शुरुआती जाँच के नियमों से तुलना करती हैं। ये पात्रता तय नहीं करतीं और मंज़ूरी का वादा नहीं हैं।' },
  caveatTitle: { en: 'Important limits', hi: 'ज़रूरी सीमाएँ' },
  caveat: { en: 'This screening is informational only; only the responsible authority decides eligibility. This first catalog covers selected pan-India central schemes and State/UT-specific catalog coverage is not comprehensive. Rules and processes can change. Confirm current details with the official scheme source or the relevant authority.', hi: 'यह शुरुआती जाँच केवल जानकारी के लिए है; पात्रता का निर्णय केवल संबंधित प्राधिकरण करता है। इस पहली सूची में चुनी हुई पूरे भारत की केंद्रीय योजनाएँ हैं और राज्य/केंद्र शासित प्रदेश की योजनाओं की सूची पूरी नहीं है। नियम और प्रक्रिया बदल सकते हैं। मौजूदा जानकारी आधिकारिक योजना स्रोत या संबंधित प्राधिकरण से पक्की करें।' },
  aligned: { en: 'Reported answers align with published screening rules', hi: 'बताए गए जवाब प्रकाशित शुरुआती जाँच के नियमों से मेल खाते हैं' },
  check: { en: 'More information or an official / path-specific check is needed', hi: 'और जानकारी या आधिकारिक / योजना-मार्ग की जाँच ज़रूरी है' },
  notAligned: { en: 'One or more known screening conditions do not align', hi: 'एक या अधिक ज्ञात शुरुआती शर्तें मेल नहीं खातीं' },
  viewDetails: { en: 'Scheme details', hi: 'योजना का विवरण' },
  reviewAnswers: { en: 'Review answers', hi: 'जवाब देखें' },
  restart: { en: 'Clear answers and start again', hi: 'जवाब मिटाकर फिर शुरू करें' },
  continue: { en: 'Continue', hi: 'आगे बढ़ें' },
  back: { en: 'Back', hi: 'पीछे' },
  compare: { en: 'View screening results', hi: 'जाँच के नतीजे देखें' },
  resultAligned: { en: 'Reported answers align with the published screening rules. The authority must still verify eligibility.', hi: 'बताए गए जवाब प्रकाशित शुरुआती जाँच के नियमों से मेल खाते हैं। पात्रता की पुष्टि फिर भी प्राधिकरण करेगा।' },
  resultUnknown: { en: 'More information or an official / path-specific check is needed before this can be assessed.', hi: 'आकलन से पहले और जानकारी या आधिकारिक / योजना-मार्ग की जाँच ज़रूरी है।' },
  resultFalse: { en: 'One or more known answers do not align with the published screening conditions. An authority makes the final decision.', hi: 'एक या अधिक ज्ञात जवाब प्रकाशित शुरुआती शर्तों से मेल नहीं खाते। अंतिम निर्णय प्राधिकरण करता है।' },
  benefit: { en: 'Benefit described by the source', hi: 'स्रोत में बताया गया लाभ' },
  eligibility: { en: 'Eligibility conditions and exclusions', hi: 'पात्रता की शर्तें और अपवर्जन' },
  documents: { en: 'Application-document notes', hi: 'आवेदन-दस्तावेज़ संबंधी जानकारी' },
  notes: { en: 'Important caveats', hi: 'ज़रूरी सावधानियाँ' },
  source: { en: 'Official source', hi: 'आधिकारिक स्रोत' },
  sourceEvidence: { en: 'Quoted source evidence', hi: 'स्रोत से उद्धरण' },
  checked: { en: 'Source checked', hi: 'स्रोत जाँचने की तारीख' },
  officialNext: { en: 'Official application / check', hi: 'आधिकारिक आवेदन / जाँच' },
  prepTitle: { en: 'A note for your official conversation', hi: 'आधिकारिक बातचीत के लिए एक नोट' },
  prepText: { en: 'These points come from the scheme record’s application-document notes and important notes. They are not a definitive document checklist; confirm what applies with the official source.', hi: 'ये बिंदु योजना रिकॉर्ड की आवेदन-दस्तावेज़ संबंधी जानकारी और ज़रूरी सावधानियों से लिए गए हैं। यह अंतिम दस्तावेज़ सूची नहीं है; आधिकारिक स्रोत से पुष्टि करें।' },
};

const questionOrder = Object.keys(options) as Field[];
const categoryName = (value: string | null, language: Language) => value === 'all'
  ? copy.allAreas[language]
  : supportAreas.find((area) => area.value === value)?.[language] ?? value ?? '';
const localized = (value: Localized, language: Language) => value[language];

function App() {
  const [screen, setScreen] = useState<Screen>('language');
  const [language, setLanguage] = useState<Language>('en');
  const [mode, setMode] = useState<Mode>('self');
  const [profile, setProfile] = useState<Profile>({ ...initialProfile });
  const [skipped, setSkipped] = useState<Set<Field>>(new Set());
  const [questionFields, setQuestionFields] = useState<Field[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [voiceMessage, setVoiceMessage] = useState('');
  const t = (key: string) => localized(copy[key], language);
  const hindi = language === 'hi';
  const selectedSchemes = useMemo(() => schemes.filter((scheme) => profile.category === 'all' || scheme.category === profile.category), [profile.category]);
  const results = useMemo(() => selectedSchemes.map((scheme) => ({ scheme, result: getSchemeResult(scheme, profile) })), [selectedSchemes, profile]);
  const currentField = questionFields[questionIndex];
  const currentOptions = currentField ? options[currentField] ?? [] : [];
  const groups: Record<Truth, typeof results> = {
    true: results.filter(({ result }) => result === true),
    unknown: results.filter(({ result }) => result === 'unknown'),
    false: results.filter(({ result }) => result === false),
  };
  const unsupportedVoice = typeof window !== 'undefined' && !('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  const flowSteps: { key: Screen; en: string; hi: string }[] = [
    { key: 'language', en: 'Language', hi: 'भाषा' },
    { key: 'mode', en: 'How to use', hi: 'तरीका' },
    { key: 'privacy', en: 'Privacy', hi: 'गोपनीयता' },
    { key: 'category', en: 'Support area', hi: 'सहायता क्षेत्र' },
    { key: 'questions', en: 'Questions', hi: 'सवाल' },
    { key: 'review', en: 'Review', hi: 'जवाब देखें' },
    { key: 'results', en: 'Results', hi: 'नतीजे' },
  ];
  const stepIndex = Math.max(0, flowSteps.findIndex((step) => step.key === screen));
  const progress = screen === 'language' ? 0 : Math.round(stepIndex / (flowSteps.length - 1) * 100);

  function setAnswer(field: Field, value: string | null) {
    setProfile((previous) => ({ ...previous, [field]: value }));
  }
  function relevantSchemes(next: Profile) {
    return schemes.filter((scheme) => next.category === 'all' || scheme.category === next.category);
  }
  function prepareQuestions(next: Profile, skippedFields: Set<Field>) {
    const needed = new Set<Field>();
    relevantSchemes(next).forEach((scheme) => {
      if (evaluate(scheme.rule as Rule, next) === 'unknown') {
        unresolvedFields(scheme.rule, next).forEach((field) => needed.add(field));
      }
    });
    return questionOrder.filter((field) => needed.has(field) && !skippedFields.has(field));
  }
  function beginQuestions() {
    const noneSkipped = new Set<Field>();
    setSkipped(noneSkipped);
    const fields = prepareQuestions(profile, noneSkipped);
    setQuestionFields(fields);
    setQuestionIndex(0);
    setScreen(fields.length ? 'questions' : 'review');
  }
  function answerAndNext(value: string | null) {
    if (!currentField) return;
    const nextSkipped = new Set(skipped);
    if (value === null) nextSkipped.add(currentField);
    else nextSkipped.delete(currentField);
    const nextProfile = { ...profile, [currentField]: value };
    setSkipped(nextSkipped);
    setProfile(nextProfile);
    setVoiceMessage('');
    const fields = prepareQuestions(nextProfile, nextSkipped);
    setQuestionFields(fields);
    if (fields.length) {
      setQuestionIndex(0);
    } else {
      setQuestionIndex(0);
      setScreen('review');
    }
  }
  function editAnswer(field: Field) {
    if (field === 'category') {
      setScreen('category');
      return;
    }
    const revised = { ...profile, [field]: null };
    const nextSkipped = new Set(skipped);
    nextSkipped.delete(field);
    setProfile(revised);
    setSkipped(nextSkipped);
    const fields = prepareQuestions(revised, nextSkipped);
    setQuestionFields(fields.includes(field) ? fields : [field, ...fields]);
    setQuestionIndex(0);
    setScreen('questions');
  }
  function startVoice() {
    type SpeechResult = { transcript: string };
    type SpeechEvent = { results: ArrayLike<ArrayLike<SpeechResult>> };
    type SpeechRecognizer = { lang: string; onresult: (event: SpeechEvent) => void; onerror: () => void; start: () => void };
    const speechWindow = window as Window & { SpeechRecognition?: new () => SpeechRecognizer; webkitSpeechRecognition?: new () => SpeechRecognizer };
    const Constructor = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Constructor || !currentField) {
      setVoiceMessage(hindi ? 'इस ब्राउज़र में आवाज़ से जवाब उपलब्ध नहीं है। नीचे दिए विकल्प चुनें।' : 'Voice answers are unavailable in this browser. Choose an option below.');
      return;
    }
    setVoiceMessage(hindi ? 'सुन रहा है…' : 'Listening…');
    const recognition = new Constructor();
    recognition.lang = hindi ? 'hi-IN' : 'en-IN';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLocaleLowerCase();
      const match = currentOptions.find((option) => {
        const label = option.label[language].toLocaleLowerCase();
        return label.includes(transcript) || transcript.includes(label);
      });
      if (match) {
        setVoiceMessage(`${hindi ? 'समझा:' : 'Heard:'} ${match.label[language]}`);
        answerAndNext(match.value);
      } else setVoiceMessage(hindi ? 'विकल्प समझ नहीं आया। कृपया सूची में से चुनें।' : 'I could not match that to an option. Please choose from the list.');
    };
    recognition.onerror = () => setVoiceMessage(hindi ? 'आवाज़ नहीं मिली। सूची से विकल्प चुनें।' : 'Voice input did not work. Please choose from the list.');
    recognition.start();
  }
  function resetSession() {
    if (!window.confirm(hindi ? 'सभी जवाब मिटाकर शुरुआत पर लौटें?' : 'Clear all answers and return to the beginning?')) return;
    setProfile({ ...initialProfile });
    setSkipped(new Set());
    setScreen('language');
    setMode('self');
    setQuestionFields([]);
    setQuestionIndex(0);
    setSelectedScheme(null);
    setVoiceMessage('');
  }
  function openDetails(scheme: Scheme) {
    setSelectedScheme(scheme);
    setScreen('detail');
  }
  function answerLabel(field: Field, value: string | null) {
    if (!value) return t('skipped');
    if (field === 'category') return categoryName(value, language);
    return options[field]?.find((option) => option.value === value)?.label[language] ?? value;
  }
  function openOfficial(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  async function sharePrep() {
    if (!selectedScheme) return;
    const text = [
      selectedScheme.title[language],
      '',
      ...selectedScheme.applicationDocuments.map((item) => `• ${item[language]}`),
      ...selectedScheme.importantNotes.map((item) => `• ${item[language]}`),
      '',
      `${selectedScheme.sourceTitle}: ${selectedScheme.sourceUrl}`,
    ].join('\n');
    if (navigator.share) {
      try { await navigator.share({ title: selectedScheme.title[language], text }); } catch { /* sharing dismissed */ }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        window.alert(hindi ? 'नोट कॉपी किया गया।' : 'Note copied.');
      } catch { window.alert(hindi ? 'कॉपी नहीं हो सका। प्रिंट विकल्प इस्तेमाल करें।' : 'Could not copy. Use the print option.'); }
    } else window.alert(hindi ? 'शेयर सुविधा उपलब्ध नहीं है। प्रिंट विकल्प इस्तेमाल करें।' : 'Sharing is unavailable. Use the print option.');
  }

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand" aria-label="SchemeSaathi"><span className="brand-mark" aria-hidden="true"><Sprout size={19} /></span><span>SchemeSaathi</span></div>
      <div className="topbar-right">
        <span className="privacy-pill"><ShieldCheck size={15} /><span className="privacy-label">{hindi ? 'जवाब इस सेशन में रहते हैं' : 'Answers stay in this session'}</span></span>
        <button className="btn secondary small" type="button" data-testid="button-language-toggle" onClick={() => setLanguage(hindi ? 'en' : 'hi')} aria-label={hindi ? 'Switch to English' : 'हिंदी में बदलें'}><Languages size={15} /> {hindi ? 'EN' : 'हिंदी'}</button>
      </div>
    </header>
    <main className="main-wrap"><div className="journey-grid">
      <aside className="rail" aria-label={hindi ? 'यात्रा के चरण' : 'Journey steps'}>
        <div className="rail-kicker">{hindi ? 'आपकी राह' : 'YOUR NEXT STEPS'}</div>
        <div className="rail-title">{hindi ? 'एक बार में एक साफ़ कदम।' : 'Clear guidance, one step at a time.'}</div>
        <div className="steps">{flowSteps.map((step, index) => {
          const done = index < stepIndex;
          return <div key={step.key} className={`step-row ${index === stepIndex ? 'active' : ''} ${done ? 'done' : ''}`} aria-current={index === stepIndex ? 'step' : undefined}><span className="step-dot">{done ? <Check size={13} /> : index + 1}</span><span>{hindi ? step.hi : step.en}</span></div>;
        })}</div>
        <div className="rail-note"><ShieldCheck size={16} />{hindi ? 'आपके जवाब इस पेज की मेमोरी से बाहर नहीं जाते।' : 'Your answers do not leave this page’s memory.'}</div>
      </aside>
      <section className="content" aria-live="polite"><div className="screen-card">
        {screen === 'language' && <>
          <div className="eyebrow">{hindi ? 'नमस्कार' : 'NAMASTE'}</div>
          <h1 className="screen-title">{t('start')}</h1><p className="screen-copy">{t('intro')}</p>
          <Caveat language={language} />
          <div className="form-field"><div className="form-label">{t('language')}</div><div className="option-list">
            {(['en', 'hi'] as Language[]).map((choice) => <button type="button" key={choice} className={`choice ${language === choice ? 'selected' : ''}`} data-testid={`choice-language-${choice}`} onClick={() => setLanguage(choice)}>
              <span><span className="choice-title">{choice === 'en' ? 'English' : 'हिन्दी'}</span><span className="choice-desc">{choice === 'en' ? 'Continue in English' : 'हिन्दी में आगे बढ़ें'}</span></span><span className="choice-icon">{language === choice ? <Check size={17} /> : <ChevronRight size={17} />}</span>
            </button>)}
          </div></div>
          <div className="actions"><button className="btn" data-testid="button-continue-language" onClick={() => setScreen('mode')}>{t('continue')} <ArrowRight size={17} /></button></div>
        </>}
        {screen === 'mode' && <>
          <div className="eyebrow">{hindi ? 'पहला कदम' : 'A SMALL FIRST CHOICE'}</div><h1 className="screen-title">{t('modeTitle')}</h1><p className="screen-copy">{t('modeText')}</p>
          <div className="option-list">{(['self', 'assisted'] as Mode[]).map((choice) => <button type="button" key={choice} className={`choice ${mode === choice ? 'selected' : ''}`} data-testid={`choice-mode-${choice}`} onClick={() => setMode(choice)}>
            <span><span className="choice-title">{t(choice)}</span><span className="choice-desc">{t(choice === 'self' ? 'selfHint' : 'assistedHint')}</span></span><span className="choice-icon">{mode === choice ? <Check size={17} /> : <ChevronRight size={17} />}</span>
          </button>)}</div>
          {mode === 'assisted' && <div className="notice"><Volume2 size={18} /><div>{t('assistedHint')}</div></div>}
          <Actions backLabel={t('back')} nextLabel={t('continue')} back={() => setScreen('language')} next={() => setScreen('privacy')} backTest="button-back-mode" nextTest="button-continue-mode" />
        </>}
        {screen === 'privacy' && <>
          <div className="eyebrow">{hindi ? 'आपकी जानकारी' : 'YOUR INFORMATION'}</div><h1 className="screen-title">{t('privacyTitle')}</h1><p className="screen-copy">{t('privacyText')}</p>
          <div className="notice"><ShieldCheck size={20} /><div><strong>{hindi ? 'पहचान या बैंक नंबर नहीं' : 'No identity or bank numbers'}</strong>{hindi ? 'SchemeSaathi में Aadhaar, बैंक खाता या पहचान नंबर न लिखें।' : 'Do not type Aadhaar, bank account or identity numbers into SchemeSaathi.'}</div></div>
          <p className="screen-copy">{hindi ? 'कोई लॉगिन, ट्रैकिंग या नेटवर्क अनुरोध नहीं। आधिकारिक लिंक खोलने पर केवल सरकारी साइट से संपर्क होता है।' : 'No sign-in, tracking or network requests. An official link connects only to the government site.'}</p>
          <Actions backLabel={t('back')} nextLabel={t('continue')} back={() => setScreen('mode')} next={() => setScreen('category')} backTest="button-back-privacy" nextTest="button-continue-privacy" />
        </>}
        {screen === 'category' && <>
          <div className="eyebrow">{hindi ? 'किस पर ध्यान दें?' : 'CHOOSE A SUPPORT AREA'}</div><h1 className="screen-title">{t('categoryTitle')}</h1><p className="screen-copy">{t('categoryText')}</p>
          <div className="option-list category-list">
            {supportAreas.map((area, index) => <button type="button" key={area.value} className={`choice ${profile.category === area.value ? 'selected' : ''}`} data-testid={`choice-category-${area.value.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`} onClick={() => setAnswer('category', area.value)}>
              <span><span className="choice-title">{area[language]}</span><span className="choice-desc">{hindi ? `क्षेत्र ${String(index + 1).padStart(2, '0')}` : `Area ${String(index + 1).padStart(2, '0')}`}</span></span><span className="choice-icon">{profile.category === area.value ? <Check size={17} /> : <ChevronRight size={17} />}</span>
            </button>)}
            <button type="button" className={`choice ${profile.category === 'all' ? 'selected' : ''}`} data-testid="choice-category-all" onClick={() => setAnswer('category', 'all')}>
              <span><span className="choice-title">{t('allAreas')}</span><span className="choice-desc">{t('allDesc')}</span></span><span className="choice-icon">{profile.category === 'all' ? <Check size={17} /> : <CircleHelp size={17} />}</span>
            </button>
          </div>
          <Actions backLabel={t('back')} nextLabel={t('continue')} back={() => setScreen('privacy')} next={beginQuestions} disabled={!profile.category} backTest="button-back-category" nextTest="button-continue-category" />
        </>}
        {screen === 'questions' && currentField && <>
          <div className="eyebrow">{hindi ? 'सिर्फ संबंधित सवाल' : 'ONLY RELEVANT QUESTIONS'}</div>
          <div className="question-count" data-testid="text-question-progress">{hindi ? `सवाल ${questionIndex + 1} / ${questionFields.length}` : `QUESTION ${questionIndex + 1} OF ${questionFields.length}`}</div>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${(questionIndex + 1) / Math.max(1, questionFields.length) * 100}%` }} /></div>
          <h1 className="screen-title question-title">{fieldLabels[currentField][language]}</h1>
          <p className="screen-copy">{questionHelp[currentField][language]}</p>
          {mode === 'assisted' && <div className="voice-note"><Volume2 size={14} />{t('assistedHint')}</div>}
          <div className="option-list">{currentOptions.map((option) => <button type="button" key={option.value} className={`choice ${profile[currentField] === option.value ? 'selected' : ''}`} data-testid={`choice-answer-${currentField}-${option.value}`} onClick={() => answerAndNext(option.value)}>
            <span><span className="choice-title">{option.label[language]}</span>{option.description && <span className="choice-desc">{option.description[language]}</span>}</span><span className="choice-icon">{profile[currentField] === option.value ? <Check size={17} /> : <ChevronRight size={17} />}</span>
          </button>)}<button type="button" className={`choice ${profile[currentField] === null ? 'selected' : ''}`} data-testid={`choice-answer-${currentField}-unknown`} onClick={() => answerAndNext(null)}><span className="choice-title">{t('unknown')}</span><span className="choice-icon"><CircleHelp size={17} /></span></button></div>
          <div className="voice-note" role="status" data-testid="status-voice">{voiceMessage || (unsupportedVoice ? (hindi ? 'इस ब्राउज़र में आवाज़ से जवाब उपलब्ध नहीं है। ऊपर के विकल्प चुनें।' : 'Voice input is unavailable in this browser. Use the choices above.') : (hindi ? 'चाहें तो सूची में से कोई विकल्प बोलें।' : 'If you prefer, say one of the listed options.'))}</div>
          {!unsupportedVoice && <button className="btn secondary small voice-button" type="button" data-testid="button-voice-input" onClick={startVoice}><Mic size={15} />{hindi ? 'आवाज़ से जवाब' : 'Answer by voice'}</button>}
          <div className="actions"><button className="btn secondary" type="button" data-testid="button-back-questions" onClick={() => setScreen('category')}><ArrowLeft size={16} /> {t('back')}</button><button className="btn text" type="button" data-testid="button-skip-question" onClick={() => answerAndNext(null)}>{hindi ? 'इस सवाल को छोड़ें' : 'Skip this question'} <ArrowRight size={16} /></button></div>
        </>}
        {screen === 'review' && <>
          <div className="eyebrow">{hindi ? 'जाँच से पहले' : 'BEFORE SCREENING'}</div><h1 className="screen-title">{t('reviewTitle')}</h1><p className="screen-copy">{t('reviewText')}</p>
          <div className="review-row" data-testid="review-answer-category"><span>{fieldLabels.category[language]}</span><strong>{categoryName(profile.category, language)}</strong><button type="button" className="link-button" data-testid="button-edit-category" onClick={() => setScreen('category')}>{hindi ? 'बदलें' : 'Change'}</button></div>
          {questionOrder.filter((field) => profile[field] !== null || skipped.has(field)).map((field) => <div className="review-row" key={field} data-testid={`review-answer-${field}`}>
            <span>{fieldLabels[field][language]}</span><strong>{answerLabel(field, profile[field])}</strong><button type="button" className="link-button" aria-label={`${hindi ? 'बदलें' : 'Change'} ${fieldLabels[field][language]}`} data-testid={`button-edit-${field}`} onClick={() => editAnswer(field)}>{hindi ? 'बदलें' : 'Change'}</button>
          </div>)}
          <Caveat language={language} />
          <Actions backLabel={t('back')} nextLabel={t('compare')} back={() => setScreen('category')} next={() => setScreen('results')} backTest="button-back-review" nextTest="button-show-results" />
        </>}
        {screen === 'results' && <>
          <div className="result-head"><div><div className="eyebrow">{hindi ? 'आपके जवाबों के आधार पर' : 'BASED ON YOUR ANSWERS'}</div><h1 className="screen-title">{t('resultsTitle')}</h1><p className="screen-copy">{t('resultsText')}</p></div><span className="badge">{hindi ? 'जानकारी के लिए' : 'INFORMATION ONLY'}</span></div>
          <Caveat language={language} />
          <div className="result-groups">{([
            { key: true as Truth, title: t('aligned'), mark: 'yes' },
            { key: 'unknown' as Truth, title: t('check'), mark: 'unknown' },
            { key: false as Truth, title: t('notAligned'), mark: 'no' },
          ]).map((group) => <section key={String(group.key)} data-testid={`result-group-${String(group.key)}`}>
            <h2 className="group-heading"><span className={`group-mark ${group.mark}`} />{group.title}<span className="group-count">({groups[group.key].length})</span></h2>
            {groups[group.key].length ? groups[group.key].map(({ scheme, result }) => <ResultCard key={scheme.id} scheme={scheme} result={result} onOpen={() => openDetails(scheme)} language={language} />)
              : <div className="empty-state" data-testid={`empty-group-${String(group.key)}`}>{hindi ? 'इस स्थिति में कोई योजना नहीं।' : 'No schemes in this status.'}</div>}
          </section>)}</div>
          <div className="actions"><button className="btn secondary" type="button" data-testid="button-review-answers" onClick={() => setScreen('review')}><ArrowLeft size={16} /> {t('reviewAnswers')}</button><button className="btn text" type="button" data-testid="button-reset-results" onClick={resetSession}><RotateCcw size={15} /> {t('restart')}</button></div>
        </>}
        {screen === 'detail' && selectedScheme && <>
          <div className="eyebrow">{selectedScheme.category} · {selectedScheme.shortTitle[language]}</div>
          <h1 className="screen-title">{selectedScheme.title[language]}</h1><p className="screen-copy">{selectedScheme.summary[language]}</p>
          <div className={`status-panel status-${groups.true.some((item) => item.scheme.id === selectedScheme.id) ? 'yes' : groups.false.some((item) => item.scheme.id === selectedScheme.id) ? 'no' : 'unknown'}`} data-testid={`status-scheme-${selectedScheme.id}`}>
            <strong>{resultTitle(getSchemeResult(selectedScheme, profile), language)}</strong>
            <p>{resultDescription(getSchemeResult(selectedScheme, profile), language)}</p>
          </div>
          <section className="detail-block"><h2>{t('benefit')}</h2><p className="benefit-copy">{selectedScheme.benefit[language]}</p></section>
          <section className="detail-block"><h2>{t('eligibility')}</h2><ul>{selectedScheme.eligibility.map((item, index) => <li key={index} data-testid={`eligibility-${selectedScheme.id}-${index}`}>{item[language]}</li>)}</ul></section>
          <section className="detail-block"><h2>{t('documents')}</h2><ul>{selectedScheme.applicationDocuments.map((item, index) => <li key={index}>{item[language]}</li>)}</ul></section>
          <section className="detail-block"><h2>{t('notes')}</h2><ul>{selectedScheme.importantNotes.map((item, index) => <li key={index}>{item[language]}</li>)}</ul></section>
          <section className="source-panel" data-testid={`source-details-${selectedScheme.id}`}>
            <h2>{t('source')}</h2><p><strong>{selectedScheme.sourceTitle}</strong></p>
            <a className="source-link" href={selectedScheme.sourceUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-source-${selectedScheme.id}`}>{selectedScheme.sourceUrl}<ExternalLink size={14} /></a>
            <h3>{t('sourceEvidence')}</h3><blockquote>{selectedScheme.sourceQuote}</blockquote>
            <p className="checked-date"><strong>{t('checked')}:</strong> <time dateTime={selectedScheme.checkedAt}>{selectedScheme.checkedAt}</time></p>
          </section>
          <a className="btn official-link" href={selectedScheme.applicationUrl} target="_blank" rel="noopener noreferrer" data-testid={`link-application-${selectedScheme.id}`}>{selectedScheme.applicationLabel[language]} <ExternalLink size={16} /></a>
          <div className="actions"><button className="btn secondary" type="button" data-testid="button-view-prep" onClick={() => setScreen('prep')}><ClipboardList size={17} /> {hindi ? 'तैयारी नोट' : 'Preparation note'}</button><button className="btn text" type="button" data-testid="button-back-results-detail" onClick={() => setScreen('results')}><ArrowLeft size={16} /> {hindi ? 'नतीजों पर लौटें' : 'Back to results'}</button></div>
        </>}
        {screen === 'prep' && selectedScheme && <>
          <div className="eyebrow">{hindi ? 'प्रिंट या साथ साझा करें' : 'PRINT OR TAKE ALONG'}</div><h1 className="screen-title">{t('prepTitle')}</h1><p className="screen-copy">{selectedScheme.title[language]}</p>
          <div className="notice"><AlertCircle size={18} /><div>{t('prepText')}</div></div>
          <section className="detail-block"><h2>{t('documents')}</h2><ul>{selectedScheme.applicationDocuments.map((item, index) => <li key={index}>{item[language]}</li>)}</ul></section>
          <section className="detail-block"><h2>{t('notes')}</h2><ul>{selectedScheme.importantNotes.map((item, index) => <li key={index}>{item[language]}</li>)}</ul></section>
          <p className="form-hint">{selectedScheme.sourceTitle} · {selectedScheme.checkedAt}</p>
          <div className="actions no-print"><button className="btn secondary" type="button" data-testid="button-print-prep" onClick={() => window.print()}><Printer size={16} /> {hindi ? 'प्रिंट / PDF' : 'Print / save as PDF'}</button><button className="btn secondary" type="button" data-testid="button-share-prep" onClick={sharePrep}><ClipboardList size={16} /> {hindi ? 'नोट साझा / कॉपी करें' : 'Share / copy note'}</button></div>
          <div className="actions"><button className="btn secondary" type="button" data-testid="button-back-prep" onClick={() => setScreen('detail')}><ArrowLeft size={16} /> {hindi ? 'योजना विवरण पर लौटें' : 'Back to scheme details'}</button></div>
        </>}
      </div><div className="session-footer">
        <span>{screen === 'language' ? (hindi ? 'कोई खाता नहीं • जवाब इस सेशन में' : 'No account • Session-only answers') : `${progress}% ${hindi ? 'पूरा' : 'complete'}`}</span>
        {screen !== 'language' && <button type="button" data-testid="button-clear-session" onClick={resetSession}>{t('restart')}</button>}
      </div></section>
    </div></main>
  </div>;
}

function Actions({ backLabel, nextLabel, back, next, disabled = false, backTest, nextTest }: { backLabel: string; nextLabel: string; back: () => void; next: () => void; disabled?: boolean; backTest: string; nextTest: string }) {
  return <div className="actions"><button className="btn secondary" type="button" data-testid={backTest} onClick={back}><ArrowLeft size={16} /> {backLabel}</button><button className="btn" type="button" disabled={disabled} data-testid={nextTest} onClick={next}>{nextLabel} <ArrowRight size={17} /></button></div>;
}

function Caveat({ language }: { language: Language }) {
  return <div className="notice caveat" data-testid="notice-official-caveat"><AlertCircle size={19} /><div><strong>{copy.caveatTitle[language]}</strong>{copy.caveat[language]}</div></div>;
}

function ResultCard({ scheme, result, onOpen, language }: { scheme: Scheme; result: Truth; onOpen: () => void; language: Language }) {
  return <article className="result-card" data-testid={`card-result-${scheme.id}`}>
    <div className="result-card-top"><div><h3>{scheme.title[language]}</h3><p>{scheme.summary[language]}</p></div><button type="button" className="link-button" data-testid={`button-open-${scheme.id}`} onClick={onOpen}>{copy.viewDetails[language]} <ChevronRight size={14} /></button></div>
    <p className="result-explanation">{resultDescription(result, language)}</p>
  </article>;
}

function resultTitle(result: Truth, language: Language) {
  if (result === true) return copy.aligned[language];
  if (result === false) return copy.notAligned[language];
  return copy.check[language];
}

function resultDescription(result: Truth, language: Language) {
  if (result === true) return copy.resultAligned[language];
  if (result === false) return copy.resultFalse[language];
  return copy.resultUnknown[language];
}

export default App;
