import { useMemo, useState } from 'react';
import {
  AlertCircle, ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight,
  CircleHelp, ClipboardList, ExternalLink, Filter, HelpCircle,
  Languages, Mic, Printer, RotateCcw, Search, ShieldCheck, Sparkles, Sprout,
  UserCheck, UserPlus, Volume2, X
} from 'lucide-react';
import {
  schemes, type Profile, type Field, type Rule, type Truth, type Scheme, type Localized,
  options, fieldLabels, questionHelp, supportAreas, initialProfile, evaluate, unresolvedFields, getSchemeResult,
} from './scheme-data';

type ViewTab = 'directory' | 'checker' | 'wizard';
type WizardScreen = 'category' | 'questions' | 'review' | 'results';
type AppScreen = 'main' | 'detail' | 'prep';
type Language = 'en' | 'hi';
type Mode = 'self' | 'assisted';

const copy: Record<string, Localized> = {
  appName: { en: 'SchemeSaathi', hi: 'स्कीमसाथी (SchemeSaathi)' },
  tagline: {
    en: 'Verified portal schemes for Maharashtra (MahaDBT) and Central Government with direct registration & application links.',
    hi: 'महाराष्ट्र महाडीबीटी (MahaDBT) आणि केंद्र सरकारच्या अधिकृत योजना, थेट नोंदणी व अर्जाच्या लिंकसह.',
  },
  tabDirectory: { en: 'Explore All Schemes', hi: 'सर्व योजना शोधा (Directory)' },
  tabChecker: { en: 'Quick Eligibility Check', hi: 'झटपट पात्रता तपासा (Eligibility)' },
  tabWizard: { en: 'Guided Assistant', hi: 'मार्गदर्शित सहाय्यक (Wizard)' },
  searchPlaceholder: {
    en: 'Search schemes by name, department, or keyword (e.g., EBC, tractor, scholarship, ladki bahin, hostel, drip)...',
    hi: 'योजनेचे नाव, विभाग किंवा विषय शोधा (उदा. ईबीसी, ट्रॅक्टर, शिष्यवृत्ती, लाडकी बहीण, वसतिगृह, ठिबक)...',
  },
  allPortals: { en: 'All Portals', hi: 'सर्व पोर्टल्स' },
  mahadbtPortal: { en: 'MahaDBT (Maharashtra)', hi: 'महाडीबीटी (महाराष्ट्र)' },
  centralPortal: { en: 'Central Govt (NSP/PM)', hi: 'केंद्रीय योजना (NSP/PM)' },
  statePortal: { en: 'State Welfare', hi: 'राज्य कल्याणकारी योजना' },
  allCategories: { en: 'All Categories', hi: 'सर्व प्रवर्ग' },
  allAreas: { en: 'All Support Areas', hi: 'सर्व क्षेत्र' },
  filterByPortal: { en: 'Portal', hi: 'पोर्टल' },
  filterByArea: { en: 'Area', hi: 'क्षेत्र' },
  filterByCaste: { en: 'Category', hi: 'जात प्रवर्ग' },
  schemesFound: { en: 'Schemes Available', hi: 'उपलब्ध योजना' },
  applyOnPortal: { en: 'Apply / Login', hi: 'अर्ज करा / लॉगिन' },
  registerOnPortal: { en: 'Register to Apply', hi: 'नवीन नोंदणी करा' },
  viewDetails: { en: 'View Details & Documents', hi: 'सविस्तर माहिती व कागदपत्रे' },
  benefit: { en: 'Financial & Scheme Benefit', hi: 'आर्थिक व योजना लाभ' },
  eligibility: { en: 'Eligibility & Criteria', hi: 'पात्रता आणि निकष' },
  documents: { en: 'Required Documents for Application', hi: 'अर्जासाठी आवश्यक कागदपत्रे' },
  notes: { en: 'Important Guidelines & Warnings', hi: 'महत्त्वाच्या सूचना व नियम' },
  source: { en: 'Official Source & Resolution', hi: 'अधिकृत शासकीय स्रोत व शासन निर्णय' },
  sourceEvidence: { en: 'Official Quoted Evidence', hi: 'शासकीय संदर्भातील मूळ मजकूर' },
  checked: { en: 'Verified on', hi: 'सत्यापित दिनांक' },
  prepTitle: { en: 'Application Preparation Checklist', hi: 'अर्ज पूर्वतयारी आणि कागदपत्र यादी' },
  prepText: {
    en: 'Use this checklist to gather all required original documents and certificates before opening the MahaDBT or official portal.',
    hi: 'महाडीबीटी किंवा अधिकृत पोर्टलवर अर्ज भरण्यापूर्वी हे सर्व मूळ दाखले व कागदपत्रे सोबत तयार ठेवा.',
  },
  aligned: { en: 'Eligible / Criteria Aligned', hi: 'पात्र / निकषांनुसार योग्य' },
  check: { en: 'Verification / Specific Path Check Needed', hi: 'तपासणी / अटींची खात्री आवश्यक' },
  notAligned: { en: 'Not Aligned with Criteria', hi: 'शर्तींनुसार अपात्र' },
  backToSchemes: { en: 'Back to Schemes', hi: 'योजना यादीकडे परत' },
  back: { en: 'Back', hi: 'मागे' },
  continue: { en: 'Continue', hi: 'पुढे जा' },
  restart: { en: 'Reset Filters / Profile', hi: 'रीसेट करा' },
  printNote: { en: 'Print / Save as PDF', hi: 'प्रिंट / PDF सेव्ह करा' },
  shareNote: { en: 'Copy Document Checklist', hi: 'कागदपत्र यादी कॉपी करा' },
  caveatTitle: { en: 'Official Disclaimer', hi: 'अधिकृत सूचना' },
  caveat: {
    en: 'SchemeSaathi is an independent informational guide. Always register and apply on the official government portals (mahadbt.maharashtra.gov.in, scholarships.gov.in, pmkisan.gov.in). Never share confidential passwords or OTPs.',
    hi: 'स्कीमसाथी ही मार्गदर्शक माहिती प्रणाली आहे. नेहमी अधिकृत सरकारी पोर्टलवरच (mahadbt.maharashtra.gov.in) नोंदणी व अर्ज करा. कोणाशीही पासवर्ड किंवा ओटीपी शेअर करू नका.',
  },
};

