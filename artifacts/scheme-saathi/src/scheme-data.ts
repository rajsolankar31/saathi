export type Localized = { en: string; hi: string };
export type Answer = string | null;
export type Field =
  | 'category'
  | 'mahadbtDomicile'
  | 'casteCategory'
  | 'annualIncome'
  | 'occupationStatus'
  | 'farmerLandholder'
  | 'ageBand'
  | 'gender'
  | 'residenceType'
  | 'farmLand'
  | 'farmInstitutionalLand'
  | 'farmExclusion'
  | 'farmNri'
  | 'adultWoman'
  | 'householdLpg'
  | 'poorHousehold'
  | 'maternityRelevant'
  | 'maternityAge'
  | 'maternityChild'
  | 'maternityQualifyingGroup'
  | 'maternityIncome'
  | 'pmayIncome'
  | 'ownsPuccaHouse'
  | 'housingBenefit20Years'
  | 'studentCourse'
  | 'studentMerit'
  | 'recognizedInstitution'
  | 'otherScholarship'
  | 'scholarshipIncome'
  | 'scholarshipStage'
  | 'renewalConditions'
  | 'bplHousehold'
  | 'widowed'
  | 'severeDisability';

export type Profile = Record<Field, Answer>;
export type Rule =
  | { all_of: Rule[] }
  | { any_of: Rule[] }
  | { not: Rule }
  | { field: Field; op: 'eq' | 'in'; value: string | string[] };

export type Scheme = {
  id: string;
  title: Localized;
  shortTitle: Localized;
  category: string;
  department: Localized;
  portal: 'mahadbt' | 'central' | 'state';
  targetGroup: Localized;
  casteCategories: string[];
  summary: Localized;
  benefit: Localized;
  rule: Rule;
  screeningOnly?: boolean;
  eligibility: Localized[];
  applicationDocuments: Localized[];
  importantNotes: Localized[];
  sourceTitle: string;
  sourceUrl: string;
  sourceQuote: string;
  applicationUrl: string;
  applicationLabel: Localized;
  registrationUrl: string;
  registrationLabel: Localized;
  guidelinesUrl?: string;
  checkedAt: string;
};

export type Choice = { value: string; label: Localized; description?: Localized };

export const verifiedDate = '2026-10-07';

export const supportAreas: { value: string; en: string; hi: string }[] = [
  { value: 'Education', en: 'Higher Education & Scholarships', hi: 'उच्च शिक्षण आणि शिष्यवृत्ती' },
  { value: 'Agriculture', en: 'Farming & Agriculture (Krishi)', hi: 'शेती आणि कृषी योजना' },
  { value: 'Maternity', en: 'Women & Child Welfare', hi: 'महिला व बालविकास कल्याण' },
  { value: 'Pensions', en: 'Pensions & Social Assistance', hi: 'पेन्शन आणि सामाजिक सहाय्य' },
  { value: 'Housing', en: 'Housing Schemes', hi: 'आवास आणि घरकुल योजना' },
  { value: 'Health', en: 'Healthcare & Insurance', hi: 'आरोग्यसेवा आणि विमा' },
  { value: 'Energy & cooking', en: 'Clean Energy & Fuel', hi: 'स्वच्छ ऊर्जा आणि इंधन' },
];

export const initialProfile: Profile = {
  category: null,
  mahadbtDomicile: null,
  casteCategory: null,
  annualIncome: null,
  occupationStatus: null,
  farmerLandholder: null,
  ageBand: null,
  gender: null,
  residenceType: null,
  farmLand: null,
  farmInstitutionalLand: null,
  farmExclusion: null,
  farmNri: null,
  adultWoman: null,
  householdLpg: null,
  poorHousehold: null,
  maternityRelevant: null,
  maternityAge: null,
  maternityChild: null,
  maternityQualifyingGroup: null,
  maternityIncome: null,
  pmayIncome: null,
  ownsPuccaHouse: null,
  housingBenefit20Years: null,
  studentCourse: null,
  studentMerit: null,
  recognizedInstitution: null,
  otherScholarship: null,
  scholarshipIncome: null,
  scholarshipStage: null,
  renewalConditions: null,
  bplHousehold: null,
  widowed: null,
  severeDisability: null,
};

const yesNoUnknown: Choice[] = [
  { value: 'yes', label: { en: 'Yes', hi: 'हाँ (होय)' } },
  { value: 'no', label: { en: 'No', hi: 'नहीं (नाही)' } },
];

