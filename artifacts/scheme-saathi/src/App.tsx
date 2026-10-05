import { useMemo, useState } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, Check, ChevronRight, CircleHelp, ClipboardList, Languages, Mic, Printer, RotateCcw, ShieldCheck, Sprout, Volume2 } from 'lucide-react';
import {
  demoSchemes, evaluate, fieldLabels, initialProfile, options, unresolvedFields,
  type DemoScheme, type Field, type Profile, type Truth,
} from './demo-data';

type Screen = 'language' | 'mode' | 'privacy' | 'location' | 'category' | 'questions' | 'review' | 'results' | 'detail' | 'checklist';
type Language = 'en' | 'hi';
type Mode = 'self' | 'assisted';

const translations: Record<string, { en: string; hi: string }> = {
  start: { en: 'Start with what matters to you', hi: 'आपके लिए ज़रूरी बातों से शुरू करें' },
  welcome: { en: 'A little guidance, at your pace.', hi: 'आपकी गति से, थोड़ी सी मदद।' },
  intro: { en: 'Explore a few made-up examples of public support. Your answers stay on this device while this page is open.', hi: 'सरकारी सहायता के कुछ काल्पनिक उदाहरण देखें। आपके जवाब इस पेज के खुले रहने तक इसी डिवाइस पर रहते हैं।' },
  language: { en: 'Choose a language', hi: 'भाषा चुनें' },
  chooseMode: { en: 'How would you like to use SchemeSaathi?', hi: 'आप SchemeSaathi का उपयोग कैसे करना चाहेंगे?' },
  modeCopy: { en: 'Both paths use the same simple questions. You can change your choice any time.', hi: 'दोनों तरीकों में आसान सवाल हैं। आप कभी भी अपना चुनाव बदल सकते हैं।' },
  self: { en: 'I’ll explore on my own', hi: 'मैं खुद देखूँगा / देखूँगी' },
  selfDesc: { en: 'Go through each step at your own pace.', hi: 'हर कदम अपनी सुविधा से पूरा करें।' },
  assisted: { en: 'I’m helping someone', hi: 'मैं किसी की मदद कर रहा / रही हूँ' },
  assistedDesc: { en: 'Read questions together. No account or personal details needed.', hi: 'सवाल साथ में पढ़ें। खाते या निजी पहचान की ज़रूरत नहीं।' },
  privacyTitle: { en: 'Your answers are yours', hi: 'आपके जवाब आपके हैं' },
  privacyBody: { en: 'Nothing you enter is saved or sent anywhere. Answers stay in this page’s memory and disappear when you clear or close the session.', hi: 'आपकी कोई जानकारी सेव या कहीं भेजी नहीं जाती। जवाब इस पेज की मेमोरी में रहते हैं और सेशन मिटाने या पेज बंद करने पर हट जाते हैं।' },
  privacyNever: { en: 'We never ask for Aadhaar, account numbers, or exact identity details.', hi: 'हम आधार, खाता नंबर या पहचान की कोई सटीक जानकारी नहीं पूछते।' },
  chooseLocation: { en: 'Where are you exploring support?', hi: 'आप किस जगह की सहायता देख रहे हैं?' },
  locationCopy: { en: 'A broad location can help us compare these fictional examples. You can choose “Not sure”.', hi: 'सामान्य जगह चुनने से काल्पनिक उदाहरण मिलाने में मदद मिल सकती है। “पता नहीं” भी चुन सकते हैं।' },
  categoryTitle: { en: 'What kind of support are you looking for?', hi: 'आप किस तरह की सहायता ढूँढ रहे हैं?' },
  categoryCopy: { en: 'Choose one area, or choose “Not sure” to look across all examples.', hi: 'एक क्षेत्र चुनें या सभी उदाहरण देखने के लिए “पक्का नहीं” चुनें।' },
  notSure: { en: 'Not sure', hi: 'पक्का नहीं' },
  notSureDesc: { en: 'Show examples from every area', hi: 'हर क्षेत्र के उदाहरण देखें' },
  unknown: { en: 'I don’t know / skip this', hi: 'पता नहीं / छोड़ें' },
  unknownAnswer: { en: 'Not sure / skipped', hi: 'पता नहीं / छोड़ा' },
  reviewTitle: { en: 'Check your answers', hi: 'अपने जवाब देखें' },
  reviewCopy: { en: 'You can change anything before we compare them with the demo rules.', hi: 'डेमो नियमों से मिलाने से पहले आप जवाब बदल सकते हैं।' },
  resultsTitle: { en: 'Your demo overview', hi: 'आपके डेमो नतीजे' },
  resultsCopy: { en: 'These groups show how your answers compare with fictional sample rules only.', hi: 'ये समूह सिर्फ काल्पनिक नमूना नियमों से आपके जवाबों की तुलना दिखाते हैं।' },
  warning: { en: 'Not official guidance', hi: 'यह आधिकारिक सलाह नहीं है' },
  warningText: { en: 'All scheme names and rules here are fictional demo examples. This result does not confirm eligibility, benefits, deadlines, documents, or any real application route.', hi: 'यहाँ के सभी नाम और नियम काल्पनिक डेमो उदाहरण हैं। यह नतीजा पात्रता, लाभ, तारीख, दस्तावेज़ या असली आवेदन का रास्ता नहीं बताता।' },
  mayMatch: { en: 'May match (demo)', hi: 'मेल हो सकता है (डेमो)' },
  needMore: { en: 'Need more information', hi: 'और जानकारी चाहिए' },
  doesNot: { en: 'Does not match this demo rule', hi: 'इस डेमो नियम से मेल नहीं' },
  seeDetails: { en: 'View example', hi: 'उदाहरण देखें' },
  reviewAnswers: { en: 'Review answers', hi: 'जवाब फिर देखें' },
  restart: { en: 'Clear and start again', hi: 'मिटाकर फिर शुरू करें' },
  back: { en: 'Back', hi: 'पीछे' },
  continue: { en: 'Continue', hi: 'आगे बढ़ें' },
  compare: { en: 'Compare with demo examples', hi: 'डेमो उदाहरणों से मिलाएँ' },
  assistedHint: { en: 'Assisted mode: read each question aloud together. You can skip anything you do not know.', hi: 'साथ में सहायता: हर सवाल साथ में पढ़ें। जो न पता हो उसे छोड़ सकते हैं।' },
};