const localized = (value: Localized, language: Language) => value[language];

const casteChoices = [
  { value: 'all', label: { en: 'All Categories', hi: 'सर्व प्रवर्ग' } },
  { value: 'OPEN', label: { en: 'Open / EBC', hi: 'खुला / ईबीसी' } },
  { value: 'OBC', label: { en: 'OBC', hi: 'इतर मागास वर्ग (OBC)' } },
  { value: 'SC', label: { en: 'SC', hi: 'अनुसूचित जाती (SC)' } },
  { value: 'ST', label: { en: 'ST', hi: 'अनुसूचित जमाती (ST)' } },
  { value: 'VJNT', label: { en: 'VJNT / NT', hi: 'विजाभज (VJNT/NT)' } },
  { value: 'SBC', label: { en: 'SBC', hi: 'विशेष मागास प्रवर्ग (SBC)' } },
  { value: 'MINORITY', label: { en: 'Minority', hi: 'अल्पसंख्याक' } },
];

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [viewTab, setViewTab] = useState<ViewTab>('directory');
  const [appScreen, setAppScreen] = useState<AppScreen>('main');
  const [wizardScreen, setWizardScreen] = useState<WizardScreen>('category');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [portalFilter, setPortalFilter] = useState<'all' | 'mahadbt' | 'central' | 'state'>('all');
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [casteFilter, setCasteFilter] = useState<string>('all');

  // Quick Eligibility Profile State
  const [quickProfile, setQuickProfile] = useState<Profile>({
    ...initialProfile,
    mahadbtDomicile: 'yes',
    casteCategory: 'open',
    annualIncome: '2.5-to-8',
    occupationStatus: 'student-technical',
    farmerLandholder: 'no',
    ageBand: '18-39',
  });
  const [showEligibleOnly, setShowEligibleOnly] = useState(false);

  // Guided Wizard State
  const [wizardProfile, setWizardProfile] = useState<Profile>({ ...initialProfile });
  const [wizardFields, setWizardFields] = useState<Field[]>([]);
  const [wizardIndex, setWizardIndex] = useState(0);
  const [skippedFields, setSkippedFields] = useState<Set<Field>>(new Set());
  const [voiceMessage, setVoiceMessage] = useState('');

  // Checklist interactive state for details view
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const t = (key: string) => localized(copy[key] ?? { en: key, hi: key }, language);
  const isHindi = language === 'hi';

  // Instant Search & Filtering
  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      // Portal Filter
      if (portalFilter !== 'all' && scheme.portal !== portalFilter) return false;

      // Area Filter
      if (areaFilter !== 'all' && scheme.category !== areaFilter) return false;

      // Caste Filter
      if (casteFilter !== 'all') {
        const matchesCaste = scheme.casteCategories.includes(casteFilter) || scheme.casteCategories.includes('ALL');
        if (!matchesCaste) return false;
      }

      // Keyword Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const enTitle = scheme.title.en.toLowerCase();
        const hiTitle = scheme.title.hi.toLowerCase();
        const enDept = scheme.department.en.toLowerCase();
        const hiDept = scheme.department.hi.toLowerCase();
        const enBenefit = scheme.benefit.en.toLowerCase();
        const hiBenefit = scheme.benefit.hi.toLowerCase();
        const enSummary = scheme.summary.en.toLowerCase();
        const hiSummary = scheme.summary.hi.toLowerCase();
        const shortTitleEn = scheme.shortTitle.en.toLowerCase();
        const shortTitleHi = scheme.shortTitle.hi.toLowerCase();

        const match =
          enTitle.includes(q) ||
          hiTitle.includes(q) ||
          enDept.includes(q) ||
          hiDept.includes(q) ||
          enBenefit.includes(q) ||
          hiBenefit.includes(q) ||
          enSummary.includes(q) ||
          hiSummary.includes(q) ||
          shortTitleEn.includes(q) ||
          shortTitleHi.includes(q) ||
          scheme.category.toLowerCase().includes(q);

        if (!match) return false;
      }

      // Quick Eligibility Filter toggle
      if (viewTab === 'checker' && showEligibleOnly) {
        const res = getSchemeResult(scheme, quickProfile);
        if (res !== true) return false;
      }

      return true;
    });
  }, [portalFilter, areaFilter, casteFilter, searchQuery, viewTab, showEligibleOnly, quickProfile]);

  // Checker evaluation groupings
  const checkerResults = useMemo(() => {
    return schemes.map((scheme) => ({
      scheme,
      result: getSchemeResult(scheme, quickProfile),
    }));
  }, [quickProfile]);

  const checkerGroups = useMemo(() => {
    return {
      eligible: checkerResults.filter((item) => item.result === true),
      check: checkerResults.filter((item) => item.result === 'unknown'),
      notEligible: checkerResults.filter((item) => item.result === false),
    };
  }, [checkerResults]);

  function openSchemeDetail(scheme: Scheme) {
    setSelectedScheme(scheme);
    setCheckedDocs({});
    setAppScreen('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleDocCheck(index: number) {
    setCheckedDocs((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  function handleQuickChange(field: Field, val: string | null) {
    setQuickProfile((prev) => ({ ...prev, [field]: val }));
  }

  // Wizard flow helpers
  function startWizard(cat: string) {
    const nextProf = { ...initialProfile, category: cat };
    setWizardProfile(nextProf);
    const needed = new Set<Field>();
    const rel = schemes.filter((s) => cat === 'all' || s.category === cat);
    rel.forEach((s) => {
      unresolvedFields(s.rule, nextProf).forEach((f) => needed.add(f));
    });
    const order = Object.keys(options) as Field[];
    const qList = order.filter((f) => needed.has(f));
    setWizardFields(qList);
    setWizardIndex(0);
    setSkippedFields(new Set());
    setWizardScreen('questions');
  }

  function answerWizard(val: string | null) {
    const cur = wizardFields[wizardIndex];
    if (!cur) return;
    setWizardProfile((prev) => ({ ...prev, [cur]: val }));
    if (wizardIndex + 1 < wizardFields.length) {
      setWizardIndex(wizardIndex + 1);
    } else {
      setWizardScreen('results');
    }
  }

  const wizardResults = useMemo(() => {
    const rel = schemes.filter((s) => wizardProfile.category === 'all' || s.category === wizardProfile.category);
    return rel.map((s) => ({
      scheme: s,
      result: getSchemeResult(s, wizardProfile),
    }));
  }, [wizardProfile]);

  async function shareDocumentChecklist() {
    if (!selectedScheme) return;
    const text = [
      `Scheme: ${selectedScheme.title[language]}`,
      `Department: ${selectedScheme.department[language]}`,
      '',
      '--- REQUIRED DOCUMENTS FOR APPLICATION ---',
      ...selectedScheme.applicationDocuments.map((doc, idx) => `${idx + 1}. ${doc[language]}`),
      '',
      '--- DIRECT APPLICATION LINKS ---',
      `Registration: ${selectedScheme.registrationUrl}`,
      `Login & Apply: ${selectedScheme.applicationUrl}`,
      `Official Source: ${selectedScheme.sourceUrl}`,
    ].join('\n');

    if (navigator.share) {
      try {
        await navigator.share({ title: selectedScheme.title[language], text });
      } catch {
        /* share dismissed */
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        alert(isHindi ? 'कागदपत्रांची यादी कॉपी केली आहे!' : 'Checklist copied to clipboard!');
      } catch {
        window.print();
      }
    } else {
      window.print();
    }
  }

  return (
    <div className="app-shell">
      {/* Top Header */}
      <header className="topbar">
        <div className="brand" aria-label="SchemeSaathi">
          <span className="brand-mark" aria-hidden="true">
            <Sprout size={20} />
          </span>
          <div>
            <div style={{ lineHeight: 1 }}>{t('appName')}</div>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'hsl(var(--muted-foreground))' }}>
              MahaDBT & Central Schemes Portal
            </div>
          </div>
        </div>

        <div className="topbar-right">
          <span className="privacy-pill">
            <ShieldCheck size={15} />
            <span className="privacy-label">
              {isHindi ? 'थेट अधिकृत सरकारी लिंक' : 'Direct Official Govt Links'}
            </span>
          </span>
          <button
            className="btn secondary small"
            type="button"
            data-testid="button-language-toggle"
            onClick={() => setLanguage(isHindi ? 'en' : 'hi')}
            aria-label="Toggle language"
          >
            <Languages size={15} /> {isHindi ? 'English' : 'मराठी / हिंदी'}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-wrap">
        {/* DETAIL SCREEN */}
        {appScreen === 'detail' && selectedScheme && (
          <div className="screen-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <button
                type="button"
                className="btn secondary small"
                onClick={() => setAppScreen('main')}
              >
                <ArrowLeft size={15} /> {t('backToSchemes')}
              </button>

              <div style={{ display: 'flex', gap: 8 }}>
                <span className={`portal-badge ${selectedScheme.portal}`}>
                  {selectedScheme.portal === 'mahadbt' ? 'MahaDBT Maharashtra' : selectedScheme.portal === 'central' ? 'Central Govt (NSP)' : 'Maharashtra State'}
                </span>
                <span className="mini-tag">{selectedScheme.category}</span>
              </div>
            </div>

            <div className="eyebrow">{selectedScheme.department[language]}</div>
            <h1 className="screen-title" style={{ marginTop: 6, fontSize: 'clamp(26px, 3.5vw, 36px)' }}>
              {selectedScheme.title[language]}
            </h1>
            <p className="screen-copy">{selectedScheme.summary[language]}</p>

            {/* DIRECT ACTION BUTTONS (MahaDBT Apply & Register) */}
            <div style={{ margin: '24px 0', padding: '20px', background: 'hsl(var(--muted) / .6)', borderRadius: 16, border: '1px solid hsl(var(--border))' }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.06em', color: 'hsl(var(--foreground))' }}>
                {isHindi ? 'थेट अधिकृत अर्ज व नोंदणी लिंक (Official Links)' : 'DIRECT OFFICIAL APPLICATION & REGISTRATION LINKS'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <a
                  className="btn"
                  href={selectedScheme.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <ExternalLink size={16} /> {selectedScheme.applicationLabel[language]}
                </a>

                {selectedScheme.registrationUrl && (
                  <a
                    className="btn secondary"
                    href={selectedScheme.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <UserPlus size={16} /> {selectedScheme.registrationLabel?.[language] ?? t('registerOnPortal')}
                  </a>
                )}

                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => setAppScreen('prep')}
                >
                  <ClipboardList size={16} /> {t('prepTitle')}
                </button>
              </div>
              <div style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))', marginTop: 10 }}>
                {isHindi
                  ? 'टीप: नवीन अर्जदारांनी प्रथम "नवीन नोंदणी" करावी आणि नंतर युजरनेम/पासवर्डने "लॉगिन करून अर्ज" करावा.'
                  : 'Note: First-time applicants must complete "New Registration", then use their login credentials to apply.'}
              </div>
            </div>

            {/* Benefits Block */}
            <section className="detail-block">
              <h3>{t('benefit')}</h3>
              <p className="benefit-copy" style={{ fontWeight: 600, color: 'hsl(var(--primary))' }}>
                {selectedScheme.benefit[language]}
              </p>
            </section>

            {/* Eligibility Block */}
            <section className="detail-block">
              <h3>{t('eligibility')}</h3>
              <ul>
                {selectedScheme.eligibility.map((item, index) => (
                  <li key={index} style={{ marginBottom: 6 }}>{item[language]}</li>
                ))}
              </ul>
            </section>

            {/* Interactive Documents Checklist */}
            <section className="detail-block">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <h3>{t('documents')}</h3>
                <span style={{ fontSize: 12, color: 'hsl(var(--muted-foreground))' }}>
                  {isHindi ? 'तुमच्याकडे तयार असलेली कागदपत्रे टिक करा:' : 'Tick off ready documents:'}
                </span>
              </div>
              <ul className="interactive-checklist">
                {selectedScheme.applicationDocuments.map((doc, index) => (
                  <li
                    key={index}
                    className={`checklist-item ${checkedDocs[index] ? 'checked' : ''}`}
                    onClick={() => toggleDocCheck(index)}
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedDocs[index]}
                      onChange={() => toggleDocCheck(index)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>{doc[language]}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Important Notes */}
            <section className="detail-block">
              <h3>{t('notes')}</h3>
              <ul>
                {selectedScheme.importantNotes.map((note, index) => (
                  <li key={index} style={{ marginBottom: 6 }}>{note[language]}</li>
                ))}
              </ul>
            </section>

            {/* Official Source */}
            <section className="source-panel" style={{ marginTop: 24, padding: 18, borderRadius: 12, background: 'hsl(var(--muted) / .4)', border: '1px solid hsl(var(--border))' }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{t('source')}</div>
              <p style={{ margin: '4px 0 8px', fontSize: 14 }}><strong>{selectedScheme.sourceTitle}</strong></p>
              <a
                className="source-link"
                href={selectedScheme.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'hsl(var(--primary))' }}
              >
                {selectedScheme.sourceUrl} <ExternalLink size={13} />
              </a>
              <blockquote style={{ margin: '12px 0 6px', paddingLeft: 12, borderLeft: '3px solid hsl(var(--primary))', fontStyle: 'italic', color: 'hsl(var(--muted-foreground))' }}>
                {selectedScheme.sourceQuote}
              </blockquote>
              <div style={{ fontSize: 11, color: 'hsl(var(--muted-foreground))', marginTop: 8 }}>
                <strong>{t('checked')}:</strong> {selectedScheme.checkedAt}
              </div>
            </section>

            <div className="actions" style={{ marginTop: 28 }}>
              <a
                className="btn"
                href={selectedScheme.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                {selectedScheme.applicationLabel[language]} <ExternalLink size={16} />
              </a>
              <button
                type="button"
                className="btn secondary"
                onClick={() => setAppScreen('main')}
              >
                <ArrowLeft size={15} /> {t('backToSchemes')}
              </button>
            </div>
          </div>
        )}

        {/* PREPARATION NOTE SCREEN */}
        {appScreen === 'prep' && selectedScheme && (
          <div className="screen-card">
            <div className="eyebrow">{isHindi ? 'प्रिंट किंवा सेतू केंद्रासाठी प्रत' : 'PRINT OR TAKE TO SETU KENDRA'}</div>
            <h1 className="screen-title">{t('prepTitle')}</h1>
            <p className="screen-copy">{selectedScheme.title[language]}</p>

            <div className="notice">
              <AlertCircle size={18} />
              <div>{t('prepText')}</div>
            </div>

            <section className="detail-block">
              <h3>{t('documents')}</h3>
              <ul>
                {selectedScheme.applicationDocuments.map((doc, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>{doc[language]}</li>
                ))}
              </ul>
            </section>

            <section className="detail-block">
              <h3>{t('notes')}</h3>
              <ul>
                {selectedScheme.importantNotes.map((note, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>{note[language]}</li>
                ))}
              </ul>
            </section>

            <div style={{ marginTop: 20, padding: 16, background: 'hsl(var(--muted) / .5)', borderRadius: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{isHindi ? 'पोर्टल लिंक:' : 'Official Portal Links:'}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                <strong>{t('registerOnPortal')}:</strong> {selectedScheme.registrationUrl}
              </div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                <strong>{t('applyOnPortal')}:</strong> {selectedScheme.applicationUrl}
              </div>
            </div>

            <div className="actions no-print" style={{ marginTop: 24 }}>
              <button type="button" className="btn secondary" onClick={() => window.print()}>
                <Printer size={16} /> {t('printNote')}
              </button>
              <button type="button" className="btn secondary" onClick={shareDocumentChecklist}>
                <ClipboardList size={16} /> {t('shareNote')}
              </button>
              <button type="button" className="btn secondary" onClick={() => setAppScreen('detail')}>
                <ArrowLeft size={16} /> {t('back')}
              </button>
            </div>
          </div>
        )}

        {/* MAIN SCREEN (TABS: DIRECTORY | CHECKER | WIZARD) */}
        {appScreen === 'main' && (
          <div>
            {/* Navigation Tabs */}
            <nav className="top-nav" aria-label="Main navigation">
              <button
                type="button"
                className={`nav-tab-btn ${viewTab === 'directory' ? 'active' : ''}`}
                onClick={() => setViewTab('directory')}
              >
                <Search size={15} /> {t('tabDirectory')}
              </button>
              <button
                type="button"
                className={`nav-tab-btn ${viewTab === 'checker' ? 'active' : ''}`}
                onClick={() => setViewTab('checker')}
              >
                <Sparkles size={15} /> {t('tabChecker')}
              </button>
              <button
                type="button"
                className={`nav-tab-btn ${viewTab === 'wizard' ? 'active' : ''}`}
                onClick={() => setViewTab('wizard')}
              >
                <UserCheck size={15} /> {t('tabWizard')}
              </button>
            </nav>

            {/* TAB 1: ALL SCHEMES DIRECTORY */}
            {viewTab === 'directory' && (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <h1 className="screen-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)', margin: '0 0 8px' }}>
                    {isHindi ? 'महाराष्ट्र व केंद्र सरकारी योजना' : 'Maharashtra & Central Govt Schemes'}
                  </h1>
                  <p className="screen-copy">{t('tagline')}</p>
                </div>

                {/* Instant Search Bar */}
                <div className="search-bar-wrap">
                  <Search className="search-icon-left" size={18} />
                  <input
                    type="text"
                    className="search-input"
                    placeholder={t('searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="search-clear-btn"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Multi-facet Filter Section */}
                <div className="filter-section">
                  {/* Portal Filter */}
                  <div className="filter-group">
                    <span className="filter-group-label">{t('filterByPortal')}:</span>
                    {(['all', 'mahadbt', 'central', 'state'] as const).map((portal) => (
                      <button
                        key={portal}
                        type="button"
                        className={`filter-chip ${portalFilter === portal ? 'active' : ''}`}
                        onClick={() => setPortalFilter(portal)}
                      >
                        {portal === 'all'
                          ? t('allPortals')
                          : portal === 'mahadbt'
                          ? t('mahadbtPortal')
                          : portal === 'central'
                          ? t('centralPortal')
                          : t('statePortal')}
                      </button>
                    ))}
                  </div>

                  {/* Area Filter */}
                  <div className="filter-group">
                    <span className="filter-group-label">{t('filterByArea')}:</span>
                    <button
                      type="button"
                      className={`filter-chip ${areaFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setAreaFilter('all')}
                    >
                      {t('allAreas')}
                    </button>
                    {supportAreas.map((area) => (
                      <button
                        key={area.value}
                        type="button"
                        className={`filter-chip ${areaFilter === area.value ? 'active' : ''}`}
                        onClick={() => setAreaFilter(area.value)}
                      >
                        {area[language]}
                      </button>
                    ))}
                  </div>

                  {/* Caste Category Filter */}
                  <div className="filter-group">
                    <span className="filter-group-label">{t('filterByCaste')}:</span>
                    {casteChoices.map((choice) => (
                      <button
                        key={choice.value}
                        type="button"
                        className={`filter-chip ${casteFilter === choice.value ? 'active' : ''}`}
                        onClick={() => setCasteFilter(choice.value)}
                      >
                        {choice.label[language]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results Count Banner */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'hsl(var(--muted-foreground))' }}>
                    {filteredSchemes.length} {t('schemesFound')}
                  </div>
                  {(searchQuery || portalFilter !== 'all' || areaFilter !== 'all' || casteFilter !== 'all') && (
                    <button
                      type="button"
                      className="link-button"
                      onClick={() => {
                        setSearchQuery('');
                        setPortalFilter('all');
                        setAreaFilter('all');
                        setCasteFilter('all');
                      }}
                    >
                      {t('restart')}
                    </button>
                  )}
                </div>

                {/* Scheme Cards Grid */}
                {filteredSchemes.length === 0 ? (
                  <div className="empty-state">
                    <p style={{ fontSize: 16 }}>{isHindi ? 'कोणतीही योजना सापडली नाही. शोध शब्द किंवा फिल्टर्स बदलून पहा.' : 'No schemes match your filter criteria. Try resetting search or filters.'}</p>
                    <button
                      type="button"
                      className="btn secondary small"
                      onClick={() => {
                        setSearchQuery('');
                        setPortalFilter('all');
                        setAreaFilter('all');
                        setCasteFilter('all');
                      }}
                    >
                      {t('restart')}
                    </button>
                  </div>
                ) : (
                  <div>
                    {filteredSchemes.map((scheme) => (
                      <article key={scheme.id} className="scheme-card-enhanced">
                        <div className="card-header-row">
                          <div className="card-badges">
                            <span className={`portal-badge ${scheme.portal}`}>
                              {scheme.portal === 'mahadbt' ? 'MahaDBT' : scheme.portal === 'central' ? 'Central (NSP/PM)' : 'State Portal'}
                            </span>
                            <span className="card-department">{scheme.department[language]}</span>
                          </div>
                          <span className="mini-tag">{scheme.category}</span>
                        </div>

                        <div>
                          <h2
                            className="card-title-link"
                            style={{ cursor: 'pointer' }}
                            onClick={() => openSchemeDetail(scheme)}
                          >
                            {scheme.title[language]}
                          </h2>
                          <p style={{ fontSize: 14, color: 'hsl(var(--muted-foreground))', margin: '4px 0 8px', lineHeight: 1.5 }}>
                            {scheme.summary[language]}
                          </p>
                        </div>

                        {/* Benefit highlight */}
                        <div>
                          <span className="benefit-pill">
                            <Sparkles size={14} /> {scheme.benefit[language]}
                          </span>
                        </div>

                        {/* Direct Action Buttons */}
                        <div className="card-btn-row">
                          <button
                            type="button"
                            className="btn-sm-secondary"
                            onClick={() => openSchemeDetail(scheme)}
                          >
                            {t('viewDetails')} <ChevronRight size={14} />
                          </button>

                          <a
                            className="btn-sm-primary"
                            href={scheme.applicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={13} /> {scheme.applicationLabel[language]}
                          </a>

                          {scheme.registrationUrl && (
                            <a
                              className="btn-sm-register"
                              href={scheme.registrationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <UserPlus size={13} /> {scheme.registrationLabel?.[language] ?? t('registerOnPortal')}
                            </a>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: QUICK 1-CLICK ELIGIBILITY CHECKER */}
            {viewTab === 'checker' && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <h1 className="screen-title" style={{ fontSize: 'clamp(28px, 4vw, 40px)', margin: '0 0 8px' }}>
                    {isHindi ? 'झटपट पात्रता तपासणी (1-Click Checker)' : 'Instant 1-Click Eligibility Checker'}
                  </h1>
                  <p className="screen-copy">
                    {isHindi
                      ? 'तुमचे अधिवास, जात प्रवर्ग आणि कौटुंबिक उत्पन्न निवडा; कोणत्या योजनांमध्ये तुम्ही पात्र आहात ते त्वरित पहा.'
                      : 'Set your profile below. All MahaDBT & Central schemes evaluate in real-time instantly.'}
                  </p>
                </div>

                {/* Profile Controls Box */}
                <div className="eligibility-quick-grid">
                  <div>
                    <label className="quick-control-label">{fieldLabels.mahadbtDomicile[language]}</label>
                    <select
                      className="quick-select"
                      value={quickProfile.mahadbtDomicile ?? 'yes'}
                      onChange={(e) => handleQuickChange('mahadbtDomicile', e.target.value)}
                    >
                      <option value="yes">{isHindi ? 'होय (महाराष्ट्र रहिवासी / Domicile)' : 'Yes (Maharashtra Resident / Domicile)'}</option>
                      <option value="no">{isHindi ? 'नाही (इतर राज्य / Other State)' : 'No (Other State Resident)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="quick-control-label">{fieldLabels.casteCategory[language]}</label>
                    <select
                      className="quick-select"
                      value={quickProfile.casteCategory ?? 'open'}
                      onChange={(e) => handleQuickChange('casteCategory', e.target.value)}
                    >
                      <option value="open">General / Open / EBC</option>
                      <option value="obc">OBC (Other Backward Class)</option>
                      <option value="sc">SC (Scheduled Caste)</option>
                      <option value="st">ST (Scheduled Tribe / आदिवासी)</option>
                      <option value="vjnt">VJNT / NT (विजाभज)</option>
                      <option value="sbc">SBC (विशेष मागास प्रवर्ग)</option>
                      <option value="minority">Religious Minority (अल्पसंख्याक)</option>
                    </select>
                  </div>

                  <div>
                    <label className="quick-control-label">{fieldLabels.annualIncome[language]}</label>
                    <select
                      className="quick-select"
                      value={quickProfile.annualIncome ?? '2.5-to-8'}
                      onChange={(e) => handleQuickChange('annualIncome', e.target.value)}
                    >
                      <option value="under-1.5">{isHindi ? '₹1.5 लाखांपर्यंत / वर्ष' : 'Up to ₹1.5 Lakh / yr'}</option>
                      <option value="1.5-to-2.5">{isHindi ? '₹1.5 लाख ते ₹2.5 लाख' : '₹1.5 Lakh to ₹2.5 Lakh'}</option>
                      <option value="2.5-to-8">{isHindi ? '₹2.5 लाख ते ₹8 लाख' : '₹2.5 Lakh to ₹8 Lakh'}</option>
                      <option value="above-8">{isHindi ? '₹8 लाखांपेक्षा जास्त' : 'Above ₹8 Lakh / yr'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="quick-control-label">{fieldLabels.occupationStatus[language]}</label>
                    <select
                      className="quick-select"
                      value={quickProfile.occupationStatus ?? 'student-technical'}
                      onChange={(e) => handleQuickChange('occupationStatus', e.target.value)}
                    >
                      <option value="student-technical">{isHindi ? 'अभियांत्रिकी / व्यावसायिक विद्यार्थी (CAP)' : 'Engineering / Tech Student (CAP)'}</option>
                      <option value="student-higher">{isHindi ? 'पदवी विद्यार्थी (BA, B.Com, B.Sc)' : 'Degree Student (BA, B.Com, B.Sc)'}</option>
                      <option value="student-medical">{isHindi ? 'वैद्यकीय विद्यार्थी (MBBS, BAMS, Nursing)' : 'Medical Student (MBBS, BAMS, Nursing)'}</option>
                      <option value="farmer">{isHindi ? 'शेतकरी (Farmer / Cultivator)' : 'Farmer / Cultivator'}</option>
                      <option value="woman">{isHindi ? 'महिला (Woman Applicant)' : 'Woman Applicant'}</option>
                      <option value="senior-citizen">{isHindi ? 'ज्येष्ठ नागरिक (६०+ वर्षे)' : 'Senior Citizen (60+ yrs)'}</option>
                      <option value="divyang">{isHindi ? 'दिव्यांग / निराधार' : 'Divyang / Destitute'}</option>
                      <option value="other">{isHindi ? 'इतर नागरिक' : 'Other Citizen'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="quick-control-label">{fieldLabels.farmerLandholder[language]}</label>
                    <select
                      className="quick-select"
                      value={quickProfile.farmerLandholder ?? 'no'}
                      onChange={(e) => handleQuickChange('farmerLandholder', e.target.value)}
                    >
                      <option value="no">{isHindi ? 'नाही / बिगर-शेतकरी' : 'No (Non-farmer / No Land)'}</option>
                      <option value="yes">{isHindi ? 'होय, शेतजमीन आहे (७/१२)' : 'Yes, owns cultivable land (7/12)'}</option>
                    </select>
                  </div>
                </div>

                {/* Filter Checkbox */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0 24px' }}>
                  <input
                    type="checkbox"
                    id="showEligibleOnly"
                    checked={showEligibleOnly}
                    onChange={(e) => setShowEligibleOnly(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: 'hsl(var(--primary))' }}
                  />
                  <label htmlFor="showEligibleOnly" style={{ fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    {isHindi ? 'फक्त पात्र असलेल्या योजना दाखवा (Show Eligible Only)' : 'Show Only Fully Eligible Schemes'}
                  </label>
                </div>

                {/* Results Categories */}
                <div className="result-groups">
                  {/* ALIGNED & ELIGIBLE */}
                  <section>
                    <h2 className="group-heading">
                      <span className="group-mark" />
                      <span>{t('aligned')}</span>
                      <span className="group-count">({checkerGroups.eligible.length})</span>
                    </h2>
                    {checkerGroups.eligible.length === 0 ? (
                      <div className="empty-state">{isHindi ? 'या निकषांवर थेट जुळणारी योजना नाही.' : 'No schemes strictly matching this profile.'}</div>
                    ) : (
                      checkerGroups.eligible.map(({ scheme }) => (
                        <article key={scheme.id} className="scheme-card-enhanced" style={{ borderLeft: '4px solid hsl(var(--primary))' }}>
                          <div className="card-header-row">
                            <div className="card-badges">
                              <span className={`portal-badge ${scheme.portal}`}>{scheme.portal.toUpperCase()}</span>
                              <span className="card-department">{scheme.department[language]}</span>
                            </div>
                            <span style={{ fontSize: 11, color: 'hsl(var(--primary))', fontWeight: 700 }}>
                              ✓ {isHindi ? 'पात्र' : 'Eligible'}
                            </span>
                          </div>

                          <h3
                            className="card-title-link"
                            style={{ cursor: 'pointer' }}
                            onClick={() => openSchemeDetail(scheme)}
                          >
                            {scheme.title[language]}
                          </h3>
                          <p style={{ fontSize: 14, color: 'hsl(var(--muted-foreground))', margin: 0 }}>
                            {scheme.summary[language]}
                          </p>

                          <div>
                            <span className="benefit-pill">
                              <CheckCircle2 size={14} /> {scheme.benefit[language]}
                            </span>
                          </div>

                          <div className="card-btn-row">
                            <button
                              type="button"
                              className="btn-sm-secondary"
                              onClick={() => openSchemeDetail(scheme)}
                            >
                              {t('viewDetails')} <ChevronRight size={14} />
                            </button>
                            <a
                              className="btn-sm-primary"
                              href={scheme.applicationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink size={13} /> {scheme.applicationLabel[language]}
                            </a>
                            {scheme.registrationUrl && (
                              <a
                                className="btn-sm-register"
                                href={scheme.registrationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <UserPlus size={13} /> {t('registerOnPortal')}
                              </a>
                            )}
                          </div>
                        </article>
                      ))
                    )}
                  </section>

                  {/* CHECK REQUIRED / SPECIFIC ROUTE */}
                  {!showEligibleOnly && (
                    <section>
                      <h2 className="group-heading">
                        <span className="group-mark unknown" />
                        <span>{t('check')}</span>
                        <span className="group-count">({checkerGroups.check.length})</span>
                      </h2>
                      {checkerGroups.check.map(({ scheme }) => (
                        <article key={scheme.id} className="scheme-card-enhanced" style={{ opacity: 0.9 }}>
                          <div className="card-header-row">
                            <div className="card-badges">
                              <span className={`portal-badge ${scheme.portal}`}>{scheme.portal.toUpperCase()}</span>
                              <span className="card-department">{scheme.department[language]}</span>
                            </div>
                            <span className="mini-tag">{scheme.category}</span>
                          </div>

                          <h3
                            className="card-title-link"
                            style={{ cursor: 'pointer' }}
                            onClick={() => openSchemeDetail(scheme)}
                          >
                            {scheme.title[language]}
                          </h3>
                          <p style={{ fontSize: 13, color: 'hsl(var(--muted-foreground))', margin: 0 }}>
                            {scheme.summary[language]}
                          </p>

                          <div className="card-btn-row">
                            <button
                              type="button"
                              className="btn-sm-secondary"
                              onClick={() => openSchemeDetail(scheme)}
                            >
                              {t('viewDetails')} <ChevronRight size={14} />
                            </button>
                            <a
                              className="btn-sm-primary"
                              href={scheme.applicationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink size={13} /> {scheme.applicationLabel[language]}
                            </a>
                          </div>
                        </article>
                      ))}
                    </section>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: STEP-BY-STEP GUIDED WIZARD ASSISTANT */}
            {viewTab === 'wizard' && (
              <div className="screen-card">
                {wizardScreen === 'category' && (
                  <div>
                    <div className="eyebrow">{isHindi ? 'पायरी १: सहाय्य क्षेत्र निवडा' : 'STEP 1: CHOOSE SUPPORT AREA'}</div>
                    <h1 className="screen-title">{isHindi ? 'तुम्हाला कोणत्या क्षेत्रात योजना हवी आहे?' : 'What kind of support are you looking for?'}</h1>
                    <p className="screen-copy">
                      {isHindi
                        ? 'विशिष्ट क्षेत्र निवडा किंवा संपूर्ण २८+ योजनांच्या सूचीमध्ये एकामागून एक प्रश्न विचारा.'
                        : 'Choose an area to see only relevant questions, or look across all schemes.'}
                    </p>

                    <div className="option-list category-list" style={{ marginTop: 24 }}>
                      {supportAreas.map((area, index) => (
                        <button
                          type="button"
                          key={area.value}
                          className="choice"
                          onClick={() => startWizard(area.value)}
                        >
                          <span>
                            <span className="choice-title">{area[language]}</span>
                            <span className="choice-desc">{isHindi ? `क्षेत्र ${index + 1}` : `Area ${index + 1}`}</span>
                          </span>
                          <span className="choice-icon"><ChevronRight size={17} /></span>
                        </button>
                      ))}
                      <button
                        type="button"
                        className="choice"
                        onClick={() => startWizard('all')}
                      >
                        <span>
                          <span className="choice-title">{t('allAreas')}</span>
                          <span className="choice-desc">{isHindi ? 'सर्व योजनांमध्ये शोधा' : 'Look across all scheme catalogs'}</span>
                        </span>
                        <span className="choice-icon"><Sparkles size={17} /></span>
                      </button>
                    </div>
                  </div>
                )}

                {wizardScreen === 'questions' && wizardFields[wizardIndex] && (
                  <div>
                    <div className="question-count">
                      {isHindi ? `प्रश्न ${wizardIndex + 1} / ${wizardFields.length}` : `QUESTION ${wizardIndex + 1} OF ${wizardFields.length}`}
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${((wizardIndex + 1) / Math.max(1, wizardFields.length)) * 100}%` }}
                      />
                    </div>

                    <h2 className="screen-title question-title" style={{ marginTop: 20 }}>
                      {fieldLabels[wizardFields[wizardIndex]][language]}
                    </h2>
                    <p className="screen-copy">
                      {questionHelp[wizardFields[wizardIndex]][language]}
                    </p>

                    <div className="option-list" style={{ marginTop: 24 }}>
                      {(options[wizardFields[wizardIndex]] ?? []).map((option) => (
                        <button
                          type="button"
                          key={option.value}
                          className={`choice ${wizardProfile[wizardFields[wizardIndex]] === option.value ? 'selected' : ''}`}
                          onClick={() => answerWizard(option.value)}
                        >
                          <span>
                            <span className="choice-title">{option.label[language]}</span>
                            {option.description && (
                              <span className="choice-desc">{option.description[language]}</span>
                            )}
                          </span>
                          <span className="choice-icon"><ChevronRight size={17} /></span>
                        </button>
                      ))}

                      <button
                        type="button"
                        className="choice"
                        onClick={() => answerWizard(null)}
                      >
                        <span className="choice-title">{isHindi ? 'माहिती नाही / सोडून द्या' : 'I do not know / skip this'}</span>
                        <span className="choice-icon"><CircleHelp size={17} /></span>
                      </button>
                    </div>

                    <div className="actions" style={{ marginTop: 28 }}>
                      <button
                        type="button"
                        className="btn secondary"
                        onClick={() => {
                          if (wizardIndex > 0) setWizardIndex(wizardIndex - 1);
                          else setWizardScreen('category');
                        }}
                      >
                        <ArrowLeft size={16} /> {t('back')}
                      </button>
                      <button
                        type="button"
                        className="btn text"
                        onClick={() => answerWizard(null)}
                      >
                        {isHindi ? 'हा प्रश्न वगळा' : 'Skip question'} <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {wizardScreen === 'results' && (
                  <div>
                    <div className="eyebrow">{isHindi ? 'तुमच्या उत्तरांवर आधारित' : 'BASED ON YOUR ANSWERS'}</div>
                    <h1 className="screen-title">{isHindi ? 'तपासणी निकाल' : 'Screening Results'}</h1>

                    <div className="result-groups" style={{ marginTop: 24 }}>
                      {wizardResults.map(({ scheme, result }) => (
                        <article key={scheme.id} className="scheme-card-enhanced">
                          <div className="card-header-row">
                            <span className={`portal-badge ${scheme.portal}`}>{scheme.portal.toUpperCase()}</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: result === true ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}>
                              {result === true ? `✓ ${t('aligned')}` : result === false ? `✕ ${t('notAligned')}` : `? ${t('check')}`}
                            </span>
                          </div>

                          <h3
                            className="card-title-link"
                            style={{ cursor: 'pointer' }}
                            onClick={() => openSchemeDetail(scheme)}
                          >
                            {scheme.title[language]}
                          </h3>
                          <p style={{ fontSize: 13, color: 'hsl(var(--muted-foreground))', margin: 0 }}>
                            {scheme.benefit[language]}
                          </p>

                          <div className="card-btn-row">
                            <button
                              type="button"
                              className="btn-sm-secondary"
                              onClick={() => openSchemeDetail(scheme)}
                            >
                              {t('viewDetails')}
                            </button>
                            <a
                              className="btn-sm-primary"
                              href={scheme.applicationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink size={13} /> {scheme.applicationLabel[language]}
                            </a>
                            {scheme.registrationUrl && (
                              <a
                                className="btn-sm-register"
                                href={scheme.registrationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <UserPlus size={13} /> {t('registerOnPortal')}
                              </a>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>

                    <div className="actions" style={{ marginTop: 28 }}>
                      <button
                        type="button"
                        className="btn secondary"
                        onClick={() => setWizardScreen('category')}
                      >
                        <RotateCcw size={15} /> {isHindi ? 'पुन्हा सुरू करा' : 'Start Again'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Official Disclaimer Footer */}
            <div className="notice caveat" style={{ marginTop: 36 }}>
              <AlertCircle size={20} />
              <div>
                <strong>{t('caveatTitle')}</strong>
                {t('caveat')}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