export const options: Partial<Record<Field, Choice[]>> = {
  mahadbtDomicile: [
    { value: 'yes', label: { en: 'Yes, Maharashtra Domicile / Resident', hi: 'हाँ, महाराष्ट्र अधिवास / रहिवासी' }, description: { en: 'Having Maharashtra Domicile Certificate or 15+ years residency', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र किंवा १५+ वर्षांचे वास्तव्य' } },
    { value: 'no', label: { en: 'No, other state resident', hi: 'नहीं, अन्य राज्य के निवासी' } },
  ],
  casteCategory: [
    { value: 'open', label: { en: 'General / Open / EBC', hi: 'सामान्य / खुला / ईबीसी (Open/EBC)' }, description: { en: 'Economically Backward Class or General category', hi: 'आर्थिकदृष्ट्या दुर्बल किंवा सामान्य प्रवर्ग' } },
    { value: 'obc', label: { en: 'OBC (Other Backward Class)', hi: 'ओबीसी (इतर मागास वर्ग)' }, description: { en: 'Valid caste & non-creamy layer certificate', hi: 'जात प्रमाणपत्र व नॉन-क्रीमीलेअर आवश्यक' } },
    { value: 'sc', label: { en: 'SC (Scheduled Caste)', hi: 'एससी (अनुसूचित जाती)' }, description: { en: 'Scheduled Caste / Neo-Buddhist', hi: 'अनुसूचित जाती किंवा नवबौद्ध' } },
    { value: 'st', label: { en: 'ST (Scheduled Tribe)', hi: 'एसटी (अनुसूचित जमाती / आदिवासी)' }, description: { en: 'Scheduled Tribe certificate & validity', hi: 'अनुसूचित जमाती प्रमाणपत्र व वैधता' } },
    { value: 'vjnt', label: { en: 'VJNT / NT (Vimukta Jati & Nomadic Tribes)', hi: 'विमुक्त जाती व भटक्या जमाती (VJNT/NT)' }, description: { en: 'VJ, NT-A, NT-B, NT-C (Dhangar), NT-D (Vanjari)', hi: 'विजा, भज-अ, भज-ब, भज-क, भज-ड' } },
    { value: 'sbc', label: { en: 'SBC (Special Backward Category)', hi: 'एसबीसी (विशेष मागास प्रवर्ग)' } },
    { value: 'minority', label: { en: 'Religious Minority', hi: 'धार्मिक अल्पसंख्याक' }, description: { en: 'Muslim, Buddhist, Christian, Jain, Sikh, Parsi, Jewish', hi: 'मुस्लिम, बौद्ध, ख्रिश्चन, जैन, शीख, पारशी' } },
  ],
  annualIncome: [
    { value: 'under-1.5', label: { en: 'Up to ₹1.5 Lakh / year', hi: '₹1.5 लाख/वर्ष पर्यंत' } },
    { value: '1.5-to-2.5', label: { en: 'Above ₹1.5 Lakh up to ₹2.5 Lakh / year', hi: '₹1.5 लाख ते ₹2.5 लाख/वर्ष' } },
    { value: '2.5-to-8', label: { en: 'Above ₹2.5 Lakh up to ₹8 Lakh / year', hi: '₹2.5 लाख ते ₹8 लाख/वर्ष' } },
    { value: 'above-8', label: { en: 'Above ₹8 Lakh / year', hi: '₹8 लाख/वर्ष पेक्षा जास्त' } },
  ],
  occupationStatus: [
    { value: 'student-higher', label: { en: 'College Student (Arts, Science, Commerce, PG)', hi: 'महाविद्यालयीन पदवी / पदव्युत्तर विद्यार्थी (BA, BSc, BCom, MA)' } },
    { value: 'student-technical', label: { en: 'Technical / Engineering / Professional Student', hi: 'तांत्रिक / व्यावसायिक विद्यार्थी (Engineering, Pharmacy, MBA)' } },
    { value: 'student-medical', label: { en: 'Medical Education Student (MBBS, BDS, BAMS, Nursing)', hi: 'वैद्यकीय शिक्षण विद्यार्थी (MBBS, BAMS, BDS, नर्सिंग)' } },
    { value: 'farmer', label: { en: 'Farmer / Cultivator (holding agricultural land)', hi: 'शेतकरी (स्वतःच्या नावावर शेतजमीन असलेले)' } },
    { value: 'woman', label: { en: 'Woman Applicant (homemaker, working, self-employed)', hi: 'महिला अर्जदार (गृहणी, कामगार, स्वयंरोजगार)' } },
    { value: 'senior-citizen', label: { en: 'Senior Citizen (age 60 or older)', hi: 'ज्येष्ठ नागरिक (वय ६० वर्षे किंवा जास्त)' } },
    { value: 'divyang', label: { en: 'Divyang (Person with Disability) or Destitute', hi: 'दिव्यांग व्यक्ती किंवा निराधार' } },
    { value: 'other', label: { en: 'Other Citizen / Self-Employed', hi: 'इतर नागरिक' } },
  ],
  farmerLandholder: [
    { value: 'yes', label: { en: 'Yes, owns cultivable land (7/12 & 8A extract available)', hi: 'हाँ, शेतजमीन आहे (७/१२ आणि ८-अ उतारा उपलब्ध)' } },
    { value: 'no', label: { en: 'No, do not own agricultural land', hi: 'नाही, शेतजमीन नाही' } },
  ],
  gender: [
    { value: 'female', label: { en: 'Female / Woman', hi: 'स्त्री / महिला' } },
    { value: 'male', label: { en: 'Male / Man', hi: 'पुरुष' } },
    { value: 'other', label: { en: 'Transgender / Other', hi: 'तृतीयपंथी / इतर' } },
  ],
  ageBand: [
    { value: 'under-18', label: { en: 'Under 18', hi: '18 वर्ष से कम' } },
    { value: '18-39', label: { en: '18–39', hi: '18–39 वर्ष' } },
    { value: '40-59', label: { en: '40–59', hi: '40–59 वर्ष' } },
    { value: '60-69', label: { en: '60–69', hi: '60–69 वर्ष' } },
    { value: '70-79', label: { en: '70–79', hi: '70–79 वर्ष' } },
    { value: '80-plus', label: { en: '80 or older', hi: '80 वर्ष या अधिक' } },
  ],
  residenceType: [
    { value: 'urban', label: { en: 'Urban area / town / city', hi: 'शहरी क्षेत्र / कस्बा / शहर' } },
    { value: 'rural', label: { en: 'Rural area / village', hi: 'ग्रामीण क्षेत्र / गाँव' } },
  ],
  farmLand: yesNoUnknown,
  farmInstitutionalLand: yesNoUnknown,
  farmExclusion: yesNoUnknown,
  farmNri: yesNoUnknown,
  adultWoman: yesNoUnknown,
  householdLpg: yesNoUnknown,
  poorHousehold: yesNoUnknown,
  maternityRelevant: [
    { value: 'pregnant', label: { en: 'Pregnant now', hi: 'अभी गर्भवती हूँ' } },
    { value: 'recent-birth', label: { en: 'Child born within the last 270 days', hi: 'पिछले 270 दिनों में बच्चे का जन्म हुआ' } },
    { value: 'outside-window', label: { en: 'Neither of these', hi: 'इनमें से कोई नहीं' } },
  ],
  maternityAge: [
    { value: 'eligible', label: { en: 'At least 18 years 7 months and under 55 at childbirth', hi: 'बच्चे के जन्म के समय उम्र 18 वर्ष 7 महीने या अधिक और 55 वर्ष से कम' } },
    { value: 'outside', label: { en: 'Outside that age range', hi: 'उस उम्र की सीमा से बाहर' } },
  ],
  maternityChild: [
    { value: 'first', label: { en: 'First living child', hi: 'पहला जीवित बच्चा' } },
    { value: 'second-girl', label: { en: 'Second living child, and a girl', hi: 'दूसरा जीवित बच्चा और लड़की' } },
    { value: 'other', label: { en: 'Another birth order or a second boy', hi: 'अन्य क्रम का बच्चा या दूसरा बच्चा लड़का' } },
  ],
  maternityQualifyingGroup: yesNoUnknown,
  maternityIncome: [
    { value: 'under-8', label: { en: 'Net family income under ₹8 lakh/year', hi: 'परिवार की शुद्ध आय ₹8 लाख/वर्ष से कम' } },
    { value: '8-plus', label: { en: '₹8 lakh/year or more, or not using the income criterion', hi: '₹8 लाख/वर्ष या अधिक' } },
  ],
  pmayIncome: [
    { value: 'up-to-3', label: { en: 'Up to ₹3 lakh/year (EWS)', hi: '₹3 लाख/वर्ष तक (EWS)' } },
    { value: '3-to-6', label: { en: 'Above ₹3 lakh and up to ₹6 lakh/year (LIG)', hi: '₹3 लाख से ₹6 लाख/वर्ष (LIG)' } },
    { value: '6-to-9', label: { en: 'Above ₹6 lakh and up to ₹9 lakh/year (MIG)', hi: '₹6 लाख से ₹9 लाख/वर्ष (MIG)' } },
    { value: 'over-9', label: { en: 'Above ₹9 lakh/year', hi: '₹9 लाख/वर्ष से अधिक' } },
  ],
  ownsPuccaHouse: yesNoUnknown,
  housingBenefit20Years: yesNoUnknown,
  studentCourse: [
    { value: 'regular-degree', label: { en: 'Regular degree course', hi: 'नियमित डिग्री पाठ्यक्रम' } },
    { value: 'other', label: { en: 'Diploma, distance/correspondence, or not a degree course', hi: 'डिप्लोमा, दूरस्थ/पत्राचार' } },
  ],
  studentMerit: yesNoUnknown,
  recognizedInstitution: yesNoUnknown,
  otherScholarship: yesNoUnknown,
  scholarshipIncome: [
    { value: 'up-to-4.5', label: { en: 'Up to ₹4.5 lakh/year', hi: '₹4.5 लाख/वर्ष तक' } },
    { value: 'over-4.5', label: { en: 'Above ₹4.5 lakh/year', hi: '₹4.5 लाख/वर्ष से अधिक' } },
  ],
  scholarshipStage: [
    { value: 'fresh', label: { en: 'Applying for the first time', hi: 'पहली बार आवेदन' } },
    { value: 'renewal', label: { en: 'Renewing an existing scholarship', hi: 'मौजूदा छात्रवृत्ति का नवीनीकरण' } },
  ],
  renewalConditions: yesNoUnknown,
  bplHousehold: yesNoUnknown,
  widowed: yesNoUnknown,
  severeDisability: yesNoUnknown,
};

export const fieldLabels: Record<Field, Localized> = {
  category: { en: 'Support area', hi: 'सहायता का क्षेत्र' },
  mahadbtDomicile: { en: 'Maharashtra Domicile / Residence', hi: 'महाराष्ट्र अधिवास / रहिवासी पात्रता' },
  casteCategory: { en: 'Social Category / Caste Group', hi: 'सामाजिक प्रवर्ग / जात प्रवर्ग' },
  annualIncome: { en: 'Annual Family Income (Tahsil certificate)', hi: 'वार्षिक कौटुंबिक उत्पन्न (तहसीलदार दाखला)' },
  occupationStatus: { en: 'Current Status / Occupation', hi: 'सध्याची स्थिती / व्यवसाय' },
  farmerLandholder: { en: 'Owns Cultivable Agricultural Land', hi: 'स्वतःच्या नावावर शेतजमीन (७/१२)' },
  gender: { en: 'Gender', hi: 'लिंग' },
  ageBand: { en: 'Your age range', hi: 'आपकी उम्र का दायरा' },
  residenceType: { en: 'Urban or rural residence', hi: 'शहरी या ग्रामीण निवास' },
  farmLand: { en: 'Cultivable land in the farmer family', hi: 'किसान परिवार के नाम खेती योग्य भूमि' },
  farmInstitutionalLand: { en: 'Institutional landholding', hi: 'संस्था के नाम भूमि' },
  farmExclusion: { en: 'PM-KISAN family exclusions', hi: 'पीएम-किसान परिवार की अपवर्जन श्रेणियाँ' },
  farmNri: { en: 'NRI status for a new PM-KISAN enrolment', hi: 'पीएम-किसान के नए पंजीकरण के लिए NRI स्थिति' },
  adultWoman: { en: 'Adult woman applicant', hi: 'वयस्क महिला आवेदक' },
  householdLpg: { en: 'Existing household LPG connection', hi: 'घर में पहले से LPG कनेक्शन' },
  poorHousehold: { en: 'PMUY poor-household declaration', hi: 'पीएमयूवाई गरीब परिवार की घोषणा' },
  maternityRelevant: { en: 'Pregnancy or recent childbirth', hi: 'गर्भावस्था या हाल में बच्चे का जन्म' },
  maternityAge: { en: 'Age at childbirth', hi: 'बच्चे के जन्म के समय उम्र' },
  maternityChild: { en: 'Birth order and child’s sex', hi: 'बच्चे का क्रम और लिंग' },
  maternityQualifyingGroup: { en: 'PMMVY qualifying group', hi: 'पीएमएमवीवाई की पात्र श्रेणी' },
  maternityIncome: { en: 'PMMVY net family income', hi: 'पीएमएमवीवाई के लिए परिवार की शुद्ध आय' },
  pmayIncome: { en: 'Annual household income for PMAY-U 2.0', hi: 'पीएमएवाई-यू 2.0 के लिए घर की सालाना आय' },
  ownsPuccaHouse: { en: 'Pucca house owned anywhere in India', hi: 'भारत में कहीं भी पक्का घर' },
  housingBenefit20Years: { en: 'Housing-scheme benefit in the last 20 years', hi: 'पिछले 20 वर्षों में आवास योजना का लाभ' },
  studentCourse: { en: 'Current course type', hi: 'मौजूदा पाठ्यक्रम का प्रकार' },
  studentMerit: { en: 'Class XII board percentile', hi: 'कक्षा 12 बोर्ड का प्रतिशतक' },
  recognizedInstitution: { en: 'Institution recognition', hi: 'संस्थान की मान्यता' },
  otherScholarship: { en: 'Other scholarship or fee support', hi: 'अन्य छात्रवृत्ति या फीस सहायता' },
  scholarshipIncome: { en: 'Gross parental/family income', hi: 'माता-पिता/परिवार की सकल आय' },
  scholarshipStage: { en: 'Fresh application or renewal', hi: 'नया आवेदन या नवीनीकरण' },
  renewalConditions: { en: 'Annual renewal conditions', hi: 'नवीनीकरण की वार्षिक शर्तें' },
  bplHousehold: { en: 'Government BPL status', hi: 'सरकारी BPL स्थिति' },
  widowed: { en: 'Widow status', hi: 'विधवा स्थिति' },
  severeDisability: { en: 'Severe or multiple disability', hi: 'गंभीर या बहु-दिव्यांगता' },
};

export const questionHelp: Record<Field, Localized> = {
  category: { en: 'Choose an area to see only relevant questions, or review every area.', hi: 'सिर्फ संबंधित सवालों के लिए क्षेत्र चुनें, या सभी क्षेत्र देखें।' },
  mahadbtDomicile: { en: 'MahaDBT schemes require candidate to be a domicile resident of Maharashtra.', hi: 'महाडीबीटी योजनांसाठी उमेदवार महाराष्ट्राचा रहिवासी असणे आवश्यक आहे.' },
  casteCategory: { en: 'Scholarship and social welfare benefits differ by caste category. Select your official group.', hi: 'शिष्यवृत्ती आणि कल्याणकारी योजना जात प्रवर्गानुसार लागू होतात.' },
  annualIncome: { en: 'Select your gross family annual income as certified by Tahsildar or competent revenue authority.', hi: 'तहसीलदार किंवा सक्षम प्राधिकरणाने दिलेले वार्षिक कौटुंबिक उत्पन्न निवडा.' },
  occupationStatus: { en: 'Select your primary role to match student, farmer, or social welfare schemes directly.', hi: 'तुमची प्राथमिक भूमिका निवडा जेणेकरून योग्य योजना शोधणे सोपे होईल.' },
  farmerLandholder: { en: 'MahaDBT farmer schemes (tractor, drip, farm pond) require 7/12 land records.', hi: 'महाडीबीटी शेतकरी योजनांसाठी ७/१२ उतारा आवश्यक आहे.' },
  gender: { en: 'Certain schemes (Ladki Bahin, Ujjwala) are specifically designed for women.', hi: 'काही योजना (लाडकी बहीण, उज्ज्वला) विशेषतः महिलांसाठी आहेत.' },
  ageBand: { en: 'A broad range is enough; SchemeSaathi does not need your exact date of birth.', hi: 'उम्र का सामान्य दायरा काफी है; SchemeSaathi को आपकी जन्मतिथि नहीं चाहिए।' },
  residenceType: { en: 'PMAY-U 2.0 is for eligible households in urban areas. You do not need to share an address.', hi: 'पीएमएवाई-यू 2.0 शहरी क्षेत्रों के पात्र परिवारों के लिए है।' },
  farmLand: { en: 'PM-KISAN checks cultivable land recorded in a farmer-family member’s name.', hi: 'पीएम-किसान में किसान परिवार के सदस्य के नाम दर्ज खेती योग्य भूमि देखी जाती है।' },
  farmInstitutionalLand: { en: 'Institutional landholders are excluded from PM-KISAN.', hi: 'संस्थागत भूमि-धारक पीएम-किसान से बाहर हैं।' },
  farmExclusion: { en: 'Exclusions apply if any family member is a high constitutional officer, income-tax payer, or professional.', hi: 'सरकारी पद, करदाता किंवा व्यावसायिक असल्यास अपवर्जन लागू होते.' },
  farmNri: { en: 'The PM-KISAN operational guidelines list NRI farmer families among exclusions.', hi: 'एनआरआय शेतकरी कुटुंबांना पीएम-किसानमधून वगळण्यात आले आहे.' },
  adultWoman: { en: 'PMUY is for an adult woman applicant.', hi: 'पीएमयूवाई वयस्क महिला के लिए है।' },
  householdLpg: { en: 'The household must not already have an LPG connection registered.', hi: 'कुटुंबात आधीपासून गॅस जोडणी नसावी.' },
  poorHousehold: { en: 'PMUY uses the applicant’s prescribed deprivation declaration.', hi: 'पीएमयूवाई गरीब कुटुंब घोषणापत्रावर आधारित आहे.' },
  maternityRelevant: { en: 'Registration is allowed during pregnancy or up to 270 days after childbirth.', hi: 'गर्भावस्था किंवा जन्मानंतर २७० दिवसांपर्यंत नोंदणी करता येते.' },
  maternityAge: { en: 'The official age range is 18 years 7 months to under 55 at the time of childbirth.', hi: 'बाळंतपणाच्या वेळी वय १८ वर्षे ७ महिने ते ५५ वर्षांपेक्षा कमी असावे.' },
  maternityChild: { en: 'PMMVY 2.0 covers the first living child and the second living child only if a girl.', hi: 'पहिल्या अपत्यासाठी आणि दुसरे अपत्य मुलगी असल्यास लागू.' },
  maternityQualifyingGroup: { en: 'At least one of the listed social/economic eligibility groups must apply.', hi: 'किमान एक सामाजिक/आर्थिक पात्रता निकष पूर्ण असावा.' },
  maternityIncome: { en: 'One qualifying route is net family income below ₹8 lakh/year.', hi: 'कौटुंबिक उत्पन्न ₹८ लाखांपेक्षा कमी असणे हा एक निकष आहे.' },
  pmayIncome: { en: 'PMAY-U 2.0 uses EWS (up to ₹3 lakh), LIG (up to ₹6 lakh) and MIG (up to ₹9 lakh) bands.', hi: 'EWS (३ लाखांपर्यंत), LIG (६ लाखांपर्यंत), MIG (९ लाखांपर्यंत).' },
  ownsPuccaHouse: { en: 'No family member owns a pucca house anywhere in India.', hi: 'भारतात कुठेही पक्के घर नसावे.' },
  housingBenefit20Years: { en: 'The 20-year look-back applies to allotments under Central, State or Local housing schemes.', hi: 'गेल्या २० वर्षांत सरकारी घरकुल योजनेचा लाभ मिळालेला नसावा.' },
  studentCourse: { en: 'The CSSS guideline excludes diploma, correspondence and distance-mode courses.', hi: 'डिप्लोमा किंवा दूरस्थ अभ्यासक्रम वगळण्यात आले आहेत.' },
  studentMerit: { en: 'The student must be above the 80th percentile of successful Class XII candidates.', hi: 'इयत्ता १२ वी मध्ये ८० व्या पर्सेंटाइलपेक्षा जास्त गुण हवेत.' },
  recognizedInstitution: { en: 'The course/institution must meet AICTE or regulatory body recognition rules.', hi: 'संस्था किंवा अभ्यासक्रम शासनमान्य असणे आवश्यक.' },
  otherScholarship: { en: 'The guideline excludes students receiving another scholarship or fee waiver.', hi: 'इतर कोणतीही सरकारी शिष्यवृत्ती सुरू नसावी.' },
  scholarshipIncome: { en: 'The fresh-applicant limit is gross parental/family income up to ₹4.5 lakh/year.', hi: 'पालकांचे वार्षिक उत्पन्न ₹४.५ लाखांपर्यंत असावे.' },
  scholarshipStage: { en: 'Renewal also has annual marks, attendance and conduct conditions.', hi: 'नूतनीकरणासाठी परीक्षा गुण आणि उपस्थिती आवश्यक.' },
  renewalConditions: { en: 'Renewal requires at least 50% marks in the annual exam, at least 75% attendance.', hi: 'किमान ५०% गुण आणि ७५% उपस्थिती आवश्यक.' },
  bplHousehold: { en: 'NSAP pension eligibility is tied to household identified as Below Poverty Line.', hi: 'कुटुंब दारिद्र्यरेषेखालील (BPL) असणे आवश्यक.' },
  widowed: { en: 'The central widow pension route is for widows aged 40 or above from BPL households.', hi: 'BPL कुटुंबातील ४० वर्षे किंवा अधिक वयाच्या विधवा महिलांसाठी.' },
  severeDisability: { en: 'The disability pension route is for people with severe/multiple disabilities from BPL households.', hi: 'BPL कुटुंबातील दिव्यांग व्यक्तींसाठी.' },
};

const inField = (field: Field, value: string | string[]): Rule => ({ field, op: Array.isArray(value) ? 'in' : 'eq', value });
const all = (...all_of: Rule[]): Rule => ({ all_of });
const any = (...any_of: Rule[]): Rule => ({ any_of });
const not = (rule: Rule): Rule => ({ not: rule });

const MAHADBT_REGISTER = 'https://mahadbt.maharashtra.gov.in/Registration/Registration/Register';
const MAHADBT_LOGIN = 'https://mahadbt.maharashtra.gov.in/Login/Login';
const MAHADBT_FARMER_REG = 'https://mahadbt.maharashtra.gov.in/Farmer/Registration/Register';
const MAHADBT_FARMER_LOGIN = 'https://mahadbt.maharashtra.gov.in/Farmer/Login/Login';

export const schemes: Scheme[] = [
  // 1. DHE - Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)
  {
    id: 'mahadbt-dhe-ebc',
    title: {
      en: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC - Higher Education)',
      hi: 'राजर्षी छत्रपती शाहू महाराज शिक्षण शुल्क शिष्यवृत्ती योजना (ईबीसी - उच्च शिक्षण)',
    },
    shortTitle: { en: 'RCSMSY EBC (DHE)', hi: 'ईबीसी शिष्यवृत्ती (DHE)' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'Directorate of Higher Education (DHE), Govt of Maharashtra',
      hi: 'उच्च शिक्षण संचालनालय (DHE), महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Economically Backward Class (EBC) / Open Students', hi: 'आर्थिकदृष्ट्या दुर्बल घटक (EBC) / खुला प्रवर्ग' },
    casteCategories: ['OPEN', 'EBC'],
    summary: {
      en: 'Reimbursement of 50% tuition fees and examination fees for students from Economically Backward Classes admitted to degree/post-graduate courses.',
      hi: 'उच्च शिक्षण पदवी व पदव्युत्तर अभ्यासक्रमांसाठी आर्थिकदृष्ट्या दुर्बल घटकातील विद्यार्थ्यांना ५०% शिक्षण शुल्क व परीक्षा शुल्क प्रतिपूर्ती.',
    },
    benefit: {
      en: '50% Tuition Fee and 50% Examination Fee waiver/reimbursement for government-approved non-professional & higher education courses (BA, B.Com, B.Sc, MA, M.Sc, etc.).',
      hi: 'शासकीय व अनुदानित/विनाअनुदानित महाविद्यालयातील पदवी व पदव्युत्तर अभ्यासक्रमांचे ५०% शिक्षण शुल्क आणि ५०% परीक्षा शुल्क शासनाकडून थेट कॉलेज/विद्यार्थ्याला दिले जाते.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('casteCategory', 'open'),
      inField('annualIncome', ['under-1.5', '1.5-to-2.5', '2.5-to-8']),
    ),
    eligibility: [
      { en: 'Candidate must be a Domicile of Maharashtra.', hi: 'उमेदवार महाराष्ट्राचा रहिवासी (Domicile) असावा.' },
      { en: 'Family annual income must not exceed ₹8,00,000 from all sources (supported by Tahsildar Income Certificate).', hi: 'कुटुंबाचे सर्व मार्गांनी मिळणारे वार्षिक उत्पन्न ₹८ लाखांपेक्षा जास्त नसावे (तहसीलदारांचा अधिकृत दाखला).' },
      { en: 'Candidate must be admitted through Centralized Admission Process (CAP) or regular merit in approved government/aided/unaided colleges.', hi: 'मान्यताप्राप्त शासकीय/अनुदानित/विनाअनुदानित महाविद्यालयात नियमित प्रवेश घेतलेला असावा.' },
      { en: 'Maximum of 2 children from the same family are eligible for this benefit.', hi: 'एकाच कुटुंबातील जास्तीत जास्त २ अपत्यांना या योजनेचा लाभ मिळतो.' },
      { en: 'Minimum 50% attendance is compulsory in the ongoing academic year.', hi: 'सध्याच्या शैक्षणिक वर्षात किमान ५०% उपस्थिती आवश्यक आहे.' },
    ],
    applicationDocuments: [
      { en: 'Domicile Certificate of Maharashtra State', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र (Domicile Certificate)' },
      { en: 'Income Certificate issued by Tahsildar / Sub-Divisional Officer for current financial year', hi: 'सक्षम प्राधिकरणाचा (तहसीलदार) चालू आर्थिक वर्षाचा उत्पन्नाचा दाखला' },
      { en: 'Previous Year Marksheet (HSC / Graduation)', hi: 'मागील वर्षाची गुणपत्रिका (१० वी, १२ वी किंवा पदवी)' },
      { en: 'CAP Allotment Letter / College Admission Fee Receipt', hi: 'कॅप (CAP) वाटप पत्र / कॉलेज फी पावती' },
      { en: 'Ration Card / Self-Declaration regarding family limit (not more than 2 beneficiaries)', hi: 'रेशन कार्ड / दोन अपत्यांचे स्वयंघोषणापत्र' },
      { en: 'Aadhaar Card linked with active NPCI bank account', hi: 'बँक खात्याशी संलग्न (NPCI Seeding) आधार कार्ड' },
    ],
    importantNotes: [
      { en: 'Management Quota / Institute level admissions without CAP are strictly not eligible.', hi: 'मॅनेजमेंट कोट्यातून (विना कॅप) प्रवेश घेतलेले विद्यार्थी या योजनेसाठी पात्र नसतात.' },
      { en: 'Students already availing any other government scholarship cannot claim this benefit.', hi: 'इतर कोणत्याही सरकारी शिष्यवृत्तीचा लाभ घेणाऱ्या विद्यार्थ्यांना ही योजना लागू नाही.' },
    ],
    sourceTitle: 'MahaDBT Aaple Sarkar Portal - Directorate of Higher Education Guidelines',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1C2508784DB0492B',
    sourceQuote: '“50% Tuition Fees and Examination Fees for students with parental income up to Rs. 8 Lakh admitted through CAP.”',
    registrationUrl: MAHADBT_REGISTER,
    registrationLabel: { en: 'Register on MahaDBT Portal', hi: 'महाडीबीटी पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: MAHADBT_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT', hi: 'महाडीबीटी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://mahadbt.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 2. DTE - Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (Technical Education)
  {
    id: 'mahadbt-dte-ebc',
    title: {
      en: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC - Technical & Engineering)',
      hi: 'राजर्षी छत्रपती शाहू महाराज शिक्षण शुल्क शिष्यवृत्ती योजना (ईबीसी - तंत्रशिक्षण व अभियांत्रिकी)',
    },
    shortTitle: { en: 'RCSMSY EBC (DTE)', hi: 'ईबीसी तंत्रशिक्षण (DTE)' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'Directorate of Technical Education (DTE), Govt of Maharashtra',
      hi: 'तंत्रशिक्षण संचालनालय (DTE), महाराष्ट्र शासन',
    },
    targetGroup: { en: 'EBC / Open category students in Engineering, Pharmacy, MBA, MCA, Polytechnic', hi: 'अभियांत्रिकी, फार्मसी, एमबीए, पॉलिटेक्निकमधील ईबीसी विद्यार्थी' },
    casteCategories: ['OPEN', 'EBC'],
    summary: {
      en: '50% Tuition Fee & Exam Fee waiver for professional technical degrees including Engineering (B.E/B.Tech), Pharmacy (B.Pharm), Architecture, MBA, MCA and Polytechnic.',
      hi: 'अभियांत्रिकी, औषधनिर्माणशास्त्र, तंत्रनिकेतन, एमबीए, एमसीए यांसारख्या व्यावसायिक पदवी अभ्यासक्रमांसाठी ५०% शिक्षण शुल्क माफी.',
    },
    benefit: {
      en: '50% Tuition Fees and 50% Exam Fees directly credited to institute/college fee ledger under Direct Benefit Transfer.',
      hi: 'शासनमान्य शिक्षण शुल्क समितीने ठरवून दिलेल्या एकूण शिक्षण शुल्कापैकी ५०% शुल्क आणि ५०% परीक्षा शुल्क थेट शासनाकडून भरले जाते.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('casteCategory', 'open'),
      inField('annualIncome', ['under-1.5', '1.5-to-2.5', '2.5-to-8']),
    ),
    eligibility: [
      { en: 'Maharashtra State Candidate with Domicile Certificate.', hi: 'उमेदवार महाराष्ट्राचा अधिवासधारक (Domicile) असणे अनिवार्य.' },
      { en: 'Annual family income must be up to ₹8,00,000 from all sources.', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹८ लाखांच्या मर्यादेत असावे.' },
      { en: 'Admission must be secured through Centralized Admission Process (CAP) round conducted by State CET Cell.', hi: 'राज्य सीईटी सेलच्या अधिकृत कॅप (CAP) फेऱ्यांद्वारे प्रवेश घेतलेला असावा.' },
      { en: 'Applicable to Diploma, Degree, and Postgraduate technical programs approved by AICTE/DTE.', hi: 'एआयसीटीई आणि तंत्रशिक्षण संचालनालय मान्यताप्राप्त पदविका, पदवी व पदव्युत्तर अभ्यासक्रम.' },
      { en: 'Only applicable up to second child of the family.', hi: 'कुटुंबातील पहिल्या दोन अपत्यांनाच ही सवलत लागू आहे.' },
    ],
    applicationDocuments: [
      { en: 'Maharashtra State Domicile Certificate', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र' },
      { en: 'Income Certificate from Tahsildar (valid for current financial year)', hi: 'तहसीलदारांचा उत्पन्नाचा अधिकृत दाखला (चालू आर्थिक वर्ष)' },
      { en: 'CAP Allotment Letter / Confirmation Slip from Scrutiny Center', hi: 'कॅप वाटप पत्र (CAP Allotment Letter)' },
      { en: 'Marksheets of 10th, 12th, or Diploma / Degree entrance examination', hi: '१० वी, १२ वी व प्रवेश परीक्षेची गुणपत्रिका' },
      { en: 'College Admission Fee Receipt & Bonafide Certificate', hi: 'महाविद्यालयीन प्रवेश फी पावती व बोनाफाईड प्रमाणपत्र' },
      { en: 'Aadhaar-seeded bank account passbook', hi: 'आधार संलग्न बँक खात्याचे पासबुक' },
    ],
    importantNotes: [
      { en: 'Institutional quota / Management quota / Spot admissions without CAP are strictly ineligible.', hi: 'इन्स्टिट्यूट कोटा किंवा मॅनेजमेंट कोट्यातील प्रवेशांना ही सवलत मिळत नाही.' },
      { en: 'Students must maintain regular attendance and clear exams as per university progression criteria.', hi: 'विद्यापीठाच्या नियमानुसार नियमित उपस्थिती व अभ्यासक्रम पूर्ण करणे आवश्यक.' },
    ],
    sourceTitle: 'Government Resolution No. TEM-2018/CR 242/TE-4, Higher & Technical Education Dept',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1C2508784DB0492B',
    sourceQuote: '“EBC students admitted through CAP in DTE courses with income up to Rs. 8 Lakh receive 50% tuition and exam fee support.”',
    registrationUrl: MAHADBT_REGISTER,
    registrationLabel: { en: 'Register on MahaDBT Portal', hi: 'महाडीबीटी पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: MAHADBT_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT', hi: 'महाडीबीटी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://dte.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 3. DHE/DTE - Dr. Panjabrao Deshmukh Vasatgruh Nirvah Bhatta Yojna
  {
    id: 'mahadbt-panjabrao-hostel',
    title: {
      en: 'Dr. Panjabrao Deshmukh Vasatgruh Nirvah Bhatta Yojna (Hostel Maintenance Allowance)',
      hi: 'डॉ. पंजाबराव देशमुख वसतिगृह निर्वाह भत्ता योजना (वसतिगृह भत्ता)',
    },
    shortTitle: { en: 'Dr. Panjabrao Deshmukh Hostel Allowance', hi: 'डॉ. पंजाबराव देशमुख वसतिगृह भत्ता' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'Higher & Technical Education Department, Govt of Maharashtra',
      hi: 'उच्च व तंत्रशिक्षण विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Children of registered farmers / small landholders pursuing professional education', hi: 'अल्पभूधारक शेतकरी / नोंदणीकृत मजुरांची व्यावसायिक शिक्षण घेणारी मुले' },
    casteCategories: ['OPEN', 'EBC', 'OBC', 'SEBC'],
    summary: {
      en: 'Hostel maintenance allowance up to ₹30,000 per year for students from agricultural and labour households pursuing professional higher education.',
      hi: 'व्यावसायिक व उच्च शिक्षण घेणाऱ्या शेतकरी व मजुरांच्या पाल्यांना वसतिगृहातील राहण्या-खाण्याच्या खर्चासाठी वार्षिक ₹३०,००० पर्यंत निर्वाह भत्ता.',
    },
    benefit: {
      en: 'Allowance of ₹30,000/year (₹3,000/month for 10 months) in MMRDA/Pune/Nagpur/divisional cities, or ₹20,000/year (₹2,000/month for 10 months) in other district areas.',
      hi: 'मुंबई, पुणे, नागपूर यांसारख्या मोठ्या शहरांत ₹३०,००० प्रति वर्ष (₹३,०००/महिना १० महिन्यांसाठी) आणि इतर जिल्हास्तरावर ₹२०,००० प्रति वर्ष निर्वाह भत्ता थेट बँक खात्यात.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('annualIncome', ['under-1.5', '1.5-to-2.5', '2.5-to-8']),
    ),
    eligibility: [
      { en: 'Student must be a domicile of Maharashtra admitted through CAP round.', hi: 'विद्यार्थी महाराष्ट्राचा रहिवासी असून कॅप (CAP) द्वारे प्रवेशित असावा.' },
      { en: 'Children of registered farmers owning agricultural land (Alpabhudharak / small-marginal farmers) or registered construction labourers.', hi: 'अल्पभूधारक शेतकरी (७/१२ उतारा असलेले) किंवा नोंदणीकृत बांधकाम मजुरांचे पाल्य.' },
      { en: 'Family annual income must not exceed ₹8,00,000 per annum.', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹८ लाखांच्या आत असावे.' },
      { en: 'Student must be staying in a recognized government/private hostel or rented accommodation outside their native taluka.', hi: 'विद्यार्थी मूळ तालुक्याबाहेर वसतिगृहात किंवा भाड्याने खोली घेऊन राहत असावा.' },
      { en: 'Available for approved degree and diploma courses in engineering, technical, and general streams.', hi: 'मान्यताप्राप्त पदवी व पदविका अभ्यासक्रमांसाठी लागू.' },
    ],
    applicationDocuments: [
      { en: 'Maharashtra Domicile Certificate', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र' },
      { en: 'Tahsildar Income Certificate', hi: 'तहसीलदारांचा उत्पन्नाचा दाखला' },
      { en: '7/12 Extract (Satbara) & 8A Extract showing agricultural land / Alpabhudharak Certificate', hi: '७/१२ व ८-अ उतारा किंवा अल्पभूधारक शेतकरी प्रमाणपत्र' },
      { en: 'Hostel certificate or registered rental agreement with rent receipts', hi: 'वसतिगृह प्रमाणपत्र किंवा भाडेकरारनामा व भाडे पावती' },
      { en: 'CAP Allotment Letter and College Bonafide Certificate', hi: 'कॅप वाटप पत्र आणि कॉलेज बोनाफाईड' },
      { en: 'Aadhaar-linked bank passbook', hi: 'आधार संलग्न बँक पासबुक' },
    ],
    importantNotes: [
      { en: 'Hostel admission certificate or rent agreement must clearly state monthly lodging expenses.', hi: 'वसतिगृह प्रमाणपत्र किंवा भाडे करारात राहण्याचा पत्ता व खर्च स्पष्ट असावा.' },
      { en: 'Students availing free government hostel boarding cannot claim this cash allowance.', hi: 'शासकीय वसतिगृहात मोफत जागा मिळालेल्या विद्यार्थ्यांना हा भत्ता लागू नाही.' },
    ],
    sourceTitle: 'Government Resolution No. EBC-2016/CR 221/TE-4, Higher & Technical Education Dept',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1C2508784DB0492B',
    sourceQuote: '“Hostel maintenance allowance of up to Rs. 30,000 per annum for children of small/marginal farmers pursuing higher education.”',
    registrationUrl: MAHADBT_REGISTER,
    registrationLabel: { en: 'Register on MahaDBT Portal', hi: 'महाडीबीटी पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: MAHADBT_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT', hi: 'महाडीबीटी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://mahadbt.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 4. SJSA - Government of India Post-Matric Scholarship for SC Students
  {
    id: 'mahadbt-sjsa-post-matric-sc',
    title: {
      en: 'Government of India Post-Matric Scholarship for Scheduled Caste (SC) Students',
      hi: 'भारत सरकार मॅट्रिकोत्तर शिष्यवृत्ती योजना (अनुसूचित जाती - SC)',
    },
    shortTitle: { en: 'GOI SC Post-Matric Scholarship', hi: 'भारत सरकार SC मॅट्रिकोत्तर शिष्यवृत्ती' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'Social Justice and Special Assistance Department (SJSA), Govt of Maharashtra',
      hi: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Scheduled Caste (SC) & Neo-Buddhist students pursuing Post-Matric studies', hi: 'अनुसूचित जाती व नवबौद्ध मॅट्रिकोत्तर विद्यार्थी' },
    casteCategories: ['SC'],
    summary: {
      en: 'Comprehensive 100% tuition and examination fee waiver plus monthly maintenance allowance for Scheduled Caste students pursuing Std 11th through PhD.',
      hi: 'अनुसूचित जाती व नवबौद्ध विद्यार्थ्यांना ११ वी पासून पदवी, पदव्युत्तर व पीएचडीपर्यंत १००% शिक्षण व परीक्षा शुल्क माफी अधिक दरमहा निर्वाह भत्ता.',
    },
    benefit: {
      en: '100% Tuition Fee & Exam Fee Waiver (paid to institute) + Monthly maintenance allowance up to ₹13,500/year for hostellers and ₹7,000/year for day scholars + book allowance.',
      hi: '१००% शिक्षण व परीक्षा शुल्क पूर्णपणे माफ + वसतिगृहात राहणाऱ्यांसाठी वार्षिक ₹१३,५०० पर्यंत व घरी राहणाऱ्यांसाठी ₹७,००० पर्यंत निर्वाह भत्ता थेट बँक खात्यात.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('casteCategory', 'sc'),
      inField('annualIncome', ['under-1.5', '1.5-to-2.5']),
    ),
    eligibility: [
      { en: 'Student must belong to Scheduled Caste (SC) or Neo-Buddhist community and be a domicile of Maharashtra.', hi: 'विद्यार्थी अनुसूचित जाती (SC) किंवा नवबौद्ध समाजाचा व महाराष्ट्राचा रहिवासी असावा.' },
      { en: 'Family annual income must not exceed ₹2,50,000 from all sources.', hi: 'कुटुंबाचे सर्व मार्गांनी वार्षिक उत्पन्न ₹२,५०,००० किंवा त्यापेक्षा कमी असावे.' },
      { en: 'Student must have passed Std 10th (SSC) or higher examination and be enrolled in a recognized post-matric course.', hi: '१० वी उत्तीर्ण होऊन मान्यताप्राप्त मॅट्रिकोत्तर अभ्यासक्रमात नियमित प्रवेश घेतलेला असावा.' },
      { en: 'Valid Caste Certificate and Caste Validity Certificate (for professional degrees) are mandatory.', hi: 'सक्षम अधिकाऱ्याचे जात प्रमाणपत्र आणि व्यावसायिक अभ्यासक्रमांसाठी जात वैधता प्रमाणपत्र आवश्यक.' },
    ],
    applicationDocuments: [
      { en: 'Caste Certificate issued by competent authority in Maharashtra', hi: 'सक्षम प्राधिकरणाचे जात प्रमाणपत्र (Caste Certificate)' },
      { en: 'Caste Validity Certificate (for professional/degree programs)', hi: 'जात वैधता प्रमाणपत्र (Caste Validity Certificate)' },
      { en: 'Tahsildar Income Certificate (income <= ₹2,50,000)', hi: 'तहसीलदारांचा उत्पन्नाचा दाखला (उत्पन्न ₹२.५ लाखांपर्यंत)' },
      { en: 'Maharashtra State Domicile Certificate', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र' },
      { en: 'SSC (10th) & previous year marksheets', hi: '१० वी व मागील वर्षाची गुणपत्रिका' },
      { en: 'Hostel Certificate (if claiming hosteller allowance rate)', hi: 'वसतिगृह प्रमाणपत्र (वसतिगृह भत्त्यासाठी)' },
      { en: 'Aadhaar-seeded active bank account', hi: 'आधार संलग्न बँक खाते' },
    ],
    importantNotes: [
      { en: 'If annual income is above ₹2,50,000, students should apply under Post-Matric Tuition Fee Freeship Scheme.', hi: 'उत्पन्न ₹२,५०,००० पेक्षा जास्त असल्यास विद्यार्थ्यांनी "ट्युशन फी व परीक्षा फी (Freeship)" योजनेअंतर्गत अर्ज करावा.' },
      { en: 'Failure in the course may impact scholarship continuation according to scheme progression rules.', hi: 'नापास झाल्यास नियमांनुसार पुढील वर्षाचा भत्ता प्रभावित होऊ शकतो.' },
    ],
    sourceTitle: 'Social Justice & Special Assistance Dept, Govt of Maharashtra Guidelines',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1C2508784DB0492B',
    sourceQuote: '“100% compulsory fees and maintenance allowances for SC students with family income up to Rs. 2.50 lakh.”',
    registrationUrl: MAHADBT_REGISTER,
    registrationLabel: { en: 'Register on MahaDBT Portal', hi: 'महाडीबीटी पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: MAHADBT_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT', hi: 'महाडीबीटी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://sjsa.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 5. SJSA - Post-Matric Tuition Fee and Examination Fee (Freeship) for SC Students
  {
    id: 'mahadbt-sjsa-freeship-sc',
    title: {
      en: 'Post-Matric Tuition Fee and Examination Fee (Freeship) for Scheduled Caste (SC) Students',
      hi: 'अनुसूचित जातीच्या विद्यार्थ्यांसाठी शिक्षण शुल्क व परीक्षा शुल्क प्रतिपूर्ती (फ्रीशिप)',
    },
    shortTitle: { en: 'SC Post-Matric Freeship', hi: 'SC मॅट्रिकोत्तर फ्रीशिप' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'Social Justice and Special Assistance Department (SJSA), Govt of Maharashtra',
      hi: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Scheduled Caste students whose family income exceeds ₹2.5 Lakh (No Income Cap)', hi: 'वार्षिक उत्पन्न ₹२.५ लाखांपेक्षा जास्त असणारे अनुसूचित जातीचे विद्यार्थी' },
    casteCategories: ['SC'],
    summary: {
      en: 'Full 100% Tuition Fee and Examination Fee reimbursement for Scheduled Caste students whose family annual income exceeds ₹2.5 Lakh, with no upper income cap.',
      hi: 'ज्या अनुसूचित जातीच्या विद्यार्थ्यांच्या कुटुंबाचे वार्षिक उत्पन्न ₹२.५ लाखांपेक्षा जास्त आहे, त्यांना १००% शिक्षण शुल्क व परीक्षा शुल्क प्रतिपूर्ती (उत्पन्नाची कमाल मर्यादा नाही).',
    },
    benefit: {
      en: '100% Tuition Fees and Examination Fees approved by fee regulatory authority are paid by the government.',
      hi: 'महाविद्यालयाचे १००% शिक्षण शुल्क आणि परीक्षा शुल्क शासनाकडून भरले जाते. (या योजनेत निर्वाह भत्ता मिळत नाही).',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('casteCategory', 'sc'),
      inField('annualIncome', ['2.5-to-8', 'above-8']),
    ),
    eligibility: [
      { en: 'Candidate must belong to SC or Neo-Buddhist category and be a domicile of Maharashtra.', hi: 'उमेदवार महाराष्ट्राचा रहिवासी आणि अनुसूचित जाती/नवबौद्ध प्रवर्गातील असावा.' },
      { en: 'Family annual income is ABOVE ₹2,50,000 (No upper income limit is prescribed).', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹२,५०,००० पेक्षा जास्त असावे (कमाल उत्पन्नाची कोणतीही मर्यादा नाही).' },
      { en: 'Admitted in a recognized post-matric course (diploma, degree, post-graduate, professional).', hi: 'मान्यताप्राप्त मॅट्रिकोत्तर अभ्यासक्रमात नियमित प्रवेशित असावा.' },
      { en: 'Caste Certificate and Caste Validity Certificate are compulsory.', hi: 'जात प्रमाणपत्र आणि जात वैधता प्रमाणपत्र अनिवार्य.' },
    ],
    applicationDocuments: [
      { en: 'Caste Certificate and Caste Validity Certificate', hi: 'जात प्रमाणपत्र आणि जात वैधता प्रमाणपत्र' },
      { en: 'Income Certificate / Form 16 / Income Declaration', hi: 'तहसीलदार दाखला / फॉर्म १६ / उत्पन्न घोषणापत्र' },
      { en: 'Maharashtra State Domicile Certificate', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र' },
      { en: 'College Fee Receipt & Allotment Letter', hi: 'कॉलेज फी पावती व अलॉटमेंट लेटर' },
      { en: 'Previous marksheets and Aadhaar card', hi: 'मागील वर्षाच्या गुणपत्रिका व आधार कार्ड' },
    ],
    importantNotes: [
      { en: 'Freeship covers tuition and examination fees; maintenance allowance is not provided under this scheme.', hi: 'या योजनेत फक्त शिक्षण व परीक्षा शुल्क माफ होते, मासिक निर्वाह भत्ता मिळत नाही.' },
    ],
    sourceTitle: 'Social Justice Department Govt Resolution No. EBC-2015/CR 148/BCW-2',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1C2508784DB0492B',
    sourceQuote: '“Full tuition and exam fee reimbursement for SC students with income above Rs. 2.50 lakh.”',
    registrationUrl: MAHADBT_REGISTER,
    registrationLabel: { en: 'Register on MahaDBT Portal', hi: 'महाडीबीटी पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: MAHADBT_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT', hi: 'महाडीबीटी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://sjsa.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 6. TDD - Post Matric Scholarship Scheme for ST Students
  {
    id: 'mahadbt-tdd-post-matric-st',
    title: {
      en: 'Government of India Post Matric Scholarship for Scheduled Tribe (ST) Students',
      hi: 'भारत सरकार मॅट्रिकोत्तर शिष्यवृत्ती योजना (अनुसूचित जमाती - आदिवासी / ST)',
    },
    shortTitle: { en: 'GOI ST Post-Matric Scholarship', hi: 'भारत सरकार ST मॅट्रिकोत्तर शिष्यवृत्ती' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'Tribal Development Department (TDD), Govt of Maharashtra',
      hi: 'आदिवासी विकास विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Scheduled Tribe (ST) students in Post-Matric courses', hi: 'अनुसूचित जमाती (आदिवासी) मॅट्रिकोत्तर विद्यार्थी' },
    casteCategories: ['ST'],
    summary: {
      en: 'Complete financial assistance including 100% tuition fee waiver, exam fee waiver, and monthly maintenance allowance for Scheduled Tribe students.',
      hi: 'अनुसूचित जमातीच्या विद्यार्थ्यांना १००% शिक्षण शुल्क, परीक्षा शुल्क माफी आणि दरमहा निर्वाह भत्ता देणारी केंद्र पुरस्कृत योजना.',
    },
    benefit: {
      en: '100% Tuition and Examination fees paid to college + Monthly maintenance allowance up to ₹13,500/year (hostellers) or ₹7,000/year (day scholars) + study materials and project allowance.',
      hi: '१००% कॉलेज फी व परीक्षा फी माफ + वसतिगृहातील विद्यार्थ्यांसाठी वार्षिक ₹१३,५०० पर्यंत आणि डे-स्कॉलर्ससाठी ₹७,००० पर्यंत निर्वाह भत्ता.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('casteCategory', 'st'),
      inField('annualIncome', ['under-1.5', '1.5-to-2.5']),
    ),
    eligibility: [
      { en: 'Student must belong to Scheduled Tribe (ST) community and be a domicile of Maharashtra.', hi: 'विद्यार्थी अनुसूचित जमातीचा (ST) आणि महाराष्ट्राचा रहिवासी असावा.' },
      { en: 'Family annual income must be up to ₹2,50,000 per annum.', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹२,५०,००० किंवा त्यापेक्षा कमी असावे.' },
      { en: 'Admitted in an approved post-matric diploma, degree, postgraduate or professional course.', hi: 'मान्यताप्राप्त मॅट्रिकोत्तर अभ्यासक्रमात नियमित शिक्षण घेत असावा.' },
      { en: 'ST Tribe Certificate and Tribe Validity Certificate (Tribe Scrutiny Committee) are required.', hi: 'सक्षम प्राधिकरणाचे जात प्रमाणपत्र आणि जात पडताळणी समितीचे जात वैधता प्रमाणपत्र आवश्यक.' },
    ],
    applicationDocuments: [
      { en: 'Tribe Certificate issued by competent Sub-Divisional Officer', hi: 'अनुसूचित जमाती प्रमाणपत्र' },
      { en: 'Tribe Validity Certificate issued by Scrutiny Committee', hi: 'जात पडताळणी समितीचे वैधता प्रमाणपत्र (Tribe Validity)' },
      { en: 'Tahsildar Income Certificate (income <= ₹2.5 Lakh)', hi: 'तहसीलदारांचा उत्पन्नाचा दाखला (२.५ लाखांपर्यंत)' },
      { en: 'Maharashtra Domicile Certificate', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र' },
      { en: 'Marksheet of previous qualifying exam & College Admission Fee Receipt', hi: 'मागील परीक्षेची गुणपत्रिका व कॉलेज प्रवेश पावती' },
      { en: 'Aadhaar-linked bank account passbook', hi: 'आधार संलग्न बँक पासबुक' },
    ],
    importantNotes: [
      { en: 'For family income above ₹2.5 Lakh, students should apply under Tuition Fee & Exam Fee Freeship Scheme.', hi: 'उत्पन्न ₹२.५ लाखांपेक्षा जास्त असल्यास "ट्युशन फी व परीक्षा फी फ्रीशिप" योजनेअंतर्गत अर्ज करावा.' },
    ],
    sourceTitle: 'Tribal Development Department Guidelines & GR, Govt of Maharashtra',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1C2508784DB0492B',
    sourceQuote: '“100% compulsory fee waiver and maintenance allowance for tribal students with income up to Rs. 2.50 lakh.”',
    registrationUrl: MAHADBT_REGISTER,
    registrationLabel: { en: 'Register on MahaDBT Portal', hi: 'महाडीबीटी पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: MAHADBT_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT', hi: 'महाडीबीटी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://tribal.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 7. TDD - Pandit Deendayal Upadhyay Swayam Yojana
  {
    id: 'mahadbt-tdd-swayam',
    title: {
      en: 'Pandit Deendayal Upadhyay Swayam Yojana (DBT for Tribal Students)',
      hi: 'पंडित दीनदयाळ उपाध्याय स्वयं योजना (आदिवासी विद्यार्थ्यांसाठी थेट रोख सहाय्य)',
    },
    shortTitle: { en: 'Swayam Yojana (TDD)', hi: 'स्वयं योजना (आदिवासी विकास)' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'Tribal Development Department (TDD), Govt of Maharashtra',
      hi: 'आदिवासी विकास विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Scheduled Tribe (ST) students in higher education not admitted to govt hostels', hi: 'शासकीय वसतिगृहात प्रवेश न मिळालेले आदिवासी पदवी विद्यार्थी' },
    casteCategories: ['ST'],
    summary: {
      en: 'Direct Benefit Transfer (DBT) of ₹43,000 to ₹60,000 per year into bank accounts of tribal students pursuing higher education who could not secure a government hostel seat.',
      hi: 'शासकीय वसतिगृहात प्रवेश न मिळालेल्या आदिवासी विद्यार्थ्यांना जेवण, निवास आणि शैक्षणिक साहित्यासाठी वार्षिक ₹४३,००० ते ₹६०,००० थेट बँक खात्यात.',
    },
    benefit: {
      en: 'Financial assistance of ₹60,000/year for Mumbai/Pune/Nagpur; ₹51,000/year for other divisional headquarters; ₹43,000/year for district level cities, deposited in 2 installments.',
      hi: 'मुंबई, पुणे, नागपूर येथे शिकणाऱ्यांना वार्षिक ₹६०,०००; इतर विभागीय शहरांत ₹५१,०००; आणि जिल्हास्तरावर ₹४३,००० थेट बँक खात्यात दोन हप्त्यांत जमा केले जातात.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('casteCategory', 'st'),
      inField('annualIncome', ['under-1.5', '1.5-to-2.5']),
    ),
    eligibility: [
      { en: 'Student must belong to Scheduled Tribe (ST) and be a resident of Maharashtra.', hi: 'विद्यार्थी अनुसूचित जमातीचा आणि महाराष्ट्राचा रहिवासी असावा.' },
      { en: 'Family annual income must not exceed ₹2,50,000.', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹२,५०,००० च्या आत असावे.' },
      { en: 'Student must be pursuing higher education post 12th in an approved degree/diploma course of minimum 2 years.', hi: '१२ वी नंतर किमान २ वर्षांच्या मान्यताप्राप्त उच्च शिक्षण पदवी/पदविका अभ्यासक्रमात प्रवेश.' },
      { en: 'Student must not have been allotted accommodation in any government tribal hostel.', hi: 'विद्यार्थ्याला कोणत्याही शासकीय वसतिगृहात प्रवेश मिळालेला नसावा.' },
      { en: 'Minimum 60% marks in 12th standard (relaxed for reserved categories as per GR).', hi: '१२ वी मध्ये किमान ६०% गुण असावेत (आरक्षणानुसार सवलत).' },
    ],
    applicationDocuments: [
      { en: 'ST Caste Certificate and Tribe Validity Certificate', hi: 'अनुसूचित जमाती प्रमाणपत्र व जात वैधता प्रमाणपत्र' },
      { en: 'Tahsildar Income Certificate', hi: 'तहसीलदारांचा उत्पन्नाचा दाखला' },
      { en: 'Proof of residence/room rental agreement in the study city', hi: 'शहरातील खोली भाडेकरारनामा किंवा रहिवासी पुरावा' },
      { en: 'Non-allotment of hostel certificate / declaration', hi: 'वसतिगृहात प्रवेश न मिळाल्याचे प्रमाणपत्र / घोषणापत्र' },
      { en: 'College Admission Fee Receipt & Bonafide Certificate', hi: 'कॉलेज प्रवेश पावती व बोनाफाईड' },
      { en: 'Aadhaar-linked bank account statement', hi: 'आधार संलग्न बँक खाते विवरण' },
    ],
    importantNotes: [
      { en: 'Benefit is disbursed in two installments linked to college attendance and semester progression.', hi: 'सत्रनिहाय उपस्थिती व प्रगती तपासून दोन हप्त्यांत रक्कम दिली जाते.' },
    ],
    sourceTitle: 'Tribal Development Department GR No. VKY-2016/CR 13/Karya-11',
    sourceUrl: 'https://swayam.mahaonline.gov.in/',
    sourceQuote: '“Direct financial assistance of up to Rs. 60,000 for lodging, boarding and academic expenses of ST students.”',
    registrationUrl: 'https://swayam.mahaonline.gov.in/',
    registrationLabel: { en: 'Apply on Swayam Portal', hi: 'स्वयं पोर्टलवर थेट अर्ज करा' },
    applicationUrl: 'https://swayam.mahaonline.gov.in/',
    applicationLabel: { en: 'Swayam Portal Login', hi: 'स्वयं पोर्टल लॉगिन' },
    guidelinesUrl: 'https://tribal.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 8. OBC/VJNT/SBC - Post Matric Scholarship to OBC Students
  {
    id: 'mahadbt-obc-post-matric',
    title: {
      en: 'Post Matric Scholarship for Other Backward Class (OBC) Students',
      hi: 'इतर मागास वर्ग (OBC) विद्यार्थ्यांसाठी मॅट्रिकोत्तर शिष्यवृत्ती योजना',
    },
    shortTitle: { en: 'OBC Post-Matric Scholarship', hi: 'OBC मॅट्रिकोत्तर शिष्यवृत्ती' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'VJNT, OBC and SBC Welfare Department, Govt of Maharashtra',
      hi: 'इमाव, बहुजन कल्याण विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'OBC students with family annual income up to ₹1.5 Lakh', hi: 'वार्षिक उत्पन्न ₹१.५ लाखांपर्यंत असणारे ओबीसी विद्यार्थी' },
    casteCategories: ['OBC'],
    summary: {
      en: '100% Tuition Fee & Examination Fee reimbursement for non-professional courses and 50% for professional courses plus monthly maintenance allowance for OBC students.',
      hi: 'ओबीसी विद्यार्थ्यांना अ-व्यावसायिक अभ्यासक्रमांसाठी १००% व व्यावसायिक अभ्यासक्रमांसाठी ५०% शिक्षण शुल्क प्रतिपूर्ती अधिक मासिक निर्वाह भत्ता.',
    },
    benefit: {
      en: 'Full Tuition Fee and Exam Fee reimbursement (non-professional) or 50% (professional courses) + maintenance allowance up to ₹4,250/year.',
      hi: 'अ-व्यावसायिक अभ्यासक्रमांसाठी १००% आणि व्यावसायिक अभ्यासक्रमांसाठी ५०% शिक्षण व परीक्षा शुल्क माफी अधिक दरमहा निर्वाह भत्ता.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('casteCategory', 'obc'),
      inField('annualIncome', ['under-1.5']),
    ),
    eligibility: [
      { en: 'Candidate must belong to Other Backward Class (OBC) and be a domicile of Maharashtra.', hi: 'उमेदवार इतर मागास प्रवर्गातील (OBC) आणि महाराष्ट्राचा रहिवासी असावा.' },
      { en: 'Family annual income must not exceed ₹1,50,000 from all sources.', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹१,५०,००० च्या आत असावे.' },
      { en: 'Valid Non-Creamy Layer (NCL) certificate and Caste Certificate are required.', hi: 'वैध नॉन-क्रीमीलेअर प्रमाणपत्र आणि जात प्रमाणपत्र आवश्यक.' },
      { en: 'Admission in recognized post-matric course.', hi: 'मान्यताप्राप्त मॅट्रिकोत्तर अभ्यासक्रमात नियमित प्रवेश.' },
    ],
    applicationDocuments: [
      { en: 'OBC Caste Certificate', hi: 'ओबीसी जात प्रमाणपत्र' },
      { en: 'Non-Creamy Layer (NCL) Certificate valid for current financial year', hi: 'चालू वर्षाचे नॉन-क्रीमीलेअर प्रमाणपत्र (NCL)' },
      { en: 'Tahsildar Income Certificate (<= ₹1.5 Lakh)', hi: 'तहसीलदारांचा उत्पन्नाचा दाखला (१.५ लाखांपर्यंत)' },
      { en: 'Maharashtra State Domicile Certificate', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र' },
      { en: 'Previous Exam Marksheets & College Fee Receipt', hi: 'मागील वर्षाच्या गुणपत्रिका व कॉलेज फी पावती' },
      { en: 'Aadhaar-linked active bank account', hi: 'आधार संलग्न बँक खाते' },
    ],
    importantNotes: [
      { en: 'If annual income is between ₹1.5 Lakh and ₹8.0 Lakh, apply under OBC Tuition Fee & Exam Fee Freeship Scheme.', hi: 'उत्पन्न ₹१.५ लाख ते ₹८ लाखांच्या दरम्यान असल्यास "ओबीसी ट्युशन फी व परीक्षा फी (Freeship)" योजनेअंतर्गत अर्ज करावा.' },
    ],
    sourceTitle: 'VJNT, OBC & SBC Welfare Dept Guidelines, Govt of Maharashtra',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1C2508784DB0492B',
    sourceQuote: '“Tuition, exam fee reimbursement and maintenance allowance for OBC students with income up to Rs. 1.50 lakh.”',
    registrationUrl: MAHADBT_REGISTER,
    registrationLabel: { en: 'Register on MahaDBT Portal', hi: 'महाडीबीटी पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: MAHADBT_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT', hi: 'महाडीबीटी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://mahadbt.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 9. OBC/VJNT/SBC - Tuition Fees and Examination Fees to OBC Students (Freeship)
  {
    id: 'mahadbt-obc-freeship',
    title: {
      en: 'Tuition Fees and Examination Fees to OBC Students (Freeship)',
      hi: 'ओबीसी विद्यार्थ्यांसाठी शिक्षण शुल्क व परीक्षा शुल्क प्रतिपूर्ती (फ्रीशिप)',
    },
    shortTitle: { en: 'OBC Freeship Scheme', hi: 'OBC फ्रीशिप योजना' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'VJNT, OBC and SBC Welfare Department, Govt of Maharashtra',
      hi: 'इमाव, बहुजन कल्याण विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'OBC students with family annual income between ₹1.5 Lakh and ₹8.0 Lakh', hi: 'वार्षिक उत्पन्न ₹१.५ लाख ते ₹८ लाख असणारे ओबीसी विद्यार्थी' },
    casteCategories: ['OBC'],
    summary: {
      en: 'Reimbursement of tuition and exam fees for OBC students whose family income is between ₹1.5 Lakh and ₹8.0 Lakh.',
      hi: 'ज्या ओबीसी विद्यार्थ्यांचे कौटुंबिक उत्पन्न ₹१.५ लाख ते ₹८ लाखांच्या दरम्यान आहे, त्यांना शिक्षण शुल्क व परीक्षा शुल्क सवलत.',
    },
    benefit: {
      en: '100% Tuition & Exam fee for non-professional courses, or 50% for professional technical/medical courses under CAP.',
      hi: 'अ-व्यावसायिक अभ्यासक्रमांसाठी १००% आणि व्यावसायिक अभ्यासक्रमांसाठी ५०% शिक्षण व परीक्षा शुल्क शासनाकडून थेट महाविद्यालयाला दिले जाते.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('casteCategory', 'obc'),
      inField('annualIncome', ['1.5-to-2.5', '2.5-to-8']),
    ),
    eligibility: [
      { en: 'OBC candidate residing in Maharashtra.', hi: 'उमेदवार महाराष्ट्राचा रहिवासी व ओबीसी प्रवर्गातील असावा.' },
      { en: 'Family annual income must be between ₹1,50,000 and ₹8,00,000.', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹१,५०,००० ते ₹८,००,००० दरम्यान असावे.' },
      { en: 'Must possess a valid Non-Creamy Layer Certificate.', hi: 'वैध नॉन-क्रीमीलेअर प्रमाणपत्र असणे आवश्यक.' },
      { en: 'Admission via CAP for professional courses.', hi: 'व्यावसायिक अभ्यासक्रमांसाठी कॅप (CAP) प्रवेश अनिवार्य.' },
    ],
    applicationDocuments: [
      { en: 'OBC Caste Certificate and Non-Creamy Layer Certificate', hi: 'ओबीसी जात प्रमाणपत्र व नॉन-क्रीमीलेअर दाखला' },
      { en: 'Tahsildar Income Certificate', hi: 'तहसीलदारांचा उत्पन्नाचा दाखला' },
      { en: 'Domicile Certificate of Maharashtra', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र' },
      { en: 'CAP Allotment Letter and College Fee Receipt', hi: 'कॅप वाटप पत्र व कॉलेज फी पावती' },
      { en: 'Aadhaar Card and Bank Passbook', hi: 'आधार कार्ड व बँक पासबुक' },
    ],
    importantNotes: [
      { en: 'Students availing Freeship are not eligible for maintenance allowances.', hi: 'फ्रीशिप घेणाऱ्या विद्यार्थ्यांना मासिक निर्वाह भत्ता मिळत नाही.' },
    ],
    sourceTitle: 'Government Resolution No. EBC-2016/CR 221/BCW-2',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1C2508784DB0492B',
    sourceQuote: '“Fee reimbursement for OBC students with income between Rs. 1.50 lakh and Rs. 8.00 lakh holding Non-Creamy Layer.”',
    registrationUrl: MAHADBT_REGISTER,
    registrationLabel: { en: 'Register on MahaDBT Portal', hi: 'महाडीबीटी पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: MAHADBT_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT', hi: 'महाडीबीटी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://mahadbt.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 10. OBC/VJNT/SBC - Post Matric Scholarship to VJNT Students
  {
    id: 'mahadbt-vjnt-post-matric',
    title: {
      en: 'Post Matric Scholarship for VJNT (Vimukta Jati & Nomadic Tribes) Students',
      hi: 'विमुक्त जाती व भटक्या जमाती (VJNT/NT) विद्यार्थ्यांसाठी मॅट्रिकोत्तर शिष्यवृत्ती',
    },
    shortTitle: { en: 'VJNT Post-Matric Scholarship', hi: 'VJNT मॅट्रिकोत्तर शिष्यवृत्ती' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'VJNT, OBC and SBC Welfare Department, Govt of Maharashtra',
      hi: 'इमाव, बहुजन कल्याण विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'VJ/DT, NT-A, NT-B, NT-C (Dhangar), NT-D (Vanjari) students with income up to ₹1.5 Lakh', hi: 'विजा, भज-अ, भज-ब, भज-क (धनगर), भज-ड (वंजारी) विद्यार्थी' },
    casteCategories: ['VJNT'],
    summary: {
      en: '100% Tuition Fee & Examination Fee reimbursement plus monthly maintenance allowance for students belonging to Vimukta Jati and Nomadic Tribes.',
      hi: 'विमुक्त जाती व भटक्या जमातीतील विद्यार्थ्यांना १००% शिक्षण व परीक्षा शुल्क प्रतिपूर्ती अधिक मासिक निर्वाह भत्ता.',
    },
    benefit: {
      en: '100% Tuition and Exam fees paid to college + maintenance allowance up to ₹4,250/year (hostellers) or ₹1,900/year (day scholars).',
      hi: '१००% कॉलेज शिक्षण व परीक्षा शुल्क माफ + दरमहा निर्वाह भत्ता थेट बँक खात्यात.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('casteCategory', 'vjnt'),
      inField('annualIncome', ['under-1.5']),
    ),
    eligibility: [
      { en: 'Student must belong to VJ/NT-A, NT-B, NT-C, or NT-D category and reside in Maharashtra.', hi: 'विद्यार्थी विजाभज प्रवर्गातील (VJ/NT-A, B, C, D) आणि महाराष्ट्राचा रहिवासी असावा.' },
      { en: 'Family annual income must not exceed ₹1,50,000.', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹१,५०,००० किंवा त्यापेक्षा कमी असावे.' },
      { en: 'Caste Certificate and Non-Creamy Layer Certificate are mandatory.', hi: 'जात प्रमाणपत्र आणि नॉन-क्रीमीलेअर दाखला आवश्यक.' },
      { en: 'Admission in an approved post-matric institution.', hi: 'मान्यताप्राप्त मॅट्रिकोत्तर अभ्यासक्रमात नियमित प्रवेश.' },
    ],
    applicationDocuments: [
      { en: 'VJNT Caste Certificate', hi: 'विजाभज जात प्रमाणपत्र' },
      { en: 'Non-Creamy Layer Certificate', hi: 'नॉन-क्रीमीलेअर प्रमाणपत्र' },
      { en: 'Tahsildar Income Certificate (<= ₹1.5 Lakh)', hi: 'तहसीलदारांचा उत्पन्नाचा दाखला (१.५ लाखांपर्यंत)' },
      { en: 'Maharashtra Domicile Certificate', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र' },
      { en: 'Previous Marksheets & College Fee Receipt', hi: 'मागील वर्षाच्या गुणपत्रिका व फी पावती' },
      { en: 'Aadhaar-linked Bank Account', hi: 'आधार संलग्न बँक खाते' },
    ],
    importantNotes: [
      { en: 'For income between ₹1.5L and ₹8L, apply under Tuition Fees and Examination Fees for VJNT Freeship scheme.', hi: 'उत्पन्न ₹१.५ लाख ते ₹८ लाखांच्या दरम्यान असल्यास VJNT फ्रीशिप योजनेअंतर्गत अर्ज करावा.' },
    ],
    sourceTitle: 'VJNT Welfare Directorate Guidelines, Govt of Maharashtra',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1C2508784DB0492B',
    sourceQuote: '“100% fee reimbursement and maintenance allowance for VJNT students with family income up to Rs. 1.50 lakh.”',
    registrationUrl: MAHADBT_REGISTER,
    registrationLabel: { en: 'Register on MahaDBT Portal', hi: 'महाडीबीटी पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: MAHADBT_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT', hi: 'महाडीबीटी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://mahadbt.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 11. OBC/VJNT/SBC - Gyanjyoti Savitribai Phule Aadhaar Yojana
  {
    id: 'mahadbt-savitribai-aadhaar',
    title: {
      en: 'Gyanjyoti Savitribai Phule Aadhaar Yojana (Hostel & Living Allowance for OBC/VJNT/SBC)',
      hi: 'ज्ञानज्योती सावित्रीबाई फुले आधार योजना (इमाव/विजाभज/विमाप्र वसतिगृह भत्ता)',
    },
    shortTitle: { en: 'Savitribai Phule Aadhaar Yojana', hi: 'सावित्रीबाई फुले आधार योजना' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'VJNT, OBC and SBC Welfare Department, Govt of Maharashtra',
      hi: 'इमाव, बहुजन कल्याण विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'OBC, VJNT, SBC students pursuing higher education without government hostel seats', hi: 'शासकीय वसतिगृहात प्रवेश न मिळालेले ओबीसी, विजाभज व विमाप्र पदवी विद्यार्थी' },
    casteCategories: ['OBC', 'VJNT', 'SBC'],
    summary: {
      en: 'Direct annual financial assistance between ₹38,000 and ₹60,000 for lodging, boarding, and academic materials for OBC, VJNT, and SBC students studying away from home.',
      hi: 'शासकीय वसतिगृहात जागा न मिळालेल्या ओबीसी, विजाभज, विमाप्र विद्यार्थ्यांना निवास, भोजन व शैक्षणिक साहित्यासाठी वार्षिक ₹३८,००० ते ₹६०,००० थेट बँक खात्यात.',
    },
    benefit: {
      en: 'Financial assistance of ₹60,000/year for Mumbai/Pune/Nagpur; ₹51,000/year for divisional cities; ₹43,000/year for district level; ₹38,000/year for taluka level.',
      hi: 'मुंबई, पुणे, नागपूर येथे शिकणाऱ्यांना वार्षिक ₹६०,०००; इतर विभागीय शहरांत ₹५१,०००; जिल्हास्तरावर ₹४३,००० आणि तालुकास्तरावर ₹३८,००० थेट बँक खात्यात.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('casteCategory', ['obc', 'vjnt', 'sbc']),
      inField('annualIncome', ['under-1.5', '1.5-to-2.5']),
    ),
    eligibility: [
      { en: 'Student must belong to OBC, VJNT, or SBC category and be a resident of Maharashtra.', hi: 'विद्यार्थी ओबीसी, विजाभज किंवा विमाप्र प्रवर्गाचा व महाराष्ट्राचा रहिवासी असावा.' },
      { en: 'Family annual income must not exceed ₹2,50,000.', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹२,५०,००० पेक्षा जास्त नसावे.' },
      { en: 'Admitted in an approved post-12th degree/diploma course of minimum 2 years.', hi: '१२ वी नंतरच्या किमान २ वर्षांच्या मान्यताप्राप्त पदवी/पदविका अभ्यासक्रमात प्रवेश.' },
      { en: 'Did not get admission in a government social welfare hostel.', hi: 'शासकीय मागासवर्गीय वसतिगृहात प्रवेश मिळालेला नसावा.' },
      { en: 'Minimum 60% marks in 12th standard examination.', hi: '१२ वी च्या परीक्षेत किमान ६०% गुण असावेत.' },
    ],
    applicationDocuments: [
      { en: 'Caste Certificate and Non-Creamy Layer Certificate', hi: 'जात प्रमाणपत्र व नॉन-क्रीमीलेअर दाखला' },
      { en: 'Tahsildar Income Certificate (<= ₹2.5 Lakh)', hi: 'तहसीलदारांचा उत्पन्नाचा दाखला (२.५ लाखांपर्यंत)' },
      { en: 'Hostel non-allotment declaration / proof of rented accommodation', hi: 'वसतिगृह प्रवेश न मिळाल्याचे प्रमाणपत्र व खोली भाडेकरार' },
      { en: 'College Admission Fee Receipt & Bonafide Certificate', hi: 'कॉलेज प्रवेश पावती व बोनाफाईड' },
      { en: 'Aadhaar Card linked to active bank account', hi: 'आधार संलग्न बँक खाते' },
    ],
    importantNotes: [
      { en: 'Funds are transferred in two installments directly via Aadhaar-linked DBT.', hi: 'रक्कम दोन हप्त्यांत थेट आधार संलग्न बँक खात्यात जमा केली जाते.' },
    ],
    sourceTitle: 'Government Resolution No. EBC-2023/CR 102/BCW-2, Bahujan Kalyan Dept',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/',
    sourceQuote: '“Living and accommodation allowance up to Rs. 60,000 per annum for OBC, VJNT, SBC students under Aadhaar Yojana.”',
    registrationUrl: MAHADBT_REGISTER,
    registrationLabel: { en: 'Register on MahaDBT Portal', hi: 'महाडीबीटी पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: MAHADBT_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT', hi: 'महाडीबीटी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://mahadbt.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 12. Minority - Scholarship for Students of Minority Communities
  {
    id: 'mahadbt-minority-higher',
    title: {
      en: 'State Minority Scholarship for Higher and Professional Education (Part II)',
      hi: 'अल्पसंख्याक विद्यार्थ्यांसाठी उच्च व व्यावसायिक शिक्षण शिष्यवृत्ती योजना (भाग २)',
    },
    shortTitle: { en: 'State Minority Scholarship', hi: 'अल्पसंख्याक उच्च शिक्षण शिष्यवृत्ती' },
    category: 'Education',
    portal: 'mahadbt',
    department: {
      en: 'Minority Development Department, Govt of Maharashtra',
      hi: 'अल्पसंख्याक विकास विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Muslim, Christian, Buddhist, Sikh, Parsi, Jain, Jewish students in professional courses', hi: 'मुस्लिम, ख्रिश्चन, बौद्ध, शीख, पारशी, जैन, यहुदी अल्पसंख्याक विद्यार्थी' },
    casteCategories: ['MINORITY'],
    summary: {
      en: 'Scholarship of up to ₹50,000 per year or actual tuition fees for students belonging to notified minority communities pursuing higher and professional education in Maharashtra.',
      hi: 'महाराष्ट्र राज्यातील अधिसूचित अल्पसंख्याक समाजातील व्यावसायिक व उच्च शिक्षण घेणाऱ्या विद्यार्थ्यांना वार्षिक ₹५०,००० पर्यंत किंवा प्रत्यक्ष शुल्क शिष्यवृत्ती.',
    },
    benefit: {
      en: 'Up to ₹50,000 per year or total tuition fees (whichever is lower) for technical and professional courses (MBBS, Engineering, Pharmacy, MBA, MCA, Law, etc.).',
      hi: 'तांत्रिक, वैद्यकीय व व्यावसायिक अभ्यासक्रमांसाठी वार्षिक ₹५०,००० किंवा एकूण शिक्षण शुल्क (यापैकी कमी असेल ते) थेट विद्यार्थ्याच्या बँक खात्यात जमा.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('casteCategory', 'minority'),
      inField('annualIncome', ['under-1.5', '1.5-to-2.5', '2.5-to-8']),
    ),
    eligibility: [
      { en: 'Student must belong to notified religious minority (Muslim, Christian, Buddhist, Sikh, Parsi, Jain, Jewish).', hi: 'विद्यार्थी अधिसूचित अल्पसंख्याक समाजाचा (मुस्लिम, ख्रिश्चन, बौद्ध, शीख, पारशी, जैन, यहुदी) असावा.' },
      { en: 'Must be a Domicile of Maharashtra State.', hi: 'महाराष्ट्राचा अधिकृत रहिवासी (Domicile) असावा.' },
      { en: 'Family annual income must not exceed ₹8,00,000.', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹८ लाखांच्या आत असावे.' },
      { en: 'Secured at least 50% marks in previous qualifying board/degree exam.', hi: 'मागील पात्रता परीक्षेत किमान ५०% गुण मिळालेले असावेत.' },
      { en: 'Enrolled in an approved government, aided, or private unaided professional institution.', hi: 'मान्यताप्राप्त व्यावसायिक संस्थेत नियमित प्रवेश.' },
    ],
    applicationDocuments: [
      { en: 'Minority Declaration Certificate / School Leaving Certificate stating religion', hi: 'अल्पसंख्याक स्वयंघोषणापत्र किंवा शाळेचा दाखला' },
      { en: 'Maharashtra State Domicile Certificate', hi: 'महाराष्ट्र अधिवास प्रमाणपत्र' },
      { en: 'Tahsildar Income Certificate (<= ₹8 Lakh)', hi: 'तहसीलदारांचा उत्पन्नाचा दाखला (८ लाखांपर्यंत)' },
      { en: 'CAP Allotment Letter / College Admission Fee Receipt', hi: 'कॅप वाटप पत्र / कॉलेज फी पावती' },
      { en: 'Previous Year Marksheet & Aadhaar-linked Bank Passbook', hi: 'मागील वर्षाची गुणपत्रिका व आधार संलग्न बँक पासबुक' },
    ],
    importantNotes: [
      { en: 'Only one candidate from the family can avail this scholarship per year.', hi: 'एका कुटुंबातील एकाच विद्यार्थ्याला या योजनेचा लाभ मिळतो.' },
      { en: 'Candidate cannot take scholarship from any other government department.', hi: 'इतर कोणत्याही सरकारी शिष्यवृत्तीचा लाभ घेता येत नाही.' },
    ],
    sourceTitle: 'Minority Development Department GR, Govt of Maharashtra',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1C2508784DB0492B',
    sourceQuote: '“Scholarship up to Rs. 50,000 per annum for minority students pursuing higher and technical education with income up to Rs. 8 Lakh.”',
    registrationUrl: MAHADBT_REGISTER,
    registrationLabel: { en: 'Register on MahaDBT Portal', hi: 'महाडीबीटी पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: MAHADBT_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT', hi: 'महाडीबीटी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://mdd.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 13. Agriculture - MahaDBT Krishi Yantrikikaran (Agricultural Mechanization)
  {
    id: 'mahadbt-krishi-yantrikikaran',
    title: {
      en: 'MahaDBT Krishi Yantrikikaran (Agricultural Mechanization / Tractor & Implements Subsidy)',
      hi: 'महाडीबीटी कृषी यांत्रिकीकरण योजना (ट्रॅक्टर व कृषी औजारे अनुदान)',
    },
    shortTitle: { en: 'MahaDBT Krishi Yantrikikaran', hi: 'महाडीबीटी कृषी यांत्रिकीकरण' },
    category: 'Agriculture',
    portal: 'mahadbt',
    department: {
      en: 'Agriculture Department (Krishi Vibhag - MahaDBT Farmer Portal), Govt of Maharashtra',
      hi: 'कृषी विभाग (महाडीबीटी शेतकरी योजना), महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Farmers owning agricultural land in Maharashtra seeking equipment subsidy', hi: 'महाराष्ट्रातील शेतजमीन धारक शेतकरी (ट्रॅक्टर, रोटाव्हेटर, पेरणी यंत्र)' },
    casteCategories: ['ALL', 'OPEN', 'OBC', 'SC', 'ST'],
    summary: {
      en: 'Financial capital subsidy of 40% to 50% for purchasing tractors, power tillers, rotavators, seed drills, threshers and agricultural machinery under MahaDBT Farmer Portal.',
      hi: 'महाडीबीटी शेतकरी पोर्टलद्वारे ट्रॅक्टर, पॉवर टिलर, रोटाव्हेटर, पेरणी यंत्र, मळणी यंत्र यांसारख्या अवजारांवर ४०% ते ५०% थेट शासकीय अनुदान.',
    },
    benefit: {
      en: 'Direct capital subsidy up to ₹1,25,000 on tractors; up to ₹50,000 on rotavators; 50% subsidy for SC/ST/Women/Small-Marginal farmers and 40% for general category farmers deposited via DBT.',
      hi: 'ट्रॅक्टरवर ₹१,२५,००० पर्यंत अनुदान; रोटाव्हेटरवर ₹५०,००० पर्यंत; महिला, अल्पभूधारक व अनु. जाती/जमाती शेतकऱ्यांना ५०% आणि सर्वसाधारण शेतकऱ्यांना ४०% अनुदान थेट बँक खात्यात.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('farmerLandholder', 'yes'),
    ),
    eligibility: [
      { en: 'Applicant farmer must own cultivable agricultural land in Maharashtra with 7/12 (Satbara) & 8A extracts.', hi: 'अर्जदार शेतकऱ्याच्या नावावर महाराष्ट्रात शेतजमीन (७/१२ आणि ८-अ उतारा) असणे आवश्यक.' },
      { en: 'Only one tractor or agricultural machinery benefit per farmer family within a 10-year period.', hi: 'एका शेतकरी कुटुंबाला १० वर्षांतून एकदाच एकाच प्रकारच्या अवजाराचा लाभ मिळतो.' },
      { en: 'Selection is done through transparent computerized lottery draw on MahaDBT portal.', hi: 'महाडीबीटी पोर्टलवर संगणकीय सोडतीद्वारे (लॉटरी) पारदर्शक निवड केली जाते.' },
      { en: 'Pre-sanction letter (पूर्वसंमती पत्र) must be obtained before purchasing the machinery.', hi: 'कृषी विभागाचे पूर्वसंमती पत्र मिळाल्यानंतरच अधिकृत विक्रेत्याकडून अवजार खरेदी करावे लागते.' },
      { en: 'Aadhaar-linked bank account is compulsory for DBT payout.', hi: 'अनुदान जमा होण्यासाठी बँक खाते आधार संलग्न असणे अनिवार्य.' },
    ],
    applicationDocuments: [
      { en: 'Latest 7/12 Extract (७/१२ उतारा) and 8A Extract (८-अ उतारा) with Aadhaar linking', hi: 'अद्ययावत ७/१२ उतारा आणि ८-अ उतारा' },
      { en: 'Aadhaar Card of the landholder farmer', hi: 'शेतकऱ्याचे आधार कार्ड' },
      { en: 'Caste Certificate (if applying under SC/ST reserved quota for 50% subsidy)', hi: 'जात प्रमाणपत्र (SC/ST कोट्यातून ५०% अनुदानासाठी)' },
      { en: 'Quotation of machinery from authorized dealer & GST Invoice after pre-sanction', hi: 'अधिकृत विक्रेत्याचे कोटेशन व पूर्वसंमतीनंतर खरेदीचे मूळ जीएसटी बिल' },
      { en: 'Machinery geo-tagged photograph and physical inspection report', hi: 'अवजाराचा जिओ-टॅग केलेला फोटो व कृषी सहाय्यक तपासणी अहवाल' },
    ],
    importantNotes: [
      { en: 'Never purchase machinery before receiving official pre-sanction (पूर्वसंमती पत्र) on MahaDBT portal.', hi: 'पोर्टलवर पूर्वसंमती पत्र मिळण्यापूर्वी खरेदी केलेले अवजार अनुदानासाठी अपात्र ठरते.' },
      { en: 'Farmers must upload the purchase bill within 30 days of receiving the pre-sanction order.', hi: 'पूर्वसंमती मिळाल्यापासून ३० दिवसांच्या आत बिल पोर्टलवर अपलोड करणे आवश्यक असते.' },
    ],
    sourceTitle: 'Sub-Mission on Agricultural Mechanization (SMAM) & MahaDBT Krishi Guidelines',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/Farmer/Login/Login',
    sourceQuote: '“Direct subsidy of 40% to 50% on tractors and farm implements via MahaDBT computerized lottery.”',
    registrationUrl: MAHADBT_FARMER_REG,
    registrationLabel: { en: 'Register on MahaDBT Farmer Portal', hi: 'महाडीबीटी शेतकरी पोर्टलवर नोंदणी करा' },
    applicationUrl: MAHADBT_FARMER_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT Krishi', hi: 'महाडीबीटी कृषी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://krishi.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 14. Agriculture - MahaDBT Sinchan Suvidha (Micro Irrigation / Drip & Sprinkler)
  {
    id: 'mahadbt-krishi-sinchan',
    title: {
      en: 'MahaDBT Micro-Irrigation Scheme (Drip & Sprinkler / Sinchan Suvidha)',
      hi: 'महाडीबीटी सूक्ष्म सिंचन योजना (ठिबक व तुषार सिंचन अनुदान)',
    },
    shortTitle: { en: 'MahaDBT Drip & Sprinkler', hi: 'ठिबक व तुषार सिंचन (कृषी)' },
    category: 'Agriculture',
    portal: 'mahadbt',
    department: {
      en: 'Agriculture Department (PMKSY - Per Drop More Crop), Govt of Maharashtra',
      hi: 'कृषी विभाग (प्रधानमंत्री कृषी सिंचन योजना), महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Farmers seeking subsidy for Drip & Sprinkler irrigation systems', hi: 'पाण्याचा कार्यक्षम वापर करण्यासाठी ठिबक व तुषार सिंचन बसवणारे शेतकरी' },
    casteCategories: ['ALL', 'OPEN', 'OBC', 'SC', 'ST'],
    summary: {
      en: '75% to 80% capital subsidy for small and marginal farmers (up to 5 acres) and 60% for other farmers for installing Drip and Sprinkler irrigation systems.',
      hi: 'अल्प व अत्यल्प भूधारक शेतकऱ्यांना ७५% ते ८०% आणि इतर शेतकऱ्यांना ६०% पर्यंत ठिबक व तुषार सिंचनावर थेट शासकीय अनुदान.',
    },
    benefit: {
      en: 'Subsidy of up to 80% on approved unit cost for small/marginal farmers (up to 5 hectares) and 60% for other farmers, credited directly into the farmer bank account via DBT.',
      hi: 'अल्पभूधारक शेतकऱ्यांना ८०% आणि इतर शेतकऱ्यांना ६०% अनुदान थेट बँक खात्यात जमा केले जाते. महावितरण कृषी पंप वीज जोडणी किंवा विहीर/बोअरवेल आवश्यक.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('farmerLandholder', 'yes'),
    ),
    eligibility: [
      { en: 'Farmer must possess agricultural land in Maharashtra with 7/12 & 8A extracts.', hi: 'अर्जदार शेतकऱ्याच्या नावावर ७/१२ आणि ८-अ उतारा असणे आवश्यक.' },
      { en: 'Must have an assured source of water (well, borewell, canal, farm pond, or river) with functional irrigation setup.', hi: 'शेतजमिनीवर विहीर, कूपनलिका, शेततळे किंवा कालवा यांसारखा शाश्वत पाण्याचा स्रोत असावा.' },
      { en: 'Land must not have received micro-irrigation subsidy in the same survey number within the last 7 years.', hi: 'गेल्या ७ वर्षांत त्याच गट क्रमांकावर सिंचन योजनेचा लाभ घेतलेला नसावा.' },
      { en: 'Selected through computerized lottery on MahaDBT portal.', hi: 'महाडीबीटी पोर्टलवरील संगणकीय सोडतीद्वारे निवड.' },
    ],
    applicationDocuments: [
      { en: '7/12 Extract (with recorded water source or joint consent) & 8A Extract', hi: 'पाण्याच्या स्रोताची नोंद असलेला ७/१२ व ८-अ उतारा' },
      { en: 'Aadhaar Card and Bank Passbook linked to NPCI', hi: 'आधार कार्ड व बँक पासबुक' },
      { en: 'Quotation and layout drawing from authorized BIS-certified micro-irrigation company', hi: 'अधिकृत सूक्ष्म सिंचन कंपनीचे कोटेशन व नकाशा' },
      { en: 'Electricity connection bill or proof of solar pump for water source', hi: 'पाण्याच्या पंपाचे वीज बिल किंवा सौर पंपाचा पुरावा' },
      { en: 'Caste Certificate (for SC/ST beneficiaries)', hi: 'जात प्रमाणपत्र (SC/ST शेतकऱ्यांसाठी)' },
    ],
    importantNotes: [
      { en: 'Installation must be completed through empanelled registered companies complying with BIS quality standards.', hi: 'शासनमान्य नोंदणीकृत कंपनीकडूनच आयएसआय/बीआयएस मानकांची साधने बसवणे बंधनकारक.' },
      { en: 'GPS-enabled spot inspection by Agriculture Assistant is mandatory prior to subsidy disbursement.', hi: 'कृषी सहाय्यकाकडून प्रत्यक्ष मोका तपासणी (Geo-tagging) झाल्यानंतरच अनुदान खात्यात वर्ग होते.' },
    ],
    sourceTitle: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) - MahaDBT Guidelines',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/Farmer/Login/Login',
    sourceQuote: '“Up to 80% subsidy on drip and sprinkler micro-irrigation installations for farmers in Maharashtra.”',
    registrationUrl: MAHADBT_FARMER_REG,
    registrationLabel: { en: 'Register on MahaDBT Farmer Portal', hi: 'महाडीबीटी शेतकरी पोर्टलवर नोंदणी करा' },
    applicationUrl: MAHADBT_FARMER_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT Krishi', hi: 'महाडीबीटी कृषी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://krishi.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 15. Agriculture - Bhausaheb Fundkar Falbag Lagwad Yojana
  {
    id: 'mahadbt-bhausaheb-fundkar',
    title: {
      en: 'Bhausaheb Fundkar Falbag Lagwad Yojana (Fruit Orchard Plantation Subsidy)',
      hi: 'भाऊसाहेब फुंडकर फळबाग लागवड योजना (फळबाग अनुदान)',
    },
    shortTitle: { en: 'Bhausaheb Fundkar Falbag Yojana', hi: 'भाऊसाहेब फुंडकर फळबाग योजना' },
    category: 'Agriculture',
    portal: 'mahadbt',
    department: {
      en: 'Horticulture Department, Agriculture Dept, Govt of Maharashtra',
      hi: 'फलोत्पादन विभाग, कृषी विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Farmers planting fruit orchards (Mango, Guava, Pomegranate, Citrus, Custard Apple)', hi: 'आंबा, पेरू, डाळिंब, मोसंबी, सीताफळ फळबाग लागवड करणारे शेतकरी' },
    casteCategories: ['ALL', 'OPEN', 'OBC', 'SC', 'ST'],
    summary: {
      en: '100% government financial assistance disbursed over 3 years (50% in 1st year, 30% in 2nd year, 20% in 3rd year) for establishing fruit orchards on agricultural land.',
      hi: 'शेतकऱ्यांना आंबा, पेरू, डाळिंब, संत्रा, सीताफळ यांसारख्या फळबागांच्या लागवडीसाठी ३ वर्षांत १००% शासकीय अनुदान (पहिल्या वर्षी ५०%, दुसऱ्या वर्षी ३०%, तिसऱ्या वर्षी २०%).',
    },
    benefit: {
      en: 'Full 100% subsidy covering pit digging, saplings, fertilizers, drip setup, plant protection, and maintenance spread across 3 consecutive years.',
      hi: 'खड्डे खोदणे, दर्जेदार कलमे/रोपे खरेदी, खते, कीटकनाशके व आंतरमशागत यांसाठी ३ वर्षांत १००% अनुदान थेट बँक खात्यात.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('farmerLandholder', 'yes'),
    ),
    eligibility: [
      { en: 'Farmer holding cultivable agricultural land in Maharashtra with 7/12 & 8A extracts.', hi: 'महाराष्ट्रात स्वतःच्या नावावर शेतजमीन (७/१२ उतारा) असणारा शेतकरी.' },
      { en: 'Minimum plantation area is 0.20 hectare (0.5 acre) and maximum up to 6.00 hectares.', hi: 'किमान ०.२० हेक्टर (अर्धा एकर) आणि जास्तीत जास्त ६.०० हेक्टर क्षेत्रावर लागवड.' },
      { en: 'Must have permanent or assured irrigation arrangements for the plants.', hi: 'फळझाडे जगवण्यासाठी पाण्याचा खात्रीशीर स्रोत उपलब्ध असावा.' },
      { en: 'Farmer family must not have received Falbag subsidy on the same land under MGNREGS.', hi: 'त्याच जमिनीवर मनरेगा फळबाग योजनेचा लाभ घेतलेला नसावा.' },
    ],
    applicationDocuments: [
      { en: '7/12 & 8A extracts of the designated plantation land', hi: 'लागवड करावयाच्या जमिनीचा ७/१२ आणि ८-अ उतारा' },
      { en: 'Aadhaar Card and active bank account passbook', hi: 'आधार कार्ड व बँक पासबुक' },
      { en: 'Soil and water testing report (if applicable) & water source certificate', hi: 'माती-पाणी तपासणी व पाणी उपलब्धतेचा पुरावा' },
      { en: 'Purchase receipts from government or registered private nurseries for saplings', hi: 'शासकीय किंवा नोंदणीकृत रोपवाटिकेतून खरेदी केलेली कलमे/रोपांचे बिल' },
    ],
    importantNotes: [
      { en: 'Second and third-year subsidy installments require minimum 80% to 90% survival rate of planted saplings.', hi: 'दुसऱ्या व तिसऱ्या वर्षाचे अनुदान मिळण्यासाठी लावलेली झाडे किमान ८०% ते ९०% जगलेली असणे अनिवार्य.' },
    ],
    sourceTitle: 'Government Resolution No. Falba-2018/CR 47/Fal-1, Agriculture & Horticulture Dept',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/Farmer/Login/Login',
    sourceQuote: '“100% financial subsidy over 3 years for fruit plantation under Bhausaheb Fundkar Yojana.”',
    registrationUrl: MAHADBT_FARMER_REG,
    registrationLabel: { en: 'Register on MahaDBT Farmer Portal', hi: 'महाडीबीटी शेतकरी पोर्टलवर नोंदणी करा' },
    applicationUrl: MAHADBT_FARMER_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT Krishi', hi: 'महाडीबीटी कृषी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://krishi.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 16. Agriculture - Magel Tyala Shet-Tale (Farm Pond on Demand)
  {
    id: 'mahadbt-magel-tyala-shettale',
    title: {
      en: 'Magel Tyala Shet-Tale (Farm Pond on Demand Subsidy Scheme)',
      hi: 'मागेल त्याला शेततळे योजना (शेततळे अनुदान)',
    },
    shortTitle: { en: 'Magel Tyala Shet-Tale', hi: 'मागेल त्याला शेततळे' },
    category: 'Agriculture',
    portal: 'mahadbt',
    department: {
      en: 'Agriculture Department, Govt of Maharashtra',
      hi: 'कृषी विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Farmers seeking water harvesting and storage ponds on their agricultural land', hi: 'पाणी साठवण्यासाठी शेतात शेततळे खोदू इच्छिणारे शेतकरी' },
    casteCategories: ['ALL', 'OPEN', 'OBC', 'SC', 'ST'],
    summary: {
      en: 'Direct capital subsidy up to ₹75,000 for digging and plastic lining farm ponds to ensure water harvesting and irrigation security.',
      hi: 'पावसाचे पाणी साठवून शेतीला संरक्षित सिंचन देण्यासाठी शेततळे खोदणे व प्लास्टिक अस्तरीकरणासाठी ₹७५,००० पर्यंत थेट शासकीय अनुदान.',
    },
    benefit: {
      en: 'Direct Benefit Transfer subsidy up to ₹75,000 based on pond dimensions (e.g. 30x30x3 meters or 20x20x3 meters) deposited in farmer bank account.',
      hi: 'शेततळ्याच्या आकारमानानुसार (उदा. ३०x३०x३ मीटर किंवा २०x२०x३ मीटर) ₹७५,००० पर्यंतचे अनुदान थेट शेतकऱ्याच्या खात्यात जमा केले जाते.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('farmerLandholder', 'yes'),
    ),
    eligibility: [
      { en: 'Farmer holding at least 0.60 hectare (1.5 acres) of agricultural land in Maharashtra.', hi: 'शेतकऱ्याकडे स्वतःच्या नावावर किमान ०.६० हेक्टर (दीड एकर) जमीन असणे आवश्यक.' },
      { en: 'The land must be technically suitable for pond excavation without rock obstruction.', hi: 'जमीन शेततळे खोदण्यास योग्य आणि पाणी पाझर कमी असणारी असावी.' },
      { en: 'No previous government farm pond subsidy utilized on the same survey number.', hi: 'त्याच जमिनीवर पूर्वी शेततळ्याचा शासकीय लाभ घेतलेला नसावा.' },
      { en: 'Pond excavation must be completed within the stipulated timeline after receiving pre-sanction.', hi: 'पूर्वसंमती मिळाल्यापासून दिलेल्या मुदतीत शेततळ्याचे काम पूर्ण करणे आवश्यक.' },
    ],
    applicationDocuments: [
      { en: '7/12 Extract and 8A Extract showing land ownership', hi: '७/१२ आणि ८-अ उतारा' },
      { en: 'Site map / sketch of designated farm pond area on farm land', hi: 'शेततळ्याच्या जागेचा नकाशा / आराखडा' },
      { en: 'Aadhaar Card and active bank passbook copy', hi: 'आधार कार्ड व बँक पासबुक' },
      { en: 'Pre-construction and post-construction geo-tagged photographs', hi: 'काम सुरू होण्यापूर्वीचा व काम पूर्ण झाल्यानंतरचा जिओ-टॅग फोटो' },
    ],
    importantNotes: [
      { en: 'Subsidies are released after the Agriculture Assistant verifies physical pond dimensions and geo-tags the site.', hi: 'कृषी सहाय्यकाने प्रत्यक्ष मोजमाप व जिओ-टॅगिंग केल्यानंतरच अनुदानाची रक्कम मंजूर होते.' },
    ],
    sourceTitle: 'Government Resolution No. Shetat-2016/CR 24/Jal-2, Agriculture Dept Maharashtra',
    sourceUrl: 'https://mahadbt.maharashtra.gov.in/Farmer/Login/Login',
    sourceQuote: '“Subsidy up to Rs. 75,000 for on-demand farm pond excavation under Magel Tyala Shet-Tale.”',
    registrationUrl: MAHADBT_FARMER_REG,
    registrationLabel: { en: 'Register on MahaDBT Farmer Portal', hi: 'महाडीबीटी शेतकरी पोर्टलवर नोंदणी करा' },
    applicationUrl: MAHADBT_FARMER_LOGIN,
    applicationLabel: { en: 'Login & Apply on MahaDBT Krishi', hi: 'महाडीबीटी कृषी लॉगिन करून अर्ज करा' },
    guidelinesUrl: 'https://krishi.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 17. Agriculture - Namo Shetkari Mahasanman Nidhi Yojana
  {
    id: 'mahadbt-namo-shetkari',
    title: {
      en: 'Namo Shetkari Mahasanman Nidhi Yojana (Maharashtra Farmer State Support)',
      hi: 'नमो शेतकरी महासन्मान निधी योजना (महाराष्ट्र शेतकरी वार्षिक ₹६,००० अनुदान)',
    },
    shortTitle: { en: 'Namo Shetkari Yojana', hi: 'नमो शेतकरी महासन्मान निधी' },
    category: 'Agriculture',
    portal: 'mahadbt',
    department: {
      en: 'Agriculture Department, Govt of Maharashtra',
      hi: 'कृषी विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Landholder farmers in Maharashtra eligible under PM-KISAN scheme', hi: 'पीएम-किसान योजनेसाठी पात्र असलेले महाराष्ट्रातील सर्व शेतकरी' },
    casteCategories: ['ALL', 'OPEN', 'OBC', 'SC', 'ST'],
    summary: {
      en: 'Annual cash benefit of ₹6,000 transferred in 3 equal installments of ₹2,000 by Maharashtra Government to farmer bank accounts (in addition to PM-KISAN, total ₹12,000/year).',
      hi: 'महाराष्ट्र शासनाकडून राज्यातील शेतकऱ्यांना दरवर्षी ₹६,००० (दर चार महिन्यांनी ₹२,०००) थेट बँक खात्यात (पीएम-किसानच्या ₹६,००० सह एकूण ₹१२,०००/वर्ष).',
    },
    benefit: {
      en: 'Direct cash transfer of ₹6,000 per year in three installments of ₹2,000 directly through Aadhaar-based DBT payment bridge.',
      hi: 'दरवर्षी ₹६,००० ची थेट आर्थिक मदत (₹२,००० चे तीन हप्ते) आधार संलग्न बँक खात्यात जमा. पीएम-किसान योजनेच्या ₹६,००० सह एकूण वार्षिक ₹१२,००० मिळतात.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('farmerLandholder', 'yes'),
    ),
    eligibility: [
      { en: 'Farmer must be a registered and approved beneficiary of PM-KISAN in Maharashtra.', hi: 'शेतकरी केंद्र शासनाच्या पीएम-किसान (PM-KISAN) योजनेचा पात्र लाभार्थी असावा.' },
      { en: 'Cultivable landholding registered in farmer name in Maharashtra state land records.', hi: 'शेतकऱ्याच्या नावावर महाराष्ट्रात शेतजमिनीची अधिकृत नोंद असावी.' },
      { en: 'Mandatory completion of e-KYC and land seeding on the portal.', hi: 'पोर्टलवर ई-केवायसी (e-KYC) आणि लँड सिडिंग (जमीन नोंद) पूर्ण असणे बंधनकारक.' },
      { en: 'Active bank account linked with Aadhaar NPCI mapper.', hi: 'बँक खाते आधारशी संलग्न (NPCI Seeding Active) असणे आवश्यक.' },
    ],
    applicationDocuments: [
      { en: 'PM-KISAN Beneficiary Registration ID / Aadhaar Card', hi: 'पीएम-किसान नोंदणी क्रमांक / आधार कार्ड' },
      { en: 'Aadhaar-linked active bank account passbook', hi: 'आधार संलग्न बँक खाते' },
      { en: 'Land ownership 7/12 extract linked with Aadhaar', hi: 'आधार संलग्न ७/१२ उतारा' },
    ],
    importantNotes: [
      { en: 'Farmers already receiving PM-KISAN automatically qualify; no separate physical application needed once e-KYC is active.', hi: 'पीएम-किसानचे हप्ते मिळणाऱ्या शेतकऱ्यांना आपोआप हा लाभ मिळतो; वेगळा अर्ज करण्याची गरज नसते.' },
    ],
    sourceTitle: 'Government Resolution No. NSMN-2023/CR 104/Krishi-3, Govt of Maharashtra',
    sourceUrl: 'https://nsmn.mahadbt.maharashtra.gov.in/',
    sourceQuote: '“Rs. 6,000 per year state top-up in three installments for Maharashtra farmers under Namo Shetkari Mahasanman Nidhi.”',
    registrationUrl: 'https://nsmn.mahadbt.maharashtra.gov.in/',
    registrationLabel: { en: 'Check Status on Namo Shetkari Portal', hi: 'नमो शेतकरी पोर्टलवर स्थिती तपासा' },
    applicationUrl: 'https://nsmn.mahadbt.maharashtra.gov.in/',
    applicationLabel: { en: 'Open Namo Shetkari Portal', hi: 'नमो शेतकरी पोर्टल उघडा' },
    guidelinesUrl: 'https://krishi.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 18. Animal Husbandry - MahaDBT Milch Cattle & Goat Subsidy (Pashusamvardhan)
  {
    id: 'mahadbt-pashusamvardhan',
    title: {
      en: 'MahaDBT Pashusamvardhan (Milch Cows, Buffaloes & Goat Farming Subsidy)',
      hi: 'महाडीबीटी पशुसंवर्धन योजना (दुभती जनावरे व शेळी-मेंढी पालन अनुदान)',
    },
    shortTitle: { en: 'MahaDBT Pashusamvardhan', hi: 'महाडीबीटी पशुसंवर्धन' },
    category: 'Agriculture',
    portal: 'mahadbt',
    department: {
      en: 'Animal Husbandry Department (Pashusamvardhan), Govt of Maharashtra',
      hi: 'पशुसंवर्धन विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Rural residents, marginal farmers and unemployed youth seeking livestock setup', hi: 'ग्रामीण शेतकरी, बेरोजगार युवक आणि महिला (दुग्धव्यवसाय व शेळीपालन)' },
    casteCategories: ['ALL', 'OPEN', 'OBC', 'SC', 'ST'],
    summary: {
      en: '50% to 75% subsidy on purchasing high milk-yielding cows/buffaloes (2 or 6 animals unit) or establishing a 10+1 goat/sheep rearing unit.',
      hi: '२ किंवा ६ दुधाळ गायी/म्हशी खरेदी करणे किंवा १०+१ शेळी-मेंढी पालन गट स्थापन करण्यासाठी ५०% ते ७५% थेट शासकीय अनुदान.',
    },
    benefit: {
      en: '50% capital subsidy for general category and 75% subsidy for SC/ST beneficiaries on approved unit costs of livestock purchase and shed construction.',
      hi: 'सर्वसाधारण प्रवर्गासाठी ५०% आणि अनुसूचित जाती/जमातीसाठी ७५% अनुदान थेट बँक खात्यात जमा केले जाते.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
    ),
    eligibility: [
      { en: 'Resident of Maharashtra aged 18 years or older.', hi: 'महाराष्ट्राचा रहिवासी, वय किमान १८ वर्षे पूर्ण.' },
      { en: 'Must have adequate arrangement for fodder, water, and animal shed.', hi: 'जनावरांसाठी चारा, पाणी आणि गोठ्याची योग्य सोय असणे आवश्यक.' },
      { en: 'Selection via online lottery system on Animal Husbandry MahaDBT portal.', hi: 'पशुसंवर्धन महाडीबीटी पोर्टलवर ऑनलाईन सोडतीद्वारे निवड.' },
      { en: 'Beneficiary must not have received similar livestock scheme benefits in the last 3 years.', hi: 'गेल्या ३ वर्षांत अशाच योजनेचा लाभ घेतलेला नसावा.' },
    ],
    applicationDocuments: [
      { en: 'Aadhaar Card and Maharashtra Residence Certificate', hi: 'आधार कार्ड व महाराष्ट्राचा रहिवासी दाखला' },
      { en: 'Caste Certificate (for 75% subsidy under SC/ST quota)', hi: 'जात प्रमाणपत्र (SC/ST प्रवर्गासाठी ७५% अनुदानासाठी)' },
      { en: '7/12 extract or livestock shelter certificate from Gram Panchayat', hi: '७/१२ उतारा किंवा ग्रामपंचायतीचे गोठा उपलब्धतेचे प्रमाणपत्र' },
      { en: 'Aadhaar-linked bank account passbook copy', hi: 'आधार संलग्न बँक पासबुक' },
    ],
    importantNotes: [
      { en: 'Purchased animals must be tagged with INAPH ear tags and insured as per guidelines.', hi: 'खरेदी केलेल्या जनावरांना इनाफ (INAPH) टॅगिंग करणे आणि विमा उतरवणे बंधनकारक असते.' },
    ],
    sourceTitle: 'Animal Husbandry Department GR & Guidelines, Govt of Maharashtra',
    sourceUrl: 'https://ah.mahadbtmahait.gov.in/Login/Login',
    sourceQuote: '“50% to 75% subsidy on dairy cattle and goat rearing units through MahaDBT Pashusamvardhan portal.”',
    registrationUrl: 'https://ah.mahadbtmahait.gov.in/',
    registrationLabel: { en: 'Register on Pashusamvardhan Portal', hi: 'पशुसंवर्धन पोर्टलवर नवीन नोंदणी करा' },
    applicationUrl: 'https://ah.mahadbtmahait.gov.in/Login/Login',
    applicationLabel: { en: 'Login on Pashusamvardhan Portal', hi: 'पशुसंवर्धन पोर्टल लॉगिन करा' },
    guidelinesUrl: 'https://ahd.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 19. Maharashtra Flagship - Mukhyamantri Majhi Ladki Bahin Yojana
  {
    id: 'mh-ladki-bahin',
    title: {
      en: 'Mukhyamantri Majhi Ladki Bahin Yojana (₹1,500/Month for Women in Maharashtra)',
      hi: 'मुख्यमंत्री माझी लाडकी बहीण योजना (महिलांसाठी दरमहा ₹१,५०० आर्थिक सहाय्य)',
    },
    shortTitle: { en: 'Majhi Ladki Bahin Yojana', hi: 'माझी लाडकी बहीण योजना' },
    category: 'Maternity',
    portal: 'state',
    department: {
      en: 'Women and Child Development Department, Govt of Maharashtra',
      hi: 'महिला व बालविकास विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Women residents of Maharashtra aged 21–65 years with family income up to ₹2.5 Lakh', hi: 'महाराष्ट्रातील २१ ते ६५ वयोगटातील पात्र महिला (कौटुंबिक उत्पन्न ₹२.५ लाखांपर्यंत)' },
    casteCategories: ['ALL', 'OPEN', 'OBC', 'SC', 'ST', 'VJNT', 'MINORITY'],
    summary: {
      en: 'Direct monthly financial assistance of ₹1,500 (₹18,000 per year) credited directly into the Aadhaar-linked bank account of eligible women in Maharashtra.',
      hi: 'महाराष्ट्रातील २१ ते ६५ वयोगटातील पात्र महिलांना स्वावलंबनासाठी दरमहा ₹१,५०० (वार्षिक ₹१८,०००) थेट आधार संलग्न बँक खात्यात.',
    },
    benefit: {
      en: '₹1,500 per month (total ₹18,000/year) credited directly into the woman’s Aadhaar-linked bank account on the 10th-15th of every month.',
      hi: 'दरमहा ₹१,५०० ची थेट आर्थिक मदत (वार्षिक ₹१८,०००) महिलांच्या बँक खात्यात आधार डीबीटीद्वारे दर महिन्याला जमा.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('annualIncome', ['under-1.5', '1.5-to-2.5']),
    ),
    eligibility: [
      { en: 'Applicant must be a female resident/domicile of Maharashtra aged between 21 and 65 years.', hi: 'अर्जदार महिला महाराष्ट्राची रहिवासी असून वय २१ ते ६५ वर्षांच्या दरम्यान असावे.' },
      { en: 'Annual combined family income must not exceed ₹2,50,000 (holding Yellow or Orange Ration Card).', hi: 'कुटुंबाचे एकत्रित वार्षिक उत्पन्न ₹२,५०,००० पेक्षा जास्त नसावे (पिवळे किंवा केशरी रेशन कार्ड धारक).' },
      { en: 'Applicable to married, widowed, divorced, deserted, and unmarried women.', hi: 'विवाहित, विधवा, घटस्फोटित, परित्यक्ता आणि अविवाहित महिलांसाठी योजना लागू.' },
      { en: 'Applicant’s family members must not be regular government/PSU employees or income-tax payers.', hi: 'कुटुंबातील कोणताही सदस्य नियमित शासकीय/निमशासकीय कर्मचारी किंवा आयकरदाता नसावा.' },
      { en: 'Must have an active bank account in applicant’s name seeded with Aadhaar on NPCI.', hi: 'स्वतःच्या नावावर आधार लिंक असलेले सक्रिय बँक खाते असणे आवश्यक.' },
    ],
    applicationDocuments: [
      { en: 'Aadhaar Card of the woman applicant', hi: 'महिला अर्जदाराचे आधार कार्ड' },
      { en: 'Maharashtra Domicile Certificate / Voter ID / 15-year Ration Card / School Leaving Certificate', hi: 'अधिवास प्रमाणपत्र / मतदान कार्ड / रेशन कार्ड / शाळा सोडल्याचा दाखला' },
      { en: 'Income Certificate (<= ₹2.5 Lakh) or Yellow/Orange Ration Card', hi: 'उत्पन्नाचा दाखला (२.५ लाखांपर्यंत) किंवा पिवळे/केशरी रेशन कार्ड' },
      { en: 'Aadhaar-seeded active bank account passbook copy', hi: 'आधार संलग्न बँक पासबुक' },
      { en: 'Hamipatra (Self-declaration prescribed under the scheme)', hi: 'योजनेअंतर्गत विहित नमुन्यातील हमीपत्र (स्वयंघोषणापत्र)' },
    ],
    importantNotes: [
      { en: 'Ensure your bank account has Aadhaar Seeding / NPCI mapping enabled; payments fail if seeding is missing.', hi: 'बँक खात्यात आधार एनपीसीआय मॅपिंग (Aadhaar Seeding) सक्रिय असणे आवश्यक आहे; अन्यथा रक्कम जमा होत नाही.' },
      { en: 'Applications can be submitted via the official Ladki Bahin portal or Nari Shakti Doot mobile application.', hi: 'अधिकृत लाडकी बहीण पोर्टल किंवा नारी शक्ती दूत ॲपद्वारे अर्ज करता येतो.' },
    ],
    sourceTitle: 'Government Resolution No. WCD-2024/CR 181/Karya-6, Women & Child Development Dept',
    sourceUrl: 'https://ladakibahin.maharashtra.gov.in/',
    sourceQuote: '“Financial assistance of Rs. 1,500 per month for women aged 21 to 65 years with income up to Rs. 2.50 lakh.”',
    registrationUrl: 'https://ladakibahin.maharashtra.gov.in/',
    registrationLabel: { en: 'Register on Ladki Bahin Portal', hi: 'लाडकी बहीण पोर्टलवर नवीन अर्ज करा' },
    applicationUrl: 'https://ladakibahin.maharashtra.gov.in/',
    applicationLabel: { en: 'Login to Ladki Bahin Portal', hi: 'लाडकी बहीण पोर्टल लॉगिन करा' },
    guidelinesUrl: 'https://womenchild.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 20. Social Assistance - Sanjay Gandhi Niradhar Anudan Yojana
  {
    id: 'mh-sanjay-gandhi-niradhar',
    title: {
      en: 'Sanjay Gandhi Niradhar Anudan Yojana (Social Assistance for Destitute & Widows)',
      hi: 'संजय गांधी निराधार अनुदान योजना (निराधार, विधवा व दिव्यांगांसाठी मासिक पेन्शन)',
    },
    shortTitle: { en: 'Sanjay Gandhi Niradhar Yojana', hi: 'संजय गांधी निराधार योजना' },
    category: 'Pensions',
    portal: 'state',
    department: {
      en: 'Social Justice / Revenue Department, Govt of Maharashtra',
      hi: 'सामाजिक न्याय व महसूल विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Destitute persons, widows, abandoned women, persons with disabilities (40%+)', hi: 'निराधार व्यक्ती, विधवा महिला, अनाथ मुले आणि दिव्यांग व्यक्ती' },
    casteCategories: ['ALL', 'OPEN', 'OBC', 'SC', 'ST'],
    summary: {
      en: 'Monthly financial assistance of ₹1,500 per month for destitute individuals, widows, physically challenged persons, and deserted women residing in Maharashtra.',
      hi: 'महाराष्ट्रातील निराधार व्यक्ती, विधवा, घटस्फोटित महिला आणि ४०% पेक्षा जास्त दिव्यांग व्यक्तींना दरमहा ₹१,५०० मासिक पेन्शन.',
    },
    benefit: {
      en: 'Monthly pension of ₹1,500 per month credited directly into beneficiary bank account via Tahsildar / Sanjay Gandhi Niradhar Committee.',
      hi: 'दरमहा ₹१,५०० थेट बँक खात्यात पेन्शन म्हणून जमा (तहसीलदार कार्यालयातील संजय गांधी निराधार समितीद्वारे मंजूर).',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('annualIncome', ['under-1.5']),
    ),
    eligibility: [
      { en: 'Must be a resident of Maharashtra for at least 15 continuous years.', hi: 'किमान १५ वर्षे महाराष्ट्रात सलग वास्तव्य असणारा रहिवासी असावा.' },
      { en: 'Family annual income must not exceed ₹21,000 per annum (as per Tahsildar certificate).', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹२१,००० पेक्षा जास्त नसावे.' },
      { en: 'Age must be 18 to 65 years for widows/disabled; destitute persons with no source of income.', hi: 'वय १८ ते ६५ वर्षे (६५ वर्षांनंतर श्रावणबाळ योजनेत वर्ग).' },
      { en: 'For disabled applicants: Minimum 40% permanent physical disability certified by Civil Surgeon.', hi: 'दिव्यांगांसाठी जिल्हा शल्यचिकित्सकांचे किमान ४०% अपंगत्व प्रमाणपत्र आवश्यक.' },
    ],
    applicationDocuments: [
      { en: 'Age proof (School Leaving Certificate or Civil Surgeon Certificate)', hi: 'वयाचा दाखला (शाळा सोडल्याचा दाखला किंवा वैद्यकीय प्रमाणपत्र)' },
      { en: '15-Year Maharashtra Residence Certificate', hi: 'किमान १५ वर्षे महाराष्ट्रात वास्तव्याचा पुरावा' },
      { en: 'Tahsildar Income Certificate (<= ₹21,000/year)', hi: 'तहसीलदारांचा उत्पन्नाचा दाखला (वार्षिक २१,००० रु. आत)' },
      { en: 'Husband Death Certificate (for widows) or Civil Surgeon Disability Certificate (for Divyang)', hi: 'पतीचा मृत्यू दाखला (विधवांसाठी) किंवा दिव्यांगत्व प्रमाणपत्र' },
      { en: 'Aadhaar Card and Bank Account details', hi: 'आधार कार्ड व बँक पासबुक' },
    ],
    importantNotes: [
      { en: 'Applications are sanctioned by the Sanjay Gandhi Committee chaired by the local Tahsildar.', hi: 'तहसीलदार यांच्या अध्यक्षतेखालील संजय गांधी समितीद्वारे प्रस्तावाची छाननी व मंजुरी होते.' },
    ],
    sourceTitle: 'Revenue and Social Assistance Department, Govt of Maharashtra',
    sourceUrl: 'https://aaplesarkar.mahaonline.gov.in/',
    sourceQuote: '“Monthly financial assistance of Rs. 1,500 for destitute persons, widows and severely disabled individuals.”',
    registrationUrl: 'https://aaplesarkar.mahaonline.gov.in/en/Login/Register',
    registrationLabel: { en: 'Register on Aaple Sarkar', hi: 'आपले सरकार पोर्टलवर नोंदणी करा' },
    applicationUrl: 'https://aaplesarkar.mahaonline.gov.in/en/Login/Login',
    applicationLabel: { en: 'Apply via Aaple Sarkar Portal', hi: 'आपले सरकार पोर्टलवरून अर्ज करा' },
    guidelinesUrl: 'https://sjsa.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 21. Social Assistance - Shravanbal Seva Rajya Nivruttivetan Yojana
  {
    id: 'mh-shravanbal-pension',
    title: {
      en: 'Shravanbal Seva Rajya Nivruttivetan Yojana (Senior Citizen Pension Scheme)',
      hi: 'श्रावणबाळ सेवा राज्य निवृत्तीवेतन योजना (ज्येष्ठ नागरिक मासिक पेन्शन)',
    },
    shortTitle: { en: 'Shravanbal Pension Scheme', hi: 'श्रावणबाळ निवृत्तीवेतन योजना' },
    category: 'Pensions',
    portal: 'state',
    department: {
      en: 'Social Justice and Special Assistance Department, Govt of Maharashtra',
      hi: 'सामाजिक न्याय व विशेष सहाय्य विभाग, महाराष्ट्र शासन',
    },
    targetGroup: { en: 'Destitute elderly senior citizens aged 65 years and older residing in Maharashtra', hi: 'महाराष्ट्रातील ६५ वर्षे व त्याहून अधिक वयाचे निराधार ज्येष्ठ नागरिक' },
    casteCategories: ['ALL', 'OPEN', 'OBC', 'SC', 'ST'],
    summary: {
      en: 'Monthly pension of ₹1,500 per month for destitute senior citizens aged 65 and above residing in Maharashtra.',
      hi: 'महाराष्ट्रातील ६५ वर्षे किंवा अधिक वयाच्या निराधार वृद्ध नागरिकांना सन्मानपूर्वक जगण्यासाठी दरमहा ₹१,५०० निवृत्तीवेतन.',
    },
    benefit: {
      en: 'Monthly pension of ₹1,500 per month directly deposited into the senior citizen’s bank account.',
      hi: 'दरमहा ₹१,५०० ची पेन्शन थेट ज्येष्ठ नागरिकाच्या बँक खात्यात दर महिन्याला जमा केली जाते.',
    },
    rule: all(
      inField('mahadbtDomicile', 'yes'),
      inField('annualIncome', ['under-1.5']),
    ),
    eligibility: [
      { en: 'Applicant must be 65 years of age or older.', hi: 'अर्जदाराचे वय ६५ वर्षे किंवा त्याहून अधिक असावे.' },
      { en: 'Continuous residence in Maharashtra for at least 15 years.', hi: 'महाराष्ट्रात किमान १५ वर्षे सलग वास्तव्य असणारा रहिवासी असावा.' },
      { en: 'Category A: Family annual income not exceeding ₹21,000 per year (State Scheme).', hi: 'गट अ: वार्षिक कौटुंबिक उत्पन्न ₹२१,००० पेक्षा जास्त नसावे.' },
      { en: 'Category B: Listed in Government of India Below Poverty Line (BPL) family register.', hi: 'गट ब: केंद्र शासनाच्या दारिद्र्यरेषेखालील (BPL) यादीत नाव असणे आवश्यक.' },
    ],
    applicationDocuments: [
      { en: 'Age proof showing 65+ years (Birth Certificate, Voter ID, or Medical Board Certificate)', hi: 'वयाचा पुरावा (६५+ वर्षे दर्शवणारा दाखला / मतदान कार्ड)' },
      { en: '15-Year Maharashtra Residence Domicile Proof', hi: 'किमान १५ वर्षे महाराष्ट्रात वास्तव्याचा पुरावा' },
      { en: 'Tahsildar Income Certificate (income <= ₹21,000/year) or BPL Certificate', hi: 'तहसीलदारांचा उत्पन्नाचा दाखला किंवा बीपीएल प्रमाणपत्र' },
      { en: 'Aadhaar Card and Bank Account Passbook', hi: 'आधार कार्ड व बँक पासबुक' },
    ],
    importantNotes: [
      { en: 'Applications are submitted online through Aaple Sarkar portal or physically at the local Taluka Tahsil office.', hi: 'आपले सरकार पोर्टलवरून ऑनलाईन किंवा स्थानिक तालुका तहसील कार्यालयात अर्ज करता येतो.' },
    ],
    sourceTitle: 'Social Justice Department Guidelines, Govt of Maharashtra',
    sourceUrl: 'https://aaplesarkar.mahaonline.gov.in/',
    sourceQuote: '“Monthly pension of Rs. 1,500 for senior citizens aged 65 and above in Maharashtra under Shravanbal Yojana.”',
    registrationUrl: 'https://aaplesarkar.mahaonline.gov.in/en/Login/Register',
    registrationLabel: { en: 'Register on Aaple Sarkar', hi: 'आपले सरकार पोर्टलवर नोंदणी करा' },
    applicationUrl: 'https://aaplesarkar.mahaonline.gov.in/en/Login/Login',
    applicationLabel: { en: 'Apply via Aaple Sarkar Portal', hi: 'आपले सरकार पोर्टलवरून अर्ज करा' },
    guidelinesUrl: 'https://sjsa.maharashtra.gov.in/',
    checkedAt: verifiedDate,
  },

  // 22. Central Scheme - PM-KISAN
  {
    id: 'pm-kisan',
    title: { en: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)', hi: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)' },
    shortTitle: { en: 'PM-KISAN', hi: 'पीएम-किसान' },
    category: 'Agriculture',
    portal: 'central',
    department: { en: 'Ministry of Agriculture & Farmers Welfare, Govt of India', hi: 'कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार' },
    targetGroup: { en: 'Landholder farmer families across India', hi: 'देशभरातील शेतजमीन धारक शेतकरी कुटुंबे' },
    casteCategories: ['ALL'],
    summary: { en: 'Central cash benefit of ₹6,000 per year transferred in three equal 4-monthly payments of ₹2,000 directly into the bank accounts of landholding farmer families.', hi: 'खेती योग्य भूमि वाले किसान परिवारों को ₹6,000 प्रति वर्ष की केंद्रीय नकद सहायता।' },
    benefit: { en: '₹6,000 per year in three 4-monthly installments of ₹2,000 directly to the bank account.', hi: '₹2,000 की तीन 4-मासिक किश्तों में ₹6,000 प्रति वर्ष सीधे बैंक खाते में।' },
    rule: all(
      inField('farmLand', 'yes'),
      inField('farmInstitutionalLand', 'no'),
      inField('farmExclusion', 'no'),
      inField('farmNri', 'no'),
    ),
    eligibility: [
      { en: 'The scheme covers farmer families who hold cultivable land recorded in their names in State/UT land records. Land size is not capped.', hi: 'यह योजना उन किसान परिवारों को शामिल करती है जिनके नाम राज्य/केंद्रशासित प्रदेश के भूमि रिकॉर्ड में खेती योग्य भूमि दर्ज है।' },
      { en: 'Beneficiaries must complete e-KYC and have an Aadhaar-seeded bank account.', hi: 'लाभार्थियों को ई-केवाईसी और आधार से जुड़ा बैंक खाता पूरा करना अनिवार्य है।' },
    ],
    applicationDocuments: [
      { en: 'Land ownership record (7/12 extract or state equivalent)', hi: 'जमीन मालकी हक्काचा दाखला (७/१२ उतारा)' },
      { en: 'Aadhaar card and Aadhaar-seeded bank account', hi: 'आधार कार्ड आणि आधार संलग्न बँक खाते' },
    ],
    importantNotes: [
      { en: 'Institutional landholders, income-tax payers, and constitutional officeholders are excluded.', hi: 'संस्थागत भूमि-धारक आणि आयकरदाते या योजनेतून वगळण्यात आले आहेत.' },
    ],
    sourceTitle: 'Ministry of Agriculture & Farmers Welfare, PM-KISAN Operational Guidelines',
    sourceUrl: 'https://pmkisan.gov.in/Documents/OperationalGuidelines.pdf',
    sourceQuote: '“Rs. 6,000/- per year in three 4-monthly installments of Rs. 2,000/- each” for landholder farmer families.',
    registrationUrl: 'https://pmkisan.gov.in/RegistrationFormNew.aspx',
    registrationLabel: { en: 'New Farmer Registration on PM-KISAN', hi: 'पीएम-किसानवर नवीन शेतकरी नोंदणी करा' },
    applicationUrl: 'https://pmkisan.gov.in/',
    applicationLabel: { en: 'Open Official PM-KISAN Portal', hi: 'अधिकृत पीएम-किसान पोर्टल उघडा' },
    checkedAt: verifiedDate,
  },

  // 23. Central Scheme - PMUY
  {
    id: 'pmuy',
    title: { en: 'Pradhan Mantri Ujjwala Yojana (PMUY / Ujjwala 2.0)', hi: 'प्रधानमंत्री उज्ज्वला योजना (पीएमयूवाई / उज्ज्वला 2.0)' },
    shortTitle: { en: 'PMUY', hi: 'पीएमयूवाई' },
    category: 'Energy & cooking',
    portal: 'central',
    department: { en: 'Ministry of Petroleum & Natural Gas, Govt of India', hi: 'पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय, भारत सरकार' },
    targetGroup: { en: 'Adult women in poor households lacking LPG', hi: 'गरीब कुटुंबातील वयस्क महिला' },
    casteCategories: ['ALL', 'SC', 'ST', 'OBC', 'OPEN'],
    summary: { en: 'A deposit-free LPG connection with first refill and stove provided to an adult woman in an eligible poor household.', hi: 'पात्र गरीब कुटुंबातील प्रौढ महिलेला मोफत एलपीजी गॅस जोडणी, पहिला सिलिंडर व शेगडी.' },
    benefit: { en: 'Deposit-free LPG connection, full security deposit waiver, plus first refill cylinder and stove provided at zero cost.', hi: 'सुरक्षा ठेव माफीसह मोफत एलपीजी कनेक्शन, पहिला भरलेला सिलिंडर आणि गॅस शेगडी.' },
    rule: all(
      inField('adultWoman', 'yes'),
      inField('householdLpg', 'no'),
      inField('poorHousehold', 'yes'),
    ),
    eligibility: [
      { en: 'Applicant must be an adult woman aged 18 or older.', hi: 'आवेदक महिला 18 वर्ष या उससे अधिक उम्र की वयस्क हो।' },
      { en: 'No existing LPG connection in the same household.', hi: 'घरातील कोणत्याही सदस्याच्या नावावर आधीपासून एलपीजी कनेक्शन नसावे.' },
    ],
    applicationDocuments: [
      { en: 'Aadhaar of applicant and adult family members', hi: 'अर्जदार महिला व कुटुंबातील सदस्यांचे आधार कार्ड' },
      { en: 'Ration card showing family composition', hi: 'कुटुंबाची रचना दर्शवणारे रेशन कार्ड' },
      { en: 'Bank account passbook', hi: 'बँक खाते पासबुक' },
    ],
    importantNotes: [
      { en: 'Apply through local authorized Indane, Bharat Gas, or HP Gas distributorships or online.', hi: 'अधिकृत एलपीजी वितरकाकडे किंवा ऑनलाईन अर्ज करा.' },
    ],
    sourceTitle: 'Ministry of Petroleum and Natural Gas, Ujjwala 2.0 Guidelines',
    sourceUrl: 'https://www.pmuy.gov.in/files/PMUY2-Scheme-Guidelines.pdf',
    sourceQuote: '“Deposit-free LPG connection to adult women from poor households.”',
    registrationUrl: 'https://www.pmuy.gov.in/ujjwala2.html',
    registrationLabel: { en: 'Apply for Ujjwala 2.0 Online', hi: 'उज्ज्वला 2.0 साठी ऑनलाईन अर्ज करा' },
    applicationUrl: 'https://www.pmuy.gov.in/',
    applicationLabel: { en: 'Open Official PMUY Portal', hi: 'अधिकृत पीएमयूवाई पोर्टल उघडा' },
    checkedAt: verifiedDate,
  },

  // 24. Central Scheme - PMMVY
  {
    id: 'pmmvy',
    title: { en: 'Pradhan Mantri Matru Vandana Yojana (PMMVY 2.0)', hi: 'प्रधानमंत्री मातृ वंदना योजना (पीएमएमवीवाई 2.0)' },
    shortTitle: { en: 'PMMVY', hi: 'पीएमएमवीवाई' },
    category: 'Maternity',
    portal: 'central',
    department: { en: 'Ministry of Women and Child Development, Govt of India', hi: 'महिला एवं बाल विकास मंत्रालय, भारत सरकार' },
    targetGroup: { en: 'Pregnant women & lactating mothers', hi: 'गर्भवती महिला व स्तनदा माता' },
    casteCategories: ['ALL'],
    summary: { en: 'Maternity cash incentive of ₹5,000 for the first child and ₹6,000 for a second girl child directly deposited into bank accounts.', hi: 'पहिल्या मुलासाठी ₹5,000 आणि दुसऱ्या मुलीच्या जन्मावर ₹6,000 थेट बँक खात्यात.' },
    benefit: { en: '₹5,000 in two installments for 1st child; ₹6,000 in a single installment for 2nd girl child.', hi: 'पहिल्या अपत्यासाठी ₹५,००० (दोन हप्ते) आणि दुसरी मुलगी असल्यास ₹६,००० चा एकरकमी हप्ता.' },
    rule: all(
      inField('maternityRelevant', ['pregnant', 'recent-birth']),
      inField('maternityAge', 'eligible'),
      any(
        inField('maternityChild', 'first'),
        inField('maternityChild', 'second-girl'),
      ),
      any(
        inField('maternityQualifyingGroup', 'yes'),
        inField('maternityIncome', 'under-8'),
      ),
    ),
    eligibility: [
      { en: 'Applicable for 1st living child and 2nd living child only if the child is female.', hi: 'पहिल्या जिवंत अपत्यासाठी आणि दुसरे अपत्य मुलगी असल्यास लागू.' },
      { en: 'Mother must be aged 18 years 7 months to under 55 at childbirth.', hi: 'प्रसूतीच्या वेळी आईचे वय १८ वर्षे ७ महिने ते ५५ वर्षांच्या आत असावे.' },
    ],
    applicationDocuments: [
      { en: 'Mother and father Aadhaar cards, MCP card (Mother Child Protection card)', hi: 'माता व पित्याचे आधार कार्ड, आरसीएच/एमसीपी कार्ड' },
      { en: 'Child Birth Registration Certificate', hi: 'बालकाचा जन्म नोंदणी दाखला' },
    ],
    importantNotes: [
      { en: 'Apply through nearest Anganwadi Centre or PMMVY citizen login portal.', hi: 'जवळच्या अंगणवाडी केंद्रात किंवा ऑनलाईन पोर्टलवर नोंदणी करा.' },
    ],
    sourceTitle: 'Ministry of Women and Child Development, Mission Shakti PMMVY Guidelines',
    sourceUrl: 'https://pmmvy.wcd.gov.in/',
    sourceQuote: '“Rs. 5,000 for first child and Rs. 6,000 for second girl child transferred to mother’s Aadhaar-linked account.”',
    registrationUrl: 'https://pmmvy.wcd.gov.in/',
    registrationLabel: { en: 'Citizen Registration on PMMVY', hi: 'पीएमएमवीवाई पोर्टलवर नोंदणी करा' },
    applicationUrl: 'https://pmmvy.wcd.gov.in/',
    applicationLabel: { en: 'Open PMMVY Portal', hi: 'अधिकृत पीएमएमवीवाई पोर्टल उघडा' },
    checkedAt: verifiedDate,
  },

  // 25. Central Scheme - Ayushman Vay Vandana
  {
    id: 'ayushman-vay-vandana',
    title: { en: 'Ayushman Vay Vandana Card (PM-JAY for Senior Citizens Aged 70+)', hi: 'आयुष्मान वय वंदना कार्ड (70+ ज्येष्ठ नागरिकांसाठी मोफत आरोग्य विमा)' },
    shortTitle: { en: 'Ayushman Vay Vandana', hi: 'आयुष्मान वय वंदना' },
    category: 'Health',
    portal: 'central',
    department: { en: 'National Health Authority (NHA), Ministry of Health, Govt of India', hi: 'राष्ट्रीय आरोग्य प्राधिकरण (NHA), भारत सरकार' },
    targetGroup: { en: 'All Senior Citizens aged 70 years and above', hi: 'देशातील सर्व ७० वर्षे व त्याहून अधिक वयाचे ज्येष्ठ नागरिक' },
    casteCategories: ['ALL'],
    summary: { en: 'Universal health cover of up to ₹5 lakh per year for all senior citizens aged 70 and above, regardless of income.', hi: 'उत्पन्नाची अट नसताना सर्व ७० वर्षे व त्याहून अधिक वयाच्या नागरिकांना वार्षिक ₹५ लाखांपर्यंत मोफत उपचार.' },
    benefit: { en: 'Free cashless secondary and tertiary hospitalization coverage up to ₹5 lakh per year per family for eligible seniors.', hi: 'मान्यताप्राप्त रुग्णालयांत दरवर्षी ₹५ लाखांपर्यंत मोफत व कॅशलेस उपचार.' },
    rule: inField('ageBand', ['70-79', '80-plus']),
    eligibility: [
      { en: 'Citizen must be aged 70 years or older based on Aadhaar.', hi: 'आधार कार्डानुसार वय ७० वर्षे किंवा त्याहून अधिक असणे आवश्यक.' },
      { en: 'No income criteria; open to all senior citizens regardless of economic status.', hi: 'उत्पन्नाची कोणतीही मर्यादा नाही; सर्व आर्थिक स्तरांतील ज्येष्ठ नागरिकांना लागू.' },
    ],
    applicationDocuments: [
      { en: 'Aadhaar Card with correct date of birth and linked mobile number', hi: 'आधार कार्ड (जन्मतारीख नोंद असलेले व मोबाईलशी लिंक)' },
    ],
    importantNotes: [
      { en: 'Apply via Ayushman Bharat PMJAY mobile app or beneficiary.nha.gov.in portal.', hi: 'आयुष्मान ॲप किंवा beneficiary.nha.gov.in वरून थेट कार्ड डाऊनलोड करता येते.' },
    ],
    sourceTitle: 'National Health Authority, Ayushman Vay Vandana Guidelines',
    sourceUrl: 'https://beneficiary.nha.gov.in/',
    sourceQuote: '“Free health insurance of up to Rs. 5 lakh for all senior citizens aged 70 years and above.”',
    registrationUrl: 'https://beneficiary.nha.gov.in/',
    registrationLabel: { en: 'Register / Create Vay Vandana Card', hi: 'वय वंदना कार्ड तयार करा' },
    applicationUrl: 'https://beneficiary.nha.gov.in/',
    applicationLabel: { en: 'Open NHA Beneficiary Portal', hi: 'एनएचए लाभार्थी पोर्टल उघडा' },
    checkedAt: verifiedDate,
  },

  // 26. Central Scheme - PMAY-U 2.0
  {
    id: 'pmay-u-2',
    title: { en: 'Pradhan Mantri Awas Yojana - Urban 2.0 (PMAY-U 2.0)', hi: 'प्रधानमंत्री आवास योजना - शहरी 2.0 (पीएमएवाई-यू 2.0)' },
    shortTitle: { en: 'PMAY-U 2.0', hi: 'पीएमएवाई-यू 2.0' },
    category: 'Housing',
    portal: 'central',
    department: { en: 'Ministry of Housing and Urban Affairs, Govt of India', hi: 'आवासन एवं शहरी कार्य मंत्रालय, भारत सरकार' },
    targetGroup: { en: 'Urban families lacking a pucca house', hi: 'शहरी भागातील बेघर व कच्चे घर असलेले कुटुंबीय' },
    casteCategories: ['ALL'],
    summary: { en: 'Financial assistance and interest subsidies for urban families in EWS, LIG, and MIG categories to acquire or construct a pucca house.', hi: 'शहरी भागातील EWS, LIG आणि MIG कुटुंबांसाठी पक्के घर बांधण्यासाठी किंवा खरेदीसाठी शासकीय अनुदान व व्याज सवलत.' },
    benefit: { en: 'Up to ₹2.5 Lakh subsidy for house construction or interest subsidy of 4% on home loans up to ₹25 lakh for EWS/LIG/MIG.', hi: 'घर बांधकामासाठी ₹२.५ लाखांपर्यंत अनुदान किंवा गृहकर्जावर ४% व्याज अनुदान.' },
    rule: all(
      inField('residenceType', 'urban'),
      inField('ownsPuccaHouse', 'no'),
      inField('housingBenefit20Years', 'no'),
      inField('pmayIncome', ['up-to-3', '3-to-6', '6-to-9']),
    ),
    eligibility: [
      { en: 'Household must reside in an urban area and not own a pucca house anywhere in India.', hi: 'कुटुंब शहरी भागात राहणारे असावे आणि भारतात कुठेही स्वतःचे पक्के घर नसावे.' },
      { en: 'Must not have availed any central/state housing assistance in the last 20 years.', hi: 'गेल्या २० वर्षांत सरकारी घरकुल योजनेचा लाभ घेतलेला नसावा.' },
    ],
    applicationDocuments: [
      { en: 'Aadhaar of all family members, bank passbook, urban residence proof', hi: 'कुटुंबातील सदस्यांचे आधार कार्ड, बँक पासबुक, शहरी वास्तव्याचा पुरावा' },
      { en: 'Income Certificate / Self declaration for EWS/LIG/MIG', hi: 'उत्पन्नाचा दाखला' },
    ],
    importantNotes: [
      { en: 'Apply via pmay-urban.gov.in or through local municipal corporation/council.', hi: 'स्थानिक महानगरपालिका किंवा अधिकृत पीएमएवाई पोर्टलवरून अर्ज करा.' },
    ],
    sourceTitle: 'Ministry of Housing and Urban Affairs, PMAY-U 2.0 Scheme Guidelines',
    sourceUrl: 'https://pmay-urban.gov.in/',
    sourceQuote: '“Assistance for eligible urban families in EWS, LIG and MIG bands without a pucca house in India.”',
    registrationUrl: 'https://pmay-urban.gov.in/',
    registrationLabel: { en: 'Apply on PMAY-U 2.0 Portal', hi: 'पीएमएवाई-यू 2.0 पोर्टलवर अर्ज करा' },
    applicationUrl: 'https://pmay-urban.gov.in/',
    applicationLabel: { en: 'Open PMAY-U Portal', hi: 'अधिकृत पीएमएवाई पोर्टल उघडा' },
    checkedAt: verifiedDate,
  },

  // 27. Central Scheme - CSSS
  {
    id: 'csss',
    title: { en: 'Central Sector Scheme of Scholarship for College and University Students (CSSS)', hi: 'कॉलेज आणि विद्यापीठ विद्यार्थ्यांसाठी केंद्रीय शिष्यवृत्ती योजना (CSSS)' },
    shortTitle: { en: 'CSSS (NSP)', hi: 'CSSS (NSP पोर्टल)' },
    category: 'Education',
    portal: 'central',
    department: { en: 'Department of Higher Education, Ministry of Education, Govt of India', hi: 'उच्च शिक्षण विभाग, शिक्षण मंत्रालय, भारत सरकार' },
    targetGroup: { en: 'Meritorious students above 80th percentile in Class 12 pursuing degree courses', hi: '१२ वी मध्ये ८० व्या पर्सेंटाइलपेक्षा जास्त गुण मिळवून नियमित पदवी घेणारे विद्यार्थी' },
    casteCategories: ['ALL'],
    summary: { en: 'Merit-cum-means scholarship of ₹12,000 to ₹20,000 per year awarded via National Scholarship Portal for regular degree students.', hi: 'नियमित पदवी अभ्यासक्रमांसाठी वार्षिक ₹१२,००० ते ₹२०,००० राष्ट्रीय शिष्यवृत्ती (NSP).' },
    benefit: { en: '₹12,000/year for undergraduate first 3 years and ₹20,000/year for postgraduate studies.', hi: 'पदवीच्या पहिल्या ३ वर्षांसाठी ₹१२,००० प्रति वर्ष आणि पदव्युत्तर शिक्षणासाठी ₹२०,००० प्रति वर्ष.' },
    rule: all(
      inField('studentCourse', 'regular-degree'),
      inField('studentMerit', 'yes'),
      inField('recognizedInstitution', 'yes'),
      inField('otherScholarship', 'no'),
      inField('scholarshipIncome', 'up-to-4.5'),
      any(
        inField('scholarshipStage', 'fresh'),
        all(inField('scholarshipStage', 'renewal'), inField('renewalConditions', 'yes')),
      ),
    ),
    eligibility: [
      { en: 'Student must be above the 80th percentile of successful candidates in Class XII board examination.', hi: 'इयत्ता १२ वी मध्ये संबंधित बोर्डाच्या ८० व्या पर्सेंटाइलपेक्षा जास्त गुण मिळालेले असावेत.' },
      { en: 'Enrolled in a regular degree course (not diploma or distance mode).', hi: 'मान्यताप्राप्त संस्थेत नियमित पदवी अभ्यासक्रमात प्रवेश.' },
      { en: 'Gross family income must not exceed ₹4.5 Lakh per year.', hi: 'कुटुंबाचे वार्षिक उत्पन्न ₹४.५ लाखांपर्यंत असावे.' },
    ],
    applicationDocuments: [
      { en: 'Class 12th Marksheet, Income Certificate from competent authority, Domicile certificate', hi: '१२ वी ची गुणपत्रिका, तहसीलदारांचा उत्पन्नाचा दाखला' },
      { en: 'College bonafide and Aadhaar-seeded bank account', hi: 'कॉलेज बोनाफाईड व बँक पासबुक' },
    ],
    importantNotes: [
      { en: 'Apply exclusively online through National Scholarship Portal (NSP).', hi: 'फक्त राष्ट्रीय शिष्यवृत्ती पोर्टल (NSP) द्वारेच अर्ज स्वीकारले जातात.' },
    ],
    sourceTitle: 'Department of Higher Education, CSSS Scheme Guidelines',
    sourceUrl: 'https://scholarships.gov.in/public/schemeGuidelines/Guidelines_DOHE_CSSS.pdf',
    sourceQuote: '“Students above 80th percentile of successful candidates in Class XII with family income up to Rs. 4.5 lakh.”',
    registrationUrl: 'https://scholarships.gov.in/',
    registrationLabel: { en: 'Register on National Scholarship Portal (NSP)', hi: 'राष्ट्रीय शिष्यवृत्ती पोर्टलवर (NSP) नोंदणी करा' },
    applicationUrl: 'https://scholarships.gov.in/',
    applicationLabel: { en: 'Login to NSP Portal', hi: 'NSP पोर्टल लॉगिन करा' },
    checkedAt: verifiedDate,
  },

  // 28. Central Scheme - NSAP Pensions
  {
    id: 'nsap-pensions',
    title: { en: 'National Social Assistance Programme (NSAP) Pensions', hi: 'राष्ट्रीय सामाजिक सहायता कार्यक्रम (NSAP) पेन्शन' },
    shortTitle: { en: 'NSAP Pensions', hi: 'NSAP पेन्शन' },
    category: 'Pensions',
    portal: 'central',
    department: { en: 'Ministry of Rural Development, Govt of India', hi: 'ग्रामीण विकास मंत्रालय, भारत सरकार' },
    targetGroup: { en: 'BPL senior citizens, widows, and persons with severe disabilities', hi: 'दारिद्र्यरेषेखालील (BPL) वृद्ध, विधवा व दिव्यांग नागरिक' },
    casteCategories: ['ALL'],
    summary: { en: 'Central monthly pension assistance for older adults (IGNOAPS), widows (IGNWPS) and people with severe disabilities (IGNDPS) in BPL households.', hi: 'BPL कुटुंबातील वृद्ध, विधवा आणि गंभीर दिव्यांग व्यक्तींसाठी केंद्रीय पेन्शन सहाय्य.' },
    benefit: { en: 'Central monthly pension of ₹200 to ₹500/month, supplemented by state top-ups.', hi: 'दरमहा केंद्रीय पेन्शन सहाय्य, ज्यामध्ये राज्य सरकार अतिरिक्त निधी जोडून वाटप करते.' },
    rule: any(
      all(inField('bplHousehold', 'yes'), inField('ageBand', ['60-69', '70-79', '80-plus'])),
      all(inField('bplHousehold', 'yes'), inField('widowed', 'yes'), inField('ageBand', ['40-59', '60-69', '70-79', '80-plus'])),
      all(inField('bplHousehold', 'yes'), inField('severeDisability', 'yes'), inField('ageBand', ['18-39', '40-59', '60-69', '70-79'])),
    ),
    eligibility: [
      { en: 'Applicant must belong to a Below Poverty Line (BPL) household under central criteria.', hi: 'कुटुंब केंद्र सरकारच्या निकषांनुसार दारिद्र्यरेषेखालील (BPL) असणे आवश्यक.' },
      { en: 'Old-age pension at age 60+; Widow pension at age 40+; Disability pension with 80%+ disability.', hi: 'वृद्धावस्था पेन्शन ६०+ वर्षे; विधवा पेन्शन ४०+ वर्षे; दिव्यांग पेन्शन ८०%+ अपंगत्वासाठी.' },
    ],
    applicationDocuments: [
      { en: 'BPL Ration Card / proof of inclusion in BPL list', hi: 'बीपीएल रेशन कार्ड / दारिद्र्यरेषेखालील यादीतील नाव' },
      { en: 'Aadhaar Card, age proof, bank account passbook', hi: 'आधार कार्ड, वयाचा दाखला व बँक पासबुक' },
    ],
    importantNotes: [
      { en: 'In Maharashtra, NSAP is integrated with Sanjay Gandhi Niradhar and Shravanbal pension schemes.', hi: 'महाराष्ट्रात NSAP योजना संजय गांधी निराधार व श्रावणबाळ योजनेशी संलग्न करून राबविली जाते.' },
    ],
    sourceTitle: 'Ministry of Rural Development, NSAP Guidelines',
    sourceUrl: 'https://nsap.nic.in/',
    sourceQuote: '“Monthly pension assistance to BPL households for old age, widows, and persons with severe disabilities.”',
    registrationUrl: 'https://nsap.nic.in/',
    registrationLabel: { en: 'Open NSAP Portal', hi: 'NSAP पोर्टल उघडा' },
    applicationUrl: 'https://nsap.nic.in/',
    applicationLabel: { en: 'NSAP Portal Login', hi: 'NSAP पोर्टल लॉगिन' },
    checkedAt: verifiedDate,
  },
];

export type Truth = true | false | 'unknown';

export function evaluate(rule: Rule, profile: Profile): Truth {
  if ('all_of' in rule) {
    const values = rule.all_of.map((item) => evaluate(item, profile));
    return values.includes(false) ? false : values.includes('unknown') ? 'unknown' : true;
  }
  if ('any_of' in rule) {
    const values = rule.any_of.map((item) => evaluate(item, profile));
    return values.includes(true) ? true : values.includes('unknown') ? 'unknown' : false;
  }
  if ('not' in rule) {
    const value = evaluate(rule.not, profile);
    return value === 'unknown' ? 'unknown' : !value;
  }
  const answer = profile[rule.field];
  if (answer === null || answer === undefined || answer === '') return 'unknown';
  const values = Array.isArray(rule.value) ? rule.value : [rule.value];
  return values.includes(answer);
}

export function unresolvedFields(rule: Rule, profile: Profile): Field[] {
  if ('all_of' in rule) {
    if (rule.all_of.some((item) => evaluate(item, profile) === false)) return [];
    return [...new Set(rule.all_of.flatMap((item) => evaluate(item, profile) === 'unknown' ? unresolvedFields(item, profile) : []))];
  }
  if ('any_of' in rule) {
    if (rule.any_of.some((item) => evaluate(item, profile) === true)) return [];
    return [...new Set(rule.any_of.flatMap((item) => evaluate(item, profile) === 'unknown' ? unresolvedFields(item, profile) : []))];
  }
  if ('not' in rule) return unresolvedFields(rule.not, profile);
  return profile[rule.field] === null ? [rule.field] : [];
}

export function getSchemeResult(scheme: Scheme, profile: Profile): Truth {
  const result = evaluate(scheme.rule, profile);
  return scheme.screeningOnly && result === true ? 'unknown' : result;
}