const categories = [
  { value: 'Education', en: 'Learning and education', hi: 'पढ़ाई और शिक्षा', icon: '01' },
  { value: 'Farming', en: 'Farming and seasonal work', hi: 'खेती और मौसमी काम', icon: '02' },
  { value: 'Housing', en: 'Housing', hi: 'आवास', icon: '03' },
  { value: 'Family support', en: 'Family and care support', hi: 'परिवार और देखभाल', icon: '04' },
];
const fieldOrder: Field[] = ['ageBand', 'incomeBand', 'studentStatus', 'farmingStatus', 'familyStatus', 'occupation'];
const questionIntro: Partial<Record<Field, string>> = {
  ageBand: 'A broad age range can help compare some examples.',
  incomeBand: 'An estimate is enough. Please do not enter an exact amount.',
  studentStatus: 'This is only used by one fictional learning example.',
  farmingStatus: 'This helps us understand which sample rules may be relevant.',
  familyStatus: 'Choose the closest description, or skip.',
  occupation: 'Only a broad work situation is used in a sample rule.',
};
const questionIntroHindi: Partial<Record<Field, string>> = {
  ageBand: 'कुछ उदाहरणों से तुलना के लिए उम्र का सामान्य दायरा मदद कर सकता है।',
  incomeBand: 'सिर्फ अनुमान काफी है। कोई सटीक रकम न लिखें।',
  studentStatus: 'यह सिर्फ एक काल्पनिक पढ़ाई वाले उदाहरण के लिए है।',
  farmingStatus: 'इससे संबंधित नमूना नियम समझने में मदद मिलती है।',
  familyStatus: 'सबसे मिलता-जुलता विकल्प चुनें या छोड़ दें।',
  occupation: 'नमूना नियम में सिर्फ काम की सामान्य स्थिति है।',
};

function App() {
  const [screen, setScreen] = useState<Screen>('language');
  const [language, setLanguage] = useState<Language>('en');
  const [mode, setMode] = useState<Mode>('self');
  const [profile, setProfile] = useState<Profile>({ ...initialProfile });
  const [skippedFields, setSkippedFields] = useState<Set<Field>>(new Set());
  const [questionFields, setQuestionFields] = useState<Field[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedScheme, setSelectedScheme] = useState<DemoScheme | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [voiceMessage, setVoiceMessage] = useState('');
  const t = (key: string) => translations[key]?.[language] ?? key;
  const hindi = language === 'hi';
  const schemeResults = useMemo(() => demoSchemes
    .filter((scheme) => !profile.category || profile.category === 'not-sure' || scheme.category === profile.category)
    .map((scheme) => ({ scheme, result: evaluate(scheme.rule, profile) })), [profile]);
  const currentField = questionFields[questionIndex];
  const currentOptions = currentField ? options[currentField] ?? [] : [];
  const groups: Record<Truth, typeof schemeResults> = {
    true: schemeResults.filter((item) => item.result === true),
    unknown: schemeResults.filter((item) => item.result === 'unknown'),
    false: schemeResults.filter((item) => item.result === false),
  };

  function setAnswer(field: Field, value: string | null) {
    setProfile((previous) => ({ ...previous, [field]: value }));
  }
  function prepareQuestions(nextProfile = profile, skipped = skippedFields) {
    const relevant = demoSchemes.filter((scheme) => !nextProfile.category || nextProfile.category === 'not-sure' || scheme.category === nextProfile.category);
    const needed = new Set<Field>();
    relevant.forEach((scheme) => {
      if (evaluate(scheme.rule, nextProfile) === 'unknown') {
        unresolvedFields(scheme.rule, nextProfile).forEach((field) => needed.add(field));
      }
    });
    return fieldOrder.filter((field) => needed.has(field) && !skipped.has(field));
  }
  function beginQuestions() {
    setSkippedFields(new Set());
    const fields = prepareQuestions();
    setQuestionFields(fields);
    setQuestionIndex(0);
    setScreen(fields.length ? 'questions' : 'review');
  }
  function answerAndNext(value: string | null) {
    if (!currentField) return;
    const nextSkipped = new Set(skippedFields);
    if (value === null) nextSkipped.add(currentField);
    else nextSkipped.delete(currentField);
    setSkippedFields(nextSkipped);
    const next = { ...profile, [currentField]: value };
    setProfile(next);
    const fields = prepareQuestions(next, nextSkipped);
    setQuestionFields(fields);
    const remaining = fields.findIndex((field) => field !== currentField && fieldOrder.indexOf(field) > fieldOrder.indexOf(currentField));
    if (remaining >= 0) {
      setQuestionIndex(remaining);
    } else {
      const earlier = fields.findIndex((field) => field !== currentField && fieldOrder.indexOf(field) < fieldOrder.indexOf(currentField));
      if (earlier >= 0) {
        setQuestionIndex(earlier);
      } else if (fields.some((field) => field !== currentField)) {
        const nextField = fields.findIndex((field) => field !== currentField);
        setQuestionIndex(nextField);
      } else {
        setScreen('review');
      }
    }
  }
  function startVoice() {
    type SpeechResult = { transcript: string };
    type SpeechEvent = { results: ArrayLike<ArrayLike<SpeechResult>> };
    type SpeechRecognizer = { lang: string; onresult: (event: SpeechEvent) => void; onerror: () => void; start: () => void };
    const speechWindow = window as Window & { SpeechRecognition?: new () => SpeechRecognizer; webkitSpeechRecognition?: new () => SpeechRecognizer };
    const Constructor = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Constructor || !currentField) {
      setVoiceMessage(hindi ? 'इस ब्राउज़र में आवाज़ से लिखने की सुविधा उपलब्ध नहीं है। आप नीचे विकल्प चुन सकते हैं।' : 'Voice input is not available in this browser. You can choose an option below.');
      return;
    }
    setVoiceMessage(hindi ? 'सुन रहा है…' : 'Listening…');
    const recognition = new Constructor();
    recognition.lang = hindi ? 'hi-IN' : 'en-IN';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLocaleLowerCase();
      const match = currentOptions.find((option) => option.label.toLocaleLowerCase().includes(transcript) || transcript.includes(option.label.toLocaleLowerCase()));
      if (match) {
        setVoiceMessage(`${hindi ? 'समझा:' : 'Heard:'} ${match.label}`);
        answerAndNext(match.value);
      } else setVoiceMessage(hindi ? 'विकल्प समझ नहीं आया। कृपया सूची में से चुनें।' : 'I could not match that to an option. Please choose from the list.');
    };
    recognition.onerror = () => setVoiceMessage(hindi ? 'आवाज़ नहीं मिली। विकल्प सूची से चुनें।' : 'Voice input did not work. Please choose from the list.');
    recognition.start();
  }
  function resetSession() {
    if (!window.confirm(hindi ? 'सभी जवाब मिटाकर शुरुआत पर लौटें?' : 'Clear all answers and return to the beginning?')) return;
    setProfile({ ...initialProfile });
    setSkippedFields(new Set());
    setScreen('language');
    setMode('self');
    setQuestionFields([]);
    setQuestionIndex(0);
    setSelectedScheme(null);
    setCheckedItems([]);
    setVoiceMessage('');
  }
  function openDetails(scheme: DemoScheme) {
    setSelectedScheme(scheme);
    setScreen('detail');
  }
  function editAnswer(field: Field) {
    if (field === 'state' || field === 'district') {
      setScreen('location');
      return;
    }
    if (field === 'category') {
      setScreen('category');
      return;
    }
    const revised = { ...profile, [field]: null };
    const nextSkipped = new Set(skippedFields);
    nextSkipped.delete(field);
    setSkippedFields(nextSkipped);
    const fields = prepareQuestions(revised, nextSkipped);
    const sorted = fields.includes(field) ? fields : [...fields, field].sort((a, b) => fieldOrder.indexOf(a) - fieldOrder.indexOf(b));
    setProfile(revised);
    setQuestionFields(sorted);
    setQuestionIndex(sorted.indexOf(field));
    setScreen('questions');
  }

  const screens: { key: Screen; en: string; hi: string }[] = [
    { key: 'language', en: 'Language', hi: 'भाषा' },
    { key: 'mode', en: 'How to use', hi: 'तरीका' },
    { key: 'privacy', en: 'Privacy', hi: 'गोपनीयता' },
    { key: 'location', en: 'Location', hi: 'जगह' },
    { key: 'category', en: 'Support area', hi: 'सहायता' },
    { key: 'questions', en: 'A few questions', hi: 'कुछ सवाल' },
    { key: 'review', en: 'Review', hi: 'जवाब देखें' },
    { key: 'results', en: 'Examples', hi: 'उदाहरण' },
  ];
  const visibleIndex = ['detail', 'checklist'].includes(screen) ? 7 : Math.max(0, screens.findIndex((item) => item.key === screen));
  const progress = screen === 'language' ? 0 : Math.round((visibleIndex / (screens.length - 1)) * 100);
  const unsupportedVoice = typeof window !== 'undefined' && !('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" aria-label="SchemeSaathi">
          <span className="brand-mark" aria-hidden="true"><Sprout size={20} strokeWidth={1.8} /></span>
          <span>SchemeSaathi</span>
        </div>
        <div className="topbar-right">
          <span className="privacy-pill"><ShieldCheck size={15} /><span className="privacy-label">{hindi ? 'जवाब आपके डिवाइस पर' : 'Answers stay on your device'}</span></span>
          <button className="btn secondary small" type="button" data-testid="button-language-toggle" onClick={() => setLanguage(hindi ? 'en' : 'hi')} aria-label={hindi ? 'Switch to English' : 'हिंदी में बदलें'}>
            <Languages size={15} /> {hindi ? 'EN' : 'हिंदी'}
          </button>
        </div>
      </header>

      <main className="main-wrap">
        <div className="journey-grid">
          <aside className="rail" aria-label={hindi ? 'यात्रा के चरण' : 'Journey steps'}>
            <div className="rail-kicker">{hindi ? 'आपकी यात्रा' : 'YOUR JOURNEY'}</div>
            <div className="rail-title">{hindi ? 'एक बार में एक आसान कदम।' : 'One clear step at a time.'}</div>
            <div className="steps">
              {screens.map((item, index) => {
                const done = index < visibleIndex;
                return <div key={item.key} className={`step-row ${index === visibleIndex ? 'active' : ''} ${done ? 'done' : ''}`} aria-current={index === visibleIndex ? 'step' : undefined}>
                  <span className="step-dot">{done ? <Check size={13} /> : index + 1}</span><span>{hindi ? item.hi : item.en}</span>
                </div>;
              })}
            </div>
            <div className="rail-note"><ShieldCheck size={16} style={{ verticalAlign: 'middle', marginRight: 6 }} />{hindi ? 'यह सिर्फ डेमो है। कोई जवाब सेव या भेजा नहीं जाता।' : 'Just a demo. No answers are saved or sent.'}</div>
          </aside>

          <section className="content" aria-live="polite">
            <div className="screen-card">
              {screen === 'language' && <>
                <div className="eyebrow">{hindi ? 'नमस्कार' : 'NAMASTE'}</div>
                <h1 className="screen-title">{t('start')}</h1>
                <p className="screen-copy">{t('intro')}</p>
                <div className="notice"><ShieldCheck size={19} /><div><strong>{t('warning')}</strong>{t('warningText')}</div></div>
                <div className="form-field">
                  <label className="form-label">{t('language')}</label>
                  <div className="option-list">
                    {[{ value: 'en', label: 'English', detail: 'Continue in English' }, { value: 'hi', label: 'हिन्दी', detail: 'हिन्दी में आगे बढ़ें' }].map((choice) =>
                      <button type="button" key={choice.value} className={`choice ${language === choice.value ? 'selected' : ''}`} data-testid={`choice-language-${choice.value}`} onClick={() => setLanguage(choice.value as Language)}>
                        <span><span className="choice-title">{choice.label}</span><span className="choice-desc">{choice.detail}</span></span><span className="choice-icon">{language === choice.value ? <Check size={17} /> : <ChevronRight size={17} />}</span>
                      </button>)}
                  </div>
                </div>
                <div className="actions"><button className="btn" data-testid="button-continue-language" onClick={() => setScreen('mode')}>{t('continue')} <ArrowRight size={17} /></button></div>
              </>}

              {screen === 'mode' && <>
                <div className="eyebrow">{hindi ? 'पहला कदम' : 'FIRST, A SMALL CHOICE'}</div>
                <h1 className="screen-title">{t('chooseMode')}</h1><p className="screen-copy">{t('modeCopy')}</p>
                <div className="option-list">
                  <button type="button" className={`choice ${mode === 'self' ? 'selected' : ''}`} data-testid="choice-mode-self" onClick={() => setMode('self')}>
                    <span><span className="choice-title">{t('self')}</span><span className="choice-desc">{t('selfDesc')}</span></span><span className="choice-icon">{mode === 'self' ? <Check size={17} /> : <ChevronRight size={17} />}</span>
                  </button>
                  <button type="button" className={`choice ${mode === 'assisted' ? 'selected' : ''}`} data-testid="choice-mode-assisted" onClick={() => setMode('assisted')}>
                    <span><span className="choice-title">{t('assisted')}</span><span className="choice-desc">{t('assistedDesc')}</span></span><span className="choice-icon">{mode === 'assisted' ? <Check size={17} /> : <ChevronRight size={17} />}</span>
                  </button>
                </div>
                {mode === 'assisted' && <div className="notice"><Volume2 size={18} /><div>{t('assistedHint')}</div></div>}
                <div className="actions"><button className="btn secondary" data-testid="button-back-mode" onClick={() => setScreen('language')}><ArrowLeft size={16} /> {t('back')}</button><button className="btn" data-testid="button-continue-mode" onClick={() => setScreen('privacy')}>{t('continue')} <ArrowRight size={17} /></button></div>
              </>}

              {screen === 'privacy' && <>
                <div className="eyebrow">{hindi ? 'आपकी जानकारी' : 'YOUR INFORMATION'}</div>
                <h1 className="screen-title">{t('privacyTitle')}</h1>
                <p className="screen-copy">{t('privacyBody')}</p>
                <div className="notice"><ShieldCheck size={20} /><div><strong>{hindi ? 'साफ़ और सुरक्षित' : 'Clear and private'}</strong>{t('privacyNever')}</div></div>
                <p className="screen-copy">{hindi ? 'कोई लॉगिन नहीं। कोई नेटवर्क अनुरोध नहीं। शुरू करने के लिए तैयार हों तो आगे बढ़ें।' : 'No sign-in. No network requests. Continue when you are ready.'}</p>
                <div className="actions"><button className="btn secondary" data-testid="button-back-privacy" onClick={() => setScreen('mode')}><ArrowLeft size={16} /> {t('back')}</button><button className="btn" data-testid="button-continue-privacy" onClick={() => setScreen('location')}>{t('continue')} <ArrowRight size={17} /></button></div>
              </>}

              {screen === 'location' && <>
                <div className="eyebrow">{hindi ? 'आपकी जगह' : 'A BROAD LOCATION'}</div>
                <h1 className="screen-title">{t('chooseLocation')}</h1><p className="screen-copy">{t('locationCopy')}</p>
                <div className="form-field"><label className="form-label" htmlFor="state-select">{hindi ? 'राज्य / केंद्र शासित प्रदेश' : fieldLabels.state}</label>
                  <select id="state-select" className="select-control" data-testid="input-state" value={profile.state ?? ''} onChange={(event) => setAnswer('state', event.target.value || null)}>
                    <option value="">{hindi ? 'चुनें या पता नहीं' : 'Choose or not sure'}</option>{options.state?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
                <div className="form-field"><label className="form-label" htmlFor="district-select">{hindi ? 'ज़िला (वैकल्पिक)' : fieldLabels.district}</label>
                  <select id="district-select" className="select-control" data-testid="input-district" value={profile.district ?? ''} onChange={(event) => setAnswer('district', event.target.value || null)}>
                    <option value="">{hindi ? 'पता नहीं / छोड़ें' : 'Not sure / skip'}</option>{options.district?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select><div className="form-hint">{hindi ? 'इस डेमो में ज़िले का नाम किसी नियम को प्रभावित नहीं करता।' : 'District name does not affect any rule in this demo.'}</div>
                </div>
                <div className="actions"><button className="btn secondary" data-testid="button-back-location" onClick={() => setScreen('privacy')}><ArrowLeft size={16} /> {t('back')}</button><button className="btn" data-testid="button-continue-location" onClick={() => setScreen('category')}>{t('continue')} <ArrowRight size={17} /></button></div>
              </>}

              {screen === 'category' && <>
                <div className="eyebrow">{hindi ? 'आपका ध्यान किस पर है?' : 'WHAT MATTERS RIGHT NOW?'}</div>
                <h1 className="screen-title">{t('categoryTitle')}</h1><p className="screen-copy">{t('categoryCopy')}</p>
                <div className="option-list">
                  {categories.map((category) => <button key={category.value} className={`choice ${profile.category === category.value ? 'selected' : ''}`} data-testid={`choice-category-${category.value.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setAnswer('category', category.value)}>
                    <span><span className="choice-title">{hindi ? category.hi : category.en}</span><span className="choice-desc">{hindi ? `क्षेत्र ${category.icon}` : `Area ${category.icon}`}</span></span><span className="choice-icon">{profile.category === category.value ? <Check size={17} /> : <ChevronRight size={17} />}</span>
                  </button>)}
                  <button className={`choice ${profile.category === 'not-sure' ? 'selected' : ''}`} data-testid="choice-category-not-sure" onClick={() => setAnswer('category', 'not-sure')}>
                    <span><span className="choice-title">{t('notSure')}</span><span className="choice-desc">{t('notSureDesc')}</span></span><span className="choice-icon">{profile.category === 'not-sure' ? <Check size={17} /> : <CircleHelp size={17} />}</span>
                  </button>
                </div>
                <div className="actions"><button className="btn secondary" data-testid="button-back-category" onClick={() => setScreen('location')}><ArrowLeft size={16} /> {t('back')}</button><button className="btn" disabled={!profile.category} data-testid="button-continue-category" onClick={beginQuestions}>{t('continue')} <ArrowRight size={17} /></button></div>
              </>}

              {screen === 'questions' && currentField && <>
                <div className="eyebrow">{hindi ? 'बस कुछ आसान सवाल' : 'JUST A FEW SIMPLE QUESTIONS'}</div>
                <div className="question-count">{hindi ? `सवाल ${questionIndex + 1} / ${questionFields.length}` : `QUESTION ${questionIndex + 1} OF ${questionFields.length}`}</div>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${((questionIndex + 1) / Math.max(1, questionFields.length)) * 100}%` }} /></div>
                <h1 className="screen-title" style={{ marginTop: 24 }}>{hindi ? ({ ageBand: 'आपकी उम्र किस दायरे में है?', incomeBand: 'घर की सालाना आय का अनुमान?', studentStatus: 'क्या आप अभी पढ़ाई कर रहे हैं?', farmingStatus: 'क्या आप खेती का काम करते हैं?', familyStatus: 'आपके घर की स्थिति कैसी है?', occupation: 'आपका काम किस तरह का है?' } as Record<string, string>)[currentField] : fieldLabels[currentField]}</h1>
                <p className="screen-copy">{hindi ? questionIntroHindi[currentField] : questionIntro[currentField]}</p>
                {mode === 'assisted' && <div className="voice-note"><Volume2 size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />{t('assistedHint')}</div>}
                <div className="option-list">
                  {currentOptions.map((option) => <button key={option.value} className={`choice ${profile[currentField] === option.value ? 'selected' : ''}`} data-testid={`choice-answer-${currentField}-${option.value}`} onClick={() => answerAndNext(option.value)}>
                    <span className="choice-title">{hindi ? option.label : option.label}</span><span className="choice-icon">{profile[currentField] === option.value ? <Check size={17} /> : <ChevronRight size={17} />}</span>
                  </button>)}
                  <button className={`choice ${profile[currentField] === null ? 'selected' : ''}`} data-testid={`choice-answer-${currentField}-unknown`} onClick={() => answerAndNext(null)}>
                    <span className="choice-title">{t('unknown')}</span><span className="choice-icon"><CircleHelp size={17} /></span>
                  </button>
                </div>
                <div className="voice-note" role="status">{voiceMessage || (unsupportedVoice ? (hindi ? 'आवाज़ से जवाब इस ब्राउज़र में उपलब्ध नहीं है। ऊपर के विकल्प चुनें।' : 'Voice answers are not available in this browser. Please use the choices above.') : (hindi ? 'चाहें तो आवाज़ में विकल्प बोलें।' : 'If you prefer, say one of the listed options.'))}</div>
                {!unsupportedVoice && <button className="btn secondary small" style={{ marginTop: 12 }} data-testid="button-voice-input" onClick={startVoice}><Mic size={15} />{hindi ? 'आवाज़ से जवाब' : 'Answer by voice'}</button>}
                <div className="actions"><button className="btn secondary" data-testid="button-back-questions" onClick={() => setScreen('category')}><ArrowLeft size={16} /> {t('back')}</button><button className="btn text" data-testid="button-skip-question" onClick={() => answerAndNext(null)}>{hindi ? 'इस सवाल को छोड़ें' : 'Skip this question'} <ArrowRight size={16} /></button></div>
              </>}

              {screen === 'review' && <>
                <div className="eyebrow">{hindi ? 'तुलना से पहले' : 'BEFORE WE COMPARE'}</div><h1 className="screen-title">{t('reviewTitle')}</h1><p className="screen-copy">{t('reviewCopy')}</p>
                <div style={{ marginTop: 24 }}>
                  {([
                    ['state', 'Location'], ['district', 'District'], ['category', 'Support area'], ['ageBand', 'Age range'], ['incomeBand', 'Household income'], ['occupation', 'Work situation'], ['studentStatus', 'Studying'], ['farmingStatus', 'Farming'], ['familyStatus', 'Household situation'],
                  ] as [Field, string][]).map(([field, label]) => {
                    const raw = profile[field];
                    const display = options[field]?.find((item) => item.value === raw)?.label ?? (field === 'category' ? categories.find((item) => item.value === raw)?.[hindi ? 'hi' : 'en'] ?? (raw === 'not-sure' ? t('notSure') : null) : raw) ?? t('unknownAnswer');
                    return <div className="review-row" key={field} data-testid={`review-answer-${field}`}><span>{hindi ? ({ state: 'राज्य / केंद्र शासित प्रदेश', district: 'ज़िला', category: 'सहायता का क्षेत्र', ageBand: 'उम्र', incomeBand: 'घर की आय', occupation: 'काम', studentStatus: 'पढ़ाई', farmingStatus: 'खेती', familyStatus: 'घर की स्थिति' } as Record<string, string>)[field] : label}</span><strong>{display}</strong><button type="button" className="link-button" aria-label={`${hindi ? 'बदलें' : 'Change'} ${label}`} data-testid={`button-edit-${field}`} onClick={() => editAnswer(field)}>{hindi ? 'बदलें' : 'Change'}</button></div>;
                  })}
                </div>
                <div className="notice"><AlertCircle size={18} /><div>{hindi ? 'यह तुलना काल्पनिक नियमों की है, असली योजनाओं की नहीं।' : 'This compares fictional rules, not real schemes.'}</div></div>
                <div className="actions"><button className="btn secondary" data-testid="button-back-review" onClick={() => setScreen('category')}><ArrowLeft size={16} /> {t('back')}</button><button className="btn" data-testid="button-show-results" onClick={() => setScreen('results')}>{t('compare')} <ArrowRight size={17} /></button></div>
              </>}

              {screen === 'results' && <>
                <div className="result-head"><div><div className="eyebrow">{hindi ? 'नतीजे' : 'A CAREFUL FIRST LOOK'}</div><h1 className="screen-title">{t('resultsTitle')}</h1><p className="screen-copy">{t('resultsCopy')}</p></div><span className="badge">{hindi ? 'काल्पनिक डेमो' : 'FICTIONAL DEMO'}</span></div>
                <div className="notice"><AlertCircle size={19} /><div><strong>{t('warning')}</strong>{t('warningText')}</div></div>
                <div className="result-groups">
                  {([
                    { key: 'true' as Truth, title: t('mayMatch'), mark: '' },
                    { key: 'unknown' as Truth, title: t('needMore'), mark: 'unknown' },
                    { key: 'false' as Truth, title: t('doesNot'), mark: 'no' },
                  ]).map((group) => <section key={group.key} data-testid={`result-group-${group.key}`}>
                    <h2 className="group-heading"><span className={`group-mark ${group.mark}`} />{group.title}<span style={{ color: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}>({groups[group.key].length})</span></h2>
                    {groups[group.key].length ? groups[group.key].map(({ scheme }) => <ResultCard key={scheme.id} scheme={scheme} profile={profile} result={group.key} onOpen={() => openDetails(scheme)} hindi={hindi} />) :
                      <div className="empty-state" data-testid={`empty-group-${group.key}`}>{hindi ? 'इस समूह में कोई उदाहरण नहीं।' : 'No examples in this group.'}</div>}
                  </section>)}
                </div>
                <div className="actions"><button className="btn secondary" data-testid="button-review-answers" onClick={() => setScreen('review')}><ArrowLeft size={16} /> {t('reviewAnswers')}</button><button className="btn text" data-testid="button-reset-results" onClick={resetSession}><RotateCcw size={15} /> {t('restart')}</button></div>
              </>}

              {screen === 'detail' && selectedScheme && <>
                <div className="eyebrow">{hindi ? 'काल्पनिक उदाहरण' : 'FICTIONAL EXAMPLE'}</div><span className="badge">{selectedScheme.status}</span>
                <h1 className="screen-title">{selectedScheme.title}</h1><p className="screen-copy">{selectedScheme.category} · {hindi ? 'यह नाम और नियम बनाए गए हैं।' : 'Name and rule invented for this prototype.'}</p>
                <div className="notice"><AlertCircle size={19} /><div><strong>{t('warning')}</strong>{t('warningText')}</div></div>
                <div className="detail-block"><h3>{hindi ? 'आपके जवाबों से तुलना' : 'How your answers compare'}</h3>
                  <p>{explanationFor(selectedScheme, profile, evaluate(selectedScheme.rule, profile), hindi)}</p>
                  {unresolvedFields(selectedScheme.rule, profile).length > 0 && <p><strong>{hindi ? 'अभी पता नहीं:' : 'Still unknown:'}</strong> {unresolvedFields(selectedScheme.rule, profile).map((field) => hindi ? ({ ageBand: 'उम्र', incomeBand: 'आय', studentStatus: 'पढ़ाई', farmingStatus: 'खेती', familyStatus: 'घर की स्थिति', occupation: 'काम', state: 'राज्य', district: 'ज़िला', category: 'क्षेत्र' } as Record<Field, string>)[field] : fieldLabels[field]).join(', ')}</p>}
                </div>
                <div className="detail-block"><h3>{hindi ? 'काल्पनिक अगला कदम' : 'Fictional next step'}</h3><p>{selectedScheme.guidance}</p><p><strong>{hindi ? 'स्रोत:' : 'Source note:'}</strong> {selectedScheme.sourceNote}</p></div>
                <div className="actions"><button className="btn secondary" data-testid="button-back-results-detail" onClick={() => setScreen('results')}><ArrowLeft size={16} /> {hindi ? 'नतीजों पर लौटें' : 'Back to results'}</button><button className="btn" data-testid="button-view-checklist" onClick={() => { setCheckedItems([]); setScreen('checklist'); }}><ClipboardList size={17} /> {hindi ? 'डेमो सूची देखें' : 'View demo checklist'}</button></div>
              </>}

              {screen === 'checklist' && selectedScheme && <>
                <div className="eyebrow">{hindi ? 'सहेजने योग्य सूची' : 'A TAKE-ALONG NOTE'}</div><h1 className="screen-title">{hindi ? 'डेमो बातचीत सूची' : 'Demo conversation checklist'}</h1><p className="screen-copy">{selectedScheme.title} · {hindi ? 'काल्पनिक उदाहरण' : 'Fictional example'}</p>
                <div className="notice"><AlertCircle size={18} /><div><strong>{hindi ? 'कृपया ध्यान दें' : 'Please note'}</strong>{hindi ? 'यह आधिकारिक दस्तावेज़ सूची नहीं है। वास्तविक जानकारी किसी भरोसेमंद आधिकारिक स्रोत से लें।' : 'This is not an official document list. Check real information with a trusted official source.'}</div></div>
                <div style={{ marginTop: 18 }}>
                  {selectedScheme.checklist.map((item, index) => <label className="check-row" key={item}><input type="checkbox" data-testid={`checklist-item-${index}`} checked={checkedItems.includes(item)} onChange={(event) => setCheckedItems((previous) => event.target.checked ? [...previous, item] : previous.filter((entry) => entry !== item))} /><span>{item}</span></label>)}
                </div>
                <div className="detail-block"><h3>{hindi ? 'साथ ले जाने का संदेश' : 'A note to take along'}</h3><p>{selectedScheme.guidance}</p></div>
                <div className="actions no-print"><button className="btn secondary" data-testid="button-print-checklist" onClick={() => window.print()}><Printer size={16} /> {hindi ? 'प्रिंट करें / PDF' : 'Print / save as PDF'}</button><button className="btn secondary" data-testid="button-share-checklist" onClick={async () => {
                  const text = `${selectedScheme.title}\n\n${selectedScheme.checklist.map((item) => `□ ${item}`).join('\n')}\n\n${selectedScheme.sourceNote}`;
                  if (navigator.share) { try { await navigator.share({ title: selectedScheme.title, text }); } catch { /* share dialog dismissed */ } }
                  else if (navigator.clipboard) { await navigator.clipboard.writeText(text); window.alert(hindi ? 'सूची क्लिपबोर्ड पर कॉपी हुई।' : 'Checklist copied to clipboard.'); }
                  else window.alert(hindi ? 'शेयर सुविधा इस ब्राउज़र में उपलब्ध नहीं है। प्रिंट विकल्प इस्तेमाल करें।' : 'Sharing is not available in this browser. Use the print option instead.');
                }}><ClipboardList size={16} /> {hindi ? 'शेयर / कॉपी करें' : 'Share / copy checklist'}</button></div>
                <div className="actions"><button className="btn secondary" data-testid="button-back-detail" onClick={() => setScreen('detail')}><ArrowLeft size={16} /> {hindi ? 'उदाहरण पर लौटें' : 'Back to example'}</button><button className="btn text" data-testid="button-reset-checklist" onClick={resetSession}><RotateCcw size={15} /> {t('restart')}</button></div>
              </>}
            </div>
            <div className="session-footer">
              <span>{screen === 'language' ? (hindi ? 'कोई खाता नहीं • कोई नेटवर्क अनुरोध नहीं' : 'No account • No network requests') : `${progress}% ${hindi ? 'पूरा' : 'complete'}`}</span>
              {screen !== 'language' && <button type="button" data-testid="button-clear-session" onClick={resetSession}>{t('restart')}</button>}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ResultCard({ scheme, profile, result, onOpen, hindi }: { scheme: DemoScheme; profile: Profile; result: Truth; onOpen: () => void; hindi: boolean }) {
  return <article className="result-card" data-testid={`card-result-${scheme.id}`}>
    <div className="result-card-top"><div><h3>{scheme.title}</h3><p>{scheme.category} · {scheme.status}</p></div><button className="link-button" data-testid={`button-open-${scheme.id}`} onClick={onOpen}>{hindi ? 'जानें' : 'View example'} <ChevronRight size={14} style={{ verticalAlign: 'middle' }} /></button></div>
    <p>{explanationFor(scheme, profile, result, hindi)}</p>
  </article>;
}

function explanationFor(scheme: DemoScheme, profile: Profile, result: Truth, hindi: boolean): string {
  if (result === 'unknown') {
    const unknown = unresolvedFields(scheme.rule, profile);
    return hindi
      ? `इस उदाहरण का कुछ हिस्सा मेल खाता है, लेकिन ${unknown.map((field) => fieldLabels[field]).join(', ') || 'कुछ जवाब'} अभी पता नहीं हैं।`
      : `Some parts of this example line up, but ${unknown.map((field) => fieldLabels[field]).join(', ') || 'some answers'} are still unknown.`;
  }
  if (result === false) return hindi
    ? 'आपके दिए जवाब इस काल्पनिक नियम से मेल नहीं खाते। इसका किसी असली सहायता पर कोई असर नहीं है।'
    : 'Your answers do not match this fictional rule. This says nothing about real-world support.';
  return hindi
    ? 'आपके जवाब इस काल्पनिक नियम से मेल खाते हैं। यह पात्रता की पुष्टि नहीं करता।'
    : 'Your answers match this fictional rule. This is not confirmation of eligibility.';
}

export default App;
