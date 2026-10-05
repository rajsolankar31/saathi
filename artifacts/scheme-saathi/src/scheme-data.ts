export type Localized = { en: string; hi: string };
export type Answer = string | null;
export type Field =
  | 'category'
  | 'ageBand'
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
  checkedAt: string;
};

export type Choice = { value: string; label: Localized; description?: Localized };

export const verifiedDate = '2026-10-06';

export const supportAreas: { value: string; en: string; hi: string }[] = [
  { value: 'Agriculture', en: 'Farming and agriculture', hi: 'खेती और कृषि' },
  { value: 'Housing', en: 'Housing', hi: 'आवास' },
  { value: 'Health', en: 'Healthcare', hi: 'स्वास्थ्य सेवा' },
  { value: 'Energy & cooking', en: 'Clean cooking fuel', hi: 'स्वच्छ खाना पकाने का ईंधन' },
  { value: 'Maternity', en: 'Pregnancy and young children', hi: 'गर्भावस्था और छोटे बच्चे' },
  { value: 'Education', en: 'Education and scholarships', hi: 'शिक्षा और छात्रवृत्ति' },
  { value: 'Pensions', en: 'Pensions and social assistance', hi: 'पेंशन और सामाजिक सहायता' },
];

export const initialProfile: Profile = {
  category: null,
  ageBand: null,
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
  { value: 'yes', label: { en: 'Yes', hi: 'हाँ' } },
  { value: 'no', label: { en: 'No', hi: 'नहीं' } },
];

export const options: Partial<Record<Field, Choice[]>> = {
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
    { value: 'eligible', label: { en: 'At least 18 years 7 months and under 55 at childbirth', hi: 'बच्चे के जन्म के समय उम्र 18 वर्ष 7 महीने या अधिक और 55 वर्ष से कम थी' } },
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
    { value: '8-plus', label: { en: '₹8 lakh/year or more, or not using the income criterion', hi: '₹8 लाख/वर्ष या अधिक, या आय की श्रेणी लागू नहीं' } },
  ],
  pmayIncome: [
    { value: 'up-to-3', label: { en: 'Up to ₹3 lakh/year (EWS)', hi: '₹3 लाख/वर्ष तक (EWS)' } },
    { value: '3-to-6', label: { en: 'Above ₹3 lakh and up to ₹6 lakh/year (LIG)', hi: '₹3 लाख से अधिक और ₹6 लाख/वर्ष तक (LIG)' } },
    { value: '6-to-9', label: { en: 'Above ₹6 lakh and up to ₹9 lakh/year (MIG)', hi: '₹6 लाख से अधिक और ₹9 लाख/वर्ष तक (MIG)' } },
    { value: 'over-9', label: { en: 'Above ₹9 lakh/year', hi: '₹9 लाख/वर्ष से अधिक' } },
  ],
  ownsPuccaHouse: yesNoUnknown,
  housingBenefit20Years: yesNoUnknown,
  studentCourse: [
    { value: 'regular-degree', label: { en: 'Regular degree course', hi: 'नियमित डिग्री पाठ्यक्रम' } },
    { value: 'other', label: { en: 'Diploma, distance/correspondence, or not a degree course', hi: 'डिप्लोमा, दूरस्थ/पत्राचार या डिग्री पाठ्यक्रम नहीं' } },
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
  ageBand: { en: 'A broad range is enough; SchemeSaathi does not need your exact date of birth.', hi: 'उम्र का सामान्य दायरा काफी है; SchemeSaathi को आपकी जन्मतिथि नहीं चाहिए।' },
  residenceType: { en: 'PMAY-U 2.0 is for eligible households in urban areas. You do not need to share an address.', hi: 'पीएमएवाई-यू 2.0 शहरी क्षेत्रों के पात्र परिवारों के लिए है। पता साझा करने की ज़रूरत नहीं।' },
  farmLand: { en: 'PM-KISAN checks cultivable land recorded in a farmer-family member’s name; land size itself is not capped.', hi: 'पीएम-किसान में किसान परिवार के सदस्य के नाम दर्ज खेती योग्य भूमि देखी जाती है; भूमि के आकार की सीमा नहीं है।' },
  farmInstitutionalLand: { en: 'Institutional landholders are excluded from PM-KISAN.', hi: 'संस्थागत भूमि-धारक पीएम-किसान से बाहर हैं।' },
  farmExclusion: { en: 'Answer yes if any farmer-family member is a current/former constitutional officeholder, minister/MP/legislator, municipal mayor or district-panchayat chair; a covered government/PSU/autonomous/local-body employee (excluding MTS/Class IV/Group D); a retired pensioner receiving ₹10,000 or more monthly (with that same exclusion); an income-tax payer in the last assessment year; or a registered, practising doctor, engineer, lawyer, chartered accountant or architect.', hi: 'हाँ चुनें यदि किसान परिवार का कोई सदस्य वर्तमान/पूर्व संवैधानिक पदाधिकारी, मंत्री/सांसद/विधायक, नगर निगम महापौर या जिला पंचायत अध्यक्ष; शामिल सरकारी/PSU/स्वायत्त संस्था/स्थानीय निकाय का कर्मचारी (MTS/चतुर्थ श्रेणी/Group D को छोड़कर); ₹10,000 या अधिक मासिक पेंशन पाने वाला सेवानिवृत्त पेंशनभोगी; पिछले आकलन वर्ष में आयकरदाता; या पंजीकृत और व्यवसाय करने वाला डॉक्टर, इंजीनियर, वकील, चार्टर्ड अकाउंटेंट या आर्किटेक्ट है।' },
  farmNri: { en: 'The PM-KISAN operational guidelines list NRI farmer families among exclusions for new beneficiaries.', hi: 'पीएम-किसान के संचालन दिशानिर्देश नए लाभार्थियों के लिए NRI किसान परिवारों को अपवर्जन में रखते हैं।' },
  adultWoman: { en: 'PMUY is for an adult woman. Choose not sure if you prefer not to answer.', hi: 'पीएमयूवाई वयस्क महिला के लिए है। जवाब न देना चाहें तो “पता नहीं” चुनें।' },
  householdLpg: { en: 'The household must not already have an LPG connection registered to any family member listed in its family-composition document.', hi: 'परिवार की संरचना वाले दस्तावेज़ में दर्ज किसी सदस्य के नाम पहले से LPG कनेक्शन नहीं होना चाहिए।' },
  poorHousehold: { en: 'PMUY uses the applicant’s prescribed deprivation declaration to establish poor-household status.', hi: 'पीएमयूवाई गरीब परिवार की स्थिति के लिए आवेदक की निर्धारित वंचना-घोषणा का उपयोग करता है।' },
  maternityRelevant: { en: 'Registration is allowed during pregnancy or up to 270 days after childbirth, subject to the other requirements.', hi: 'अन्य शर्तें पूरी होने पर गर्भावस्था के दौरान या बच्चे के जन्म के 270 दिनों तक पंजीकरण किया जा सकता है।' },
  maternityAge: { en: 'The official age range is 18 years 7 months to under 55 at the time of childbirth.', hi: 'आधिकारिक उम्र-सीमा बच्चे के जन्म के समय 18 वर्ष 7 महीने से 55 वर्ष से कम है।' },
  maternityChild: { en: 'PMMVY 2.0 covers the first living child and the second living child only if the second child is a girl.', hi: 'पीएमएमवीवाई 2.0 में पहला जीवित बच्चा और दूसरा जीवित बच्चा केवल लड़की होने पर शामिल है।' },
  maternityQualifyingGroup: { en: 'At least one of the listed social/economic eligibility groups must apply. The full list appears in the scheme details.', hi: 'सूचीबद्ध सामाजिक/आर्थिक पात्रता श्रेणियों में से कम-से-कम एक लागू होनी चाहिए। पूरी सूची योजना विवरण में है।' },
  maternityIncome: { en: 'One qualifying route is net family income below ₹8 lakh/year; other routes are also listed in the details.', hi: 'एक पात्रता मार्ग परिवार की ₹8 लाख/वर्ष से कम शुद्ध आय है; अन्य मार्ग विवरण में दिए हैं।' },
  pmayIncome: { en: 'Use the official annual household-income category. PMAY-U 2.0 uses EWS (up to ₹3 lakh), LIG (up to ₹6 lakh) and MIG (up to ₹9 lakh) bands.', hi: 'आधिकारिक सालाना घरेलू-आय श्रेणी चुनें। पीएमएवाई-यू 2.0 में EWS (₹3 लाख तक), LIG (₹6 लाख तक) और MIG (₹9 लाख तक) सीमाएँ हैं।' },
  ownsPuccaHouse: { en: 'The common PMAY-U 2.0 rule is that no family member owns a pucca house anywhere in India.', hi: 'पीएमएवाई-यू 2.0 की सामान्य शर्त है कि परिवार के किसी सदस्य के नाम भारत में कहीं भी पक्का घर न हो।' },
  housingBenefit20Years: { en: 'The 20-year look-back applies to allotments under Central, State/UT or Local Self Government housing schemes, in urban or rural areas.', hi: 'पिछले 20 वर्षों की जाँच शहरी या ग्रामीण क्षेत्र में केंद्र, राज्य/केंद्रशासित प्रदेश या स्थानीय सरकार की आवास योजना से मिले घर पर लागू होती है।' },
  studentCourse: { en: 'The CSSS guideline excludes diploma, correspondence and distance-mode courses.', hi: 'CSSS दिशानिर्देश डिप्लोमा, पत्राचार और दूरस्थ पाठ्यक्रमों को बाहर रखते हैं।' },
  studentMerit: { en: 'The student must be above the 80th percentile of successful Class XII candidates in the relevant stream and board.', hi: 'छात्र को संबंधित स्ट्रीम और बोर्ड के सफल कक्षा 12 विद्यार्थियों के 80वें प्रतिशतक से ऊपर होना चाहिए।' },
  recognizedInstitution: { en: 'The course/institution must meet AICTE or the relevant regulatory body’s recognition rules.', hi: 'पाठ्यक्रम/संस्थान को AICTE या संबंधित नियामक संस्था की मान्यता-शर्तें पूरी करनी चाहिए।' },
  otherScholarship: { en: 'The guideline excludes students receiving another scholarship, State scholarship, fee waiver or reimbursement scheme.', hi: 'दिशानिर्देश अन्य छात्रवृत्ति, राज्य छात्रवृत्ति, फीस माफी या प्रतिपूर्ति योजना पाने वाले छात्रों को बाहर रखते हैं।' },
  scholarshipIncome: { en: 'The fresh-applicant limit is gross parental/family income up to ₹4.5 lakh/year. An income certificate is required for fresh applicants.', hi: 'नए आवेदक के लिए माता-पिता/परिवार की सकल आय ₹4.5 लाख/वर्ष तक होनी चाहिए। नए आवेदक के लिए आय प्रमाणपत्र चाहिए।' },
  scholarshipStage: { en: 'Renewal also has annual marks, attendance and conduct conditions.', hi: 'नवीनीकरण में हर साल अंक, उपस्थिति और आचरण की शर्तें भी हैं।' },
  renewalConditions: { en: 'Renewal requires at least 50% marks in the annual exam, at least 75% attendance, and no disqualifying disciplinary/criminal or ragging finding.', hi: 'नवीनीकरण के लिए वार्षिक परीक्षा में कम-से-कम 50% अंक, कम-से-कम 75% उपस्थिति और अयोग्य करने वाली अनुशासनात्मक/आपराधिक या रैगिंग संबंधी कार्रवाई नहीं होनी चाहिए।' },
  bplHousehold: { en: 'NSAP pension eligibility is tied to a household identified as Below Poverty Line under Government of India criteria; State/UT verification and beneficiary ceilings also apply.', hi: 'NSAP पेंशन के लिए परिवार का भारत सरकार के मानदंडों के अनुसार गरीबी रेखा से नीचे (BPL) पहचाना जाना ज़रूरी है; राज्य/केंद्रशासित प्रदेश की जाँच और लाभार्थी सीमा भी लागू है।' },
  widowed: { en: 'The central widow pension route is for widows aged 40 or above from BPL households.', hi: 'केंद्रीय विधवा पेंशन का मार्ग BPL परिवारों की 40 वर्ष या अधिक उम्र की विधवाओं के लिए है।' },
  severeDisability: { en: 'The disability pension route is for people with severe or multiple disabilities in the specified age range from BPL households; the State/UT confirms the disability certificate/threshold.', hi: 'दिव्यांगता पेंशन का मार्ग निर्धारित उम्र-सीमा में गंभीर या बहु-दिव्यांगता वाले BPL परिवारों के लोगों के लिए है; प्रमाणपत्र/सीमा की पुष्टि राज्य/केंद्रशासित प्रदेश करता है।' },
};

const inField = (field: Field, value: string | string[]): Rule => ({ field, op: Array.isArray(value) ? 'in' : 'eq', value });
const all = (...all_of: Rule[]): Rule => ({ all_of });
const any = (...any_of: Rule[]): Rule => ({ any_of });
const not = (rule: Rule): Rule => ({ not: rule });

export const schemes: Scheme[] = [
  {
    id: 'pm-kisan',
    title: { en: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)', hi: 'प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)' },
    shortTitle: { en: 'PM-KISAN', hi: 'पीएम-किसान' },
    category: 'Agriculture',
    summary: { en: 'Income support for eligible landholding farmer families across India.', hi: 'भारत भर के पात्र भूमि-धारक किसान परिवारों के लिए आय सहायता।' },
    benefit: { en: '₹6,000 per year per eligible farmer family, paid in three instalments of ₹2,000.', hi: 'प्रति पात्र किसान परिवार ₹6,000 सालाना, ₹2,000 की तीन किस्तों में।' },
    rule: all(
      inField('farmLand', 'yes'),
      inField('farmInstitutionalLand', 'no'),
      inField('farmExclusion', 'no'),
      inField('farmNri', 'no'),
    ),
    eligibility: [
      { en: 'A farmer family must have cultivable landholding recorded in the name of a family member. The operational guideline defines the family as husband, wife and minor children and uses State/UT land records.', hi: 'किसान परिवार के किसी सदस्य के नाम खेती योग्य भूमि दर्ज होनी चाहिए। संचालन दिशानिर्देश परिवार को पति, पत्नी और नाबालिग बच्चों के रूप में परिभाषित करते हैं और राज्य/केंद्रशासित प्रदेश के भूमि रिकॉर्ड का उपयोग करते हैं।' },
      { en: 'There is no land-size ceiling: the revised FAQ says farmer families are covered irrespective of the size of their landholdings.', hi: 'भूमि के आकार की सीमा नहीं है: संशोधित FAQ के अनुसार भूमि का आकार कुछ भी हो, किसान परिवार शामिल हो सकते हैं।' },
      { en: 'Excluded: institutional landholders; current/former constitutional postholders; current/former ministers, MPs, State legislators, municipal-corporation mayors and district-panchayat chairpersons.', hi: 'अपवर्जित: संस्थागत भूमि-धारक; वर्तमान/पूर्व संवैधानिक पदाधिकारी; वर्तमान/पूर्व मंत्री, सांसद, राज्य विधायक, नगर निगम महापौर और जिला पंचायत अध्यक्ष।' },
      { en: 'Excluded: covered serving/retired Central or State government, PSU, attached/autonomous-office and regular local-body employees, except Multi Tasking Staff/Class IV/Group D employees.', hi: 'अपवर्जित: शामिल केंद्र/राज्य सरकार, PSU, संबद्ध/स्वायत्त कार्यालय और नियमित स्थानीय निकाय के कार्यरत/सेवानिवृत्त कर्मचारी; Multi Tasking Staff/चतुर्थ श्रेणी/Group D कर्मचारी अपवाद हैं।' },
      { en: 'Excluded: retired pensioners receiving ₹10,000 or more per month (with the guideline’s stated MTS/Class IV/Group D exception); anyone who paid income tax in the last assessment year; and registered professionals who actively practise as doctors, engineers, lawyers, chartered accountants or architects.', hi: 'अपवर्जित: ₹10,000 या अधिक मासिक पेंशन पाने वाले सेवानिवृत्त पेंशनभोगी (दिशानिर्देश के MTS/चतुर्थ श्रेणी/Group D अपवाद सहित); पिछले आकलन वर्ष में आयकर देने वाले; और पंजीकृत होकर सक्रिय रूप से काम करने वाले डॉक्टर, इंजीनियर, वकील, चार्टर्ड अकाउंटेंट या आर्किटेक्ट।' },
      { en: 'The operational guidelines also exclude NRI farmer families when new beneficiaries are added. Government verification of land records and the applicable cut-off/inheritance rules is still required.', hi: 'नए लाभार्थियों को जोड़ते समय संचालन दिशानिर्देश NRI किसान परिवारों को भी बाहर रखते हैं। भूमि रिकॉर्ड और लागू कट-ऑफ/उत्तराधिकार नियमों की सरकारी पुष्टि फिर भी ज़रूरी है।' },
    ],
    applicationDocuments: [
      { en: 'The official portal may require identity, bank-transfer and land-record details. Do not enter Aadhaar, bank numbers or documents in SchemeSaathi; provide them only through the official PM-KISAN process if required.', hi: 'आधिकारिक पोर्टल पहचान, बैंक हस्तांतरण और भूमि रिकॉर्ड का विवरण माँग सकता है। Aadhaar, बैंक नंबर या दस्तावेज़ SchemeSaathi में न दें; ज़रूरत होने पर केवल आधिकारिक पीएम-किसान प्रक्रिया में दें।' },
    ],
    importantNotes: [
      { en: 'The Department flags some post-1 February 2019 land acquisitions for verification; inheritance and other cases are assessed under current rules. Do not treat this date as an automatic rejection—confirm on the official portal.', hi: 'विभाग 1 फ़रवरी 2019 के बाद भूमि प्राप्ति के कुछ मामलों को जाँच के लिए चिह्नित करता है; उत्तराधिकार और अन्य मामलों का निर्णय मौजूदा नियमों से होता है। इस तारीख को अपने-आप अस्वीकृति न मानें—आधिकारिक पोर्टल पर पुष्टि करें।' },
      { en: 'This screening cannot verify land records, family definitions, exclusions or a State/UT’s implementation decision.', hi: 'यह जाँच भूमि रिकॉर्ड, परिवार की परिभाषा, अपवर्जन या राज्य/केंद्रशासित प्रदेश के निर्णय की पुष्टि नहीं कर सकती।' },
    ],
    sourceTitle: 'PM-KISAN Revised FAQ and Revised Operational Guidelines',
    sourceUrl: 'https://pmkisan.gov.in/PressRelease.aspx',
    sourceQuote: '“All landholding farmers’ families, which have cultivable landholding in their names are eligible to get benefit under the scheme.” “The ambit of the scheme has been extended to cover all farmer families, irrespective of the size of their land holdings.”',
    applicationUrl: 'https://pmkisan.gov.in/',
    applicationLabel: { en: 'Open PM-KISAN official portal', hi: 'पीएम-किसान का आधिकारिक पोर्टल खोलें' },
    checkedAt: verifiedDate,
  },
  {
    id: 'pmuy',
    title: { en: 'Pradhan Mantri Ujjwala Yojana (PMUY)', hi: 'प्रधानमंत्री उज्ज्वला योजना (पीएमयूवाई)' },
    shortTitle: { en: 'Ujjwala / PMUY', hi: 'उज्ज्वला / पीएमयूवाई' },
    category: 'Energy & cooking',
    summary: { en: 'A deposit-free LPG connection for eligible adult women from poor households.', hi: 'पात्र गरीब परिवारों की वयस्क महिलाओं के लिए जमा-राशि-मुक्त LPG कनेक्शन।' },
    benefit: { en: 'A security-deposit-free connection with no installation charge under the scheme; check the current official terms for any refill or stove support.', hi: 'योजना के तहत सुरक्षा-जमा-राशि-मुक्त कनेक्शन और कोई इंस्टॉलेशन शुल्क नहीं; रिफिल या चूल्हे की मौजूदा सहायता के लिए आधिकारिक शर्तें देखें।' },
    rule: all(
      inField('adultWoman', 'yes'),
      inField('poorHousehold', 'yes'),
      inField('householdLpg', 'no'),
    ),
    eligibility: [
      { en: 'The applicant must be an adult woman from a poor household and submit the prescribed deprivation declaration.', hi: 'आवेदक गरीब परिवार की वयस्क महिला हो और निर्धारित वंचना-घोषणा जमा करे।' },
      { en: 'No LPG connection may already be registered in the name of any family member listed in the family-composition document.', hi: 'परिवार की संरचना वाले दस्तावेज़ में दर्ज किसी भी सदस्य के नाम पहले से LPG कनेक्शन नहीं होना चाहिए।' },
      { en: 'The oil marketing company/distributor verifies the application and household declaration under current PMUY rules.', hi: 'तेल विपणन कंपनी/वितरक मौजूदा पीएमयूवाई नियमों के अनुसार आवेदन और परिवार की घोषणा की जाँच करता है।' },
    ],
    applicationDocuments: [
      { en: 'The official application process may request KYC, a family-composition/ration document, bank details and the prescribed declaration. Requirements can depend on the applicant’s circumstances; use the official FAQ before applying.', hi: 'आधिकारिक आवेदन में KYC, परिवार-संरचना/राशन दस्तावेज़, बैंक विवरण और निर्धारित घोषणा माँगी जा सकती है। परिस्थिति के अनुसार ज़रूरतें बदल सकती हैं; आवेदन से पहले आधिकारिक FAQ देखें।' },
      { en: 'Never enter identity or bank details in SchemeSaathi. Use the official portal, an LPG distributor, or an authorised CSC.', hi: 'SchemeSaathi में पहचान या बैंक विवरण कभी न दें। आधिकारिक पोर्टल, LPG वितरक या अधिकृत CSC का उपयोग करें।' },
    ],
    importantNotes: [
      { en: 'The official FAQ says self-submission online has no fee; an authorised CSC may charge its stated service fee. Confirm current amounts on the official site.', hi: 'आधिकारिक FAQ के अनुसार ऑनलाइन स्वयं आवेदन करने का शुल्क नहीं है; अधिकृत CSC अपनी घोषित सेवा-फीस ले सकता है। मौजूदा राशि आधिकारिक साइट पर जाँचें।' },
    ],
    sourceTitle: 'PMUY Official FAQ',
    sourceUrl: 'https://www.pmuy.gov.in/faq.html',
    sourceQuote: '“Adult woman from poor household Based on submission of a Deprivation declaration.” The household must not have “an existing LPG connection registered in the name of any family member listed in the family composition document.”',
    applicationUrl: 'https://www.pmuy.gov.in/',
    applicationLabel: { en: 'Apply / find an LPG distributor', hi: 'आवेदन करें / LPG वितरक खोजें' },
    checkedAt: verifiedDate,
  },
  {
    id: 'pmmvy',
    title: { en: 'Pradhan Mantri Matru Vandana Yojana (PMMVY 2.0)', hi: 'प्रधानमंत्री मातृ वंदना योजना (पीएमएमवीवाई 2.0)' },
    shortTitle: { en: 'PMMVY 2.0', hi: 'पीएमएमवीवाई 2.0' },
    category: 'Maternity',
    summary: { en: 'Maternity benefit for eligible women from specified socially or economically disadvantaged groups.', hi: 'निर्धारित सामाजिक या आर्थिक रूप से वंचित समूहों की पात्र महिलाओं के लिए मातृत्व सहायता।' },
    benefit: { en: '₹5,000 in two instalments for the first living child; ₹6,000 in one instalment for the second living child if the child is a girl, subject to the scheme milestones.', hi: 'पहले जीवित बच्चे के लिए दो किस्तों में ₹5,000; दूसरा जीवित बच्चा लड़की होने पर एक किस्त में ₹6,000—योजना के चरण पूरे करने पर।' },
    rule: all(
      inField('adultWoman', 'yes'),
      inField('maternityRelevant', ['pregnant', 'recent-birth']),
      inField('maternityAge', 'eligible'),
      inField('maternityChild', ['first', 'second-girl']),
      any(
        inField('maternityQualifyingGroup', 'yes'),
        all(inField('maternityQualifyingGroup', 'no'), inField('maternityIncome', 'under-8')),
      ),
    ),
    eligibility: [
      { en: 'The beneficiary must be a woman aged at least 18 years 7 months and under 55 at the time of childbirth.', hi: 'लाभार्थी की उम्र बच्चे के जन्म के समय कम-से-कम 18 वर्ष 7 महीने और 55 वर्ष से कम होनी चाहिए।' },
      { en: 'The benefit is for the first living child. From 1 April 2022, the second living child is covered only if the second child is a girl.', hi: 'लाभ पहले जीवित बच्चे के लिए है। 1 अप्रैल 2022 से दूसरा जीवित बच्चा केवल लड़की होने पर शामिल है।' },
      { en: 'At least one qualifying group must apply: Scheduled Caste or Scheduled Tribe; 40% or greater disability; BPL ration-card holder; PM-JAY beneficiary; e-Shram card holder; woman farmer receiving PM-KISAN; MGNREGA job-card holder; net family income below ₹8 lakh/year; pregnant/lactating Anganwadi Worker, Anganwadi Helper or ASHA; NFSA ration-card holder; or another category notified by the Central Government.', hi: 'कम-से-कम एक पात्र श्रेणी लागू होनी चाहिए: अनुसूचित जाति/जनजाति; 40% या अधिक दिव्यांगता; BPL राशन कार्ड; PM-JAY लाभार्थी; e-Shram कार्ड; पीएम-किसान पाने वाली महिला किसान; MGNREGA जॉब कार्ड; ₹8 लाख/वर्ष से कम शुद्ध पारिवारिक आय; गर्भवती/स्तनपान कराने वाली आंगनवाड़ी कार्यकर्ता, सहायिका या ASHA; NFSA राशन कार्ड; या केंद्र सरकार द्वारा अधिसूचित अन्य श्रेणी।' },
      { en: 'Registration is permitted during pregnancy and up to 270 days after childbirth, subject to the other eligibility and milestone rules.', hi: 'अन्य पात्रता और चरणों की शर्तों के अधीन, गर्भावस्था के दौरान और बच्चे के जन्म के 270 दिनों तक पंजीकरण किया जा सकता है।' },
      { en: 'For the first child, the official FAQ describes ₹3,000 after antenatal-care requirements and ₹2,000 after birth registration and completion of due immunisation through 14 weeks. For a second girl child, ₹6,000 is paid after birth registration and the first immunisation cycle through 14 weeks.', hi: 'पहले बच्चे के लिए आधिकारिक FAQ में प्रसवपूर्व जाँच की शर्तों के बाद ₹3,000 और जन्म पंजीकरण व 14 सप्ताह तक के टीकाकरण के बाद ₹2,000 बताए गए हैं। दूसरी लड़की के लिए जन्म पंजीकरण और 14 सप्ताह तक का पहला टीकाकरण चक्र पूरा होने के बाद ₹6,000 दिए जाते हैं।' },
    ],
    applicationDocuments: [
      { en: 'The Ministry FAQ lists Aadhaar, an Aadhaar-mapped bank/post-office account, mobile number, eligibility proof, MCP/RCHI card, LMP and ANC details, birth certificate and child immunisation details as documents/details that may be required.', hi: 'मंत्रालय FAQ में Aadhaar, Aadhaar से जुड़ा बैंक/डाकघर खाता, मोबाइल नंबर, पात्रता प्रमाण, MCP/RCHI कार्ड, LMP और ANC विवरण, जन्म प्रमाणपत्र और बच्चे के टीकाकरण का विवरण संभावित ज़रूरी दस्तावेज़/जानकारी में हैं।' },
      { en: 'SchemeSaathi does not collect these details. Provide them only through the official PMMVY process or an authorised frontline worker.', hi: 'SchemeSaathi यह जानकारी नहीं लेता। इन्हें केवल आधिकारिक पीएमएमवीवाई प्रक्रिया या अधिकृत मैदानी कार्यकर्ता को दें।' },
    ],
    importantNotes: [
      { en: 'The Ministry FAQ lists state-run alternatives in Odisha and Telangana. Confirm which programme is currently operating in your State/UT with the official portal or Anganwadi/ASHA worker.', hi: 'मंत्रालय FAQ ओडिशा और तेलंगाना में राज्य-चालित विकल्पों का उल्लेख करता है। अपने राज्य/केंद्रशासित प्रदेश में अभी कौन-सा कार्यक्रम चल रहा है, यह आधिकारिक पोर्टल या आंगनवाड़ी/ASHA कार्यकर्ता से जाँचें।' },
      { en: 'Some qualifying groups require proof, and benefits depend on verified maternal-care, birth-registration and immunisation milestones.', hi: 'कुछ पात्र श्रेणियों के लिए प्रमाण चाहिए; भुगतान सत्यापित मातृ-देखभाल, जन्म-पंजीकरण और टीकाकरण चरणों पर निर्भर है।' },
    ],
    sourceTitle: 'Ministry of Women and Child Development / SPNIWCD PMMVY FAQ',
    sourceUrl: 'https://www.spniwcd.wcd.gov.in/pradhan-mantri-matru-vandana-yojna/faqs',
    sourceQuote: '“The eligible age of beneficiary is between 18 years 7 months to 55 years at the time of child birth.” “A beneficiary is eligible to register in the PMMVY portal till 270 days from child birth.”',
    applicationUrl: 'https://pmmvy.wcd.gov.in/',
    applicationLabel: { en: 'Open PMMVY application portal', hi: 'पीएमएमवीवाई आवेदन पोर्टल खोलें' },
    checkedAt: verifiedDate,
  },
  {
    id: 'ayushman-vay-vandana',
    title: { en: 'Ayushman Vay Vandana (AB-PMJAY for people aged 70+)', hi: 'आयुष्मान वय वंदना (70+ के लिए AB-PMJAY)' },
    shortTitle: { en: 'Ayushman Vay Vandana', hi: 'आयुष्मान वय वंदना' },
    category: 'Health',
    summary: { en: 'Hospital health cover for Indian citizens aged 70 or older, regardless of income.', hi: 'आय की परवाह किए बिना 70 वर्ष या अधिक उम्र के भारतीय नागरिकों के लिए अस्पताल-आधारित स्वास्थ्य कवर।' },
    benefit: { en: 'Up to ₹5 lakh annual cover on a family basis. Seniors in an already PM-JAY-covered family get an additional top-up of up to ₹5 lakh per year for themselves.', hi: 'परिवार के आधार पर सालाना ₹5 लाख तक का कवर। पहले से PM-JAY परिवार में शामिल वरिष्ठ नागरिकों को अपने लिए सालाना ₹5 लाख तक का अतिरिक्त कवर मिलता है।' },
    rule: all(inField('ageBand', ['70-79', '80-plus'])),
    eligibility: [
      { en: 'Any Indian citizen aged 70 years or above is eligible, irrespective of income or socio-economic status.', hi: 'आय या सामाजिक-आर्थिक स्थिति की परवाह किए बिना 70 वर्ष या अधिक उम्र का कोई भी भारतीय नागरिक पात्र है।' },
      { en: 'The ₹5 lakh cover is on a family basis. If the family is already covered under AB-PMJAY, eligible senior citizens receive an additional top-up of up to ₹5 lakh per year for themselves.', hi: '₹5 लाख का कवर परिवार के आधार पर है। यदि परिवार पहले से AB-PMJAY में शामिल है, तो पात्र वरिष्ठ नागरिकों को अपने लिए सालाना ₹5 लाख तक का अतिरिक्त कवर मिलता है।' },
      { en: 'Seniors already covered by CGHS, ECHS or Ayushman CAPF must choose between their existing public scheme and AB-PMJAY. Private health insurance or ESIC coverage does not by itself exclude a senior citizen.', hi: 'CGHS, ECHS या Ayushman CAPF में पहले से शामिल वरिष्ठ नागरिकों को मौजूदा सार्वजनिक योजना और AB-PMJAY में से चुनना होगा। निजी स्वास्थ्य बीमा या ESIC अपने-आप वरिष्ठ नागरिक को बाहर नहीं करते।' },
    ],
    applicationDocuments: [
      { en: 'Enrolment is available through the official beneficiary portal and Ayushman app. The official FAQ says age verification is Aadhaar-based; carry the required identity document when using the official enrolment route.', hi: 'पंजीकरण आधिकारिक लाभार्थी पोर्टल और आयुष्मान ऐप से किया जा सकता है। आधिकारिक FAQ के अनुसार उम्र की जाँच Aadhaar के आधार पर होती है; आधिकारिक पंजीकरण के समय आवश्यक पहचान दस्तावेज़ साथ रखें।' },
      { en: 'Do not enter Aadhaar or identity numbers in SchemeSaathi.', hi: 'SchemeSaathi में Aadhaar या पहचान नंबर न डालें।' },
    ],
    importantNotes: [
      { en: 'Coverage is for eligible hospital treatment under the scheme and participating hospitals; it is not a cash payment. Confirm package and hospital details with the official portal.', hi: 'कवर योजना के अंतर्गत पात्र अस्पताल-उपचार और शामिल अस्पतालों के लिए है; यह नकद भुगतान नहीं है। पैकेज और अस्पताल की जानकारी आधिकारिक पोर्टल से जाँचें।' },
    ],
    sourceTitle: 'National Health Authority (NHA), Senior Citizen Benefits FAQ',
    sourceUrl: 'https://nha.gov.in/img/resources/English_FAQs_related_to_the_benefits_for_senior_citizens.pdf',
    sourceQuote: '“All senior citizens aged 70 or above, regardless of economic status, are eligible for free medical treatment up to ₹5 lakh under this scheme.”',
    applicationUrl: 'https://beneficiary.nha.gov.in/',
    applicationLabel: { en: 'Check or enrol on the NHA beneficiary portal', hi: 'NHA लाभार्थी पोर्टल पर जाँचें या पंजीकरण करें' },
    checkedAt: verifiedDate,
  },
  {
    id: 'pmay-u-2',
    title: { en: 'Pradhan Mantri Awas Yojana–Urban 2.0 (PMAY-U 2.0)', hi: 'प्रधानमंत्री आवास योजना–शहरी 2.0 (पीएमएवाई-यू 2.0)' },
    shortTitle: { en: 'PMAY-U 2.0', hi: 'पीएमएवाई-यू 2.0' },
    category: 'Housing',
    summary: { en: 'Housing assistance for eligible EWS, LIG and MIG households in urban areas through one of four programme pathways.', hi: 'चार कार्यक्रम मार्गों में से एक के माध्यम से शहरी क्षेत्रों के पात्र EWS, LIG और MIG परिवारों के लिए आवास सहायता।' },
    benefit: { en: 'Assistance depends on the selected pathway: construction, an approved affordable home, rental housing, or eligible home-loan interest subsidy.', hi: 'सहायता चुने गए मार्ग पर निर्भर है: निर्माण, स्वीकृत किफायती घर, किराये का आवास या पात्र गृह-ऋण ब्याज सब्सिडी।' },
    rule: all(
      inField('residenceType', 'urban'),
      inField('pmayIncome', ['up-to-3', '3-to-6', '6-to-9']),
      inField('ownsPuccaHouse', 'no'),
      inField('housingBenefit20Years', 'no'),
    ),
    screeningOnly: true,
    eligibility: [
      { en: 'The household must live in an urban area and fall within one of the annual household-income bands: EWS up to ₹3 lakh; LIG above ₹3 lakh and up to ₹6 lakh; MIG above ₹6 lakh and up to ₹9 lakh.', hi: 'परिवार शहरी क्षेत्र में रहता हो और सालाना घरेलू आय की किसी श्रेणी में आए: EWS ₹3 लाख तक; LIG ₹3 लाख से अधिक और ₹6 लाख तक; MIG ₹6 लाख से अधिक और ₹9 लाख तक।' },
      { en: 'No family member may own a pucca house anywhere in India.', hi: 'परिवार के किसी सदस्य के नाम भारत में कहीं भी पक्का घर नहीं होना चाहिए।' },
      { en: 'A family that was allotted a house under a Central Government, State/UT Government or Local Self Government housing scheme in the preceding 20 years—in an urban or rural area—is not eligible.', hi: 'पिछले 20 वर्षों में शहरी या ग्रामीण क्षेत्र में केंद्र सरकार, राज्य/केंद्रशासित प्रदेश सरकार या स्थानीय स्वशासन की आवास योजना के तहत घर आवंटित हुआ हो तो परिवार पात्र नहीं है।' },
      { en: 'A household can use only one PMAY-U 2.0 vertical. BLC is for EWS households constructing a new pucca house on their own available land; AHP is for EWS households purchasing in eligible affordable-housing projects; ARH is rental housing for eligible urban migrants/poor and other notified groups; ISS is for eligible EWS/LIG/MIG households using qualifying home loans.', hi: 'परिवार PMAY-U 2.0 के केवल एक मार्ग का उपयोग कर सकता है। BLC अपनी उपलब्ध भूमि पर नया पक्का घर बनाने वाले EWS परिवारों के लिए; AHP पात्र किफायती आवास परियोजनाओं में घर खरीदने वाले EWS परिवारों के लिए; ARH पात्र शहरी प्रवासियों/गरीबों और अधिसूचित समूहों के लिए किराये का आवास; ISS पात्र गृह-ऋण लेने वाले EWS/LIG/MIG परिवारों के लिए है।' },
      { en: 'The ISS path has additional loan/property limits under the guidelines, including a maximum ₹25 lakh loan, ₹35 lakh house value and 120 m² carpet area. BLC/AHP/ARH have their own project, land, beneficiary and unit conditions.', hi: 'ISS मार्ग में दिशानिर्देशों के अनुसार अतिरिक्त ऋण/संपत्ति सीमाएँ हैं—अधिकतम ₹25 लाख ऋण, ₹35 लाख घर का मूल्य और 120 m² कारपेट क्षेत्र। BLC/AHP/ARH में परियोजना, भूमि, लाभार्थी और यूनिट की अलग शर्तें हैं।' },
    ],
    applicationDocuments: [
      { en: 'The official portal’s eligibility/application flow may ask for Aadhaar authentication, an income certificate, years of residence in the town/city, house-ownership details and pathway-specific records.', hi: 'आधिकारिक पोर्टल की पात्रता/आवेदन प्रक्रिया में Aadhaar प्रमाणीकरण, आय प्रमाणपत्र, शहर/कस्बे में रहने के वर्षों, घर के स्वामित्व और मार्ग-विशिष्ट रिकॉर्ड की जानकारी माँगी जा सकती है।' },
      { en: 'Do not enter Aadhaar, address or documents in SchemeSaathi. Use only the official PMAY-U 2.0 portal for application.', hi: 'SchemeSaathi में Aadhaar, पता या दस्तावेज़ न दें। आवेदन के लिए केवल आधिकारिक PMAY-U 2.0 पोर्टल का उपयोग करें।' },
    ],
    importantNotes: [
      { en: 'This result checks only the shared eligibility conditions. It cannot confirm the extra rules, project availability, land, loan or unit requirements for a particular vertical; the official portal and Urban Local Body make the decision.', hi: 'यह नतीजा केवल साझा पात्रता शर्तें देखता है। यह किसी विशेष मार्ग की अतिरिक्त शर्तों, परियोजना उपलब्धता, भूमि, ऋण या यूनिट की पुष्टि नहीं करता; निर्णय आधिकारिक पोर्टल और शहरी स्थानीय निकाय करते हैं।' },
    ],
    sourceTitle: 'PMAY-U 2.0 Scheme Guidelines, Ministry of Housing and Urban Affairs',
    sourceUrl: 'https://pmay-urban.gov.in/pmay-u-2.0-guidelines',
    sourceQuote: '“Families belonging to EWS/LIG/MIG category, living in urban areas, having no pucca house anywhere in the country, are eligible to purchase or construct a house under PMAY-U 2.0.” A beneficiary allotted a house under a Central, State/UT or Local Self Government housing scheme “in last 20 years in urban or rural areas” is not eligible.',
    applicationUrl: 'https://pmaymis.gov.in/PMAYMIS2_2024/PMAY_SURVEY/EligiblityCheck.aspx',
    applicationLabel: { en: 'Check eligibility on the PMAY-U 2.0 portal', hi: 'PMAY-U 2.0 पोर्टल पर पात्रता जाँचें' },
    checkedAt: verifiedDate,
  },
  {
    id: 'csss',
    title: { en: 'Central Sector Scheme of Scholarship for College and University Students (CSSS)', hi: 'कॉलेज और विश्वविद्यालय छात्रों के लिए केंद्रीय क्षेत्र छात्रवृत्ति योजना (CSSS)' },
    shortTitle: { en: 'CSSS scholarship', hi: 'CSSS छात्रवृत्ति' },
    category: 'Education',
    summary: { en: 'Merit- and income-based scholarship for eligible students in regular college or university degree courses.', hi: 'नियमित कॉलेज या विश्वविद्यालय डिग्री पाठ्यक्रमों के पात्र विद्यार्थियों के लिए मेधा और आय आधारित छात्रवृत्ति।' },
    benefit: { en: 'Scholarship amounts and duration depend on the course and current Ministry guidelines; the National Scholarship Portal publishes the application window and selection list.', hi: 'छात्रवृत्ति की राशि और अवधि पाठ्यक्रम तथा मौजूदा मंत्रालय दिशानिर्देशों पर निर्भर है; आवेदन अवधि और चयन सूची राष्ट्रीय छात्रवृत्ति पोर्टल पर प्रकाशित होती है।' },
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
      { en: 'For a fresh award, the student must be above the 80th percentile of successful Class XII candidates in the relevant stream from the respective Board of Examination.', hi: 'नई छात्रवृत्ति के लिए छात्र संबंधित परीक्षा बोर्ड की कक्षा 12 की संबंधित स्ट्रीम के सफल विद्यार्थियों के 80वें प्रतिशतक से ऊपर हो।' },
      { en: 'The student must pursue a regular degree course—not a diploma, correspondence or distance-mode course—at an institution recognised by AICTE or the relevant regulatory body.', hi: 'छात्र AICTE या संबंधित नियामक संस्था से मान्यता प्राप्त संस्थान में नियमित डिग्री पाठ्यक्रम करे—डिप्लोमा, पत्राचार या दूरस्थ पाठ्यक्रम नहीं।' },
      { en: 'Gross parental/family income must be up to ₹4.5 lakh per year. The guideline requires an income certificate for fresh applicants.', hi: 'माता-पिता/परिवार की सकल आय ₹4.5 लाख प्रति वर्ष तक हो। दिशानिर्देश नए आवेदकों के लिए आय प्रमाणपत्र माँगते हैं।' },
      { en: 'The student must not receive another scholarship, including a State scholarship, fee waiver or reimbursement scheme.', hi: 'छात्र को दूसरी छात्रवृत्ति—राज्य छात्रवृत्ति, फीस माफी या प्रतिपूर्ति योजना सहित—नहीं मिलनी चाहिए।' },
      { en: 'For renewal each year, the student needs at least 50% marks in the annual examination and at least 75% attendance. Disqualifying indiscipline, criminal behaviour or ragging complaints can lead to forfeiture.', hi: 'हर वर्ष नवीनीकरण के लिए वार्षिक परीक्षा में कम-से-कम 50% अंक और कम-से-कम 75% उपस्थिति चाहिए। अयोग्य करने वाला अनुशासनहीनता, आपराधिक व्यवहार या रैगिंग संबंधी मामला छात्रवृत्ति समाप्त कर सकता है।' },
      { en: 'Applications are online through NSP and are verified by the institution and State Higher Education Department/State Nodal Agency. Selection is subject to available scheme slots and current NSP dates.', hi: 'आवेदन NSP के माध्यम से ऑनलाइन होता है और संस्थान तथा राज्य उच्च शिक्षा विभाग/राज्य नोडल एजेंसी द्वारा सत्यापित होता है। चयन उपलब्ध सीटों और NSP की मौजूदा तारीखों पर निर्भर है।' },
    ],
    applicationDocuments: [
      { en: 'For a fresh application, the guideline names an income certificate. The portal may request education, identity, bank and other verification records; follow the current NSP checklist.', hi: 'नए आवेदन के लिए दिशानिर्देश आय प्रमाणपत्र बताते हैं। पोर्टल शिक्षा, पहचान, बैंक और अन्य सत्यापन रिकॉर्ड माँग सकता है; NSP की मौजूदा सूची देखें।' },
      { en: 'Do not enter identity or bank details in SchemeSaathi. Applications sent directly to the Ministry are not accepted; use NSP.', hi: 'SchemeSaathi में पहचान या बैंक विवरण न दें। मंत्रालय को सीधे भेजे आवेदन स्वीकार नहीं होते; NSP का उपयोग करें।' },
    ],
    importantNotes: [
      { en: 'For a new applicant, the portal also verifies the Board’s merit/percentile, course and institution. A screening answer cannot check those records or scholarship-slot availability.', hi: 'नए आवेदक के लिए पोर्टल बोर्ड की मेधा/प्रतिशतक, पाठ्यक्रम और संस्थान की भी जाँच करता है। यह स्क्रीनिंग उन रिकॉर्ड या छात्रवृत्ति सीटों की उपलब्धता नहीं जाँच सकती।' },
    ],
    sourceTitle: 'Department of Higher Education, CSSS Scheme Guidelines',
    sourceUrl: 'https://scholarships.gov.in/public/schemeGuidelines/Guidelines_DOHE_CSSS.pdf',
    sourceQuote: '“Students who are above 80 percentile of successful candidates” in Class XII; regular degree courses; recognised institutions; no other scholarship/fee waiver/reimbursement; family income up to “Rs. 4.5 lakh per annum”; renewal requires 50% marks and 75% attendance.',
    applicationUrl: 'https://scholarships.gov.in/',
    applicationLabel: { en: 'Open the National Scholarship Portal', hi: 'राष्ट्रीय छात्रवृत्ति पोर्टल खोलें' },
    checkedAt: verifiedDate,
  },
  {
    id: 'nsap-pensions',
    title: { en: 'National Social Assistance Programme (NSAP) pensions', hi: 'राष्ट्रीय सामाजिक सहायता कार्यक्रम (NSAP) पेंशन' },
    shortTitle: { en: 'NSAP pensions', hi: 'NSAP पेंशन' },
    category: 'Pensions',
    summary: { en: 'Central pension assistance for eligible older adults, widows and people with severe or multiple disabilities in BPL households.', hi: 'BPL परिवारों के पात्र वरिष्ठ नागरिकों, विधवाओं और गंभीर/बहु-दिव्यांग व्यक्तियों के लिए केंद्रीय पेंशन सहायता।' },
    benefit: { en: 'Central assistance is ₹200/month for old-age pension at 60–79 and ₹500 at 80+; ₹300/month for widow and disability pension from the specified ages through 79, and ₹500 at 80+. States/UTs may add their own amount.', hi: 'केंद्रीय सहायता: वृद्धावस्था पेंशन में 60–79 वर्ष पर ₹200/माह और 80+ पर ₹500; निर्धारित उम्र से 79 वर्ष तक विधवा/दिव्यांग पेंशन में ₹300/माह और 80+ पर ₹500। राज्य/केंद्रशासित प्रदेश अतिरिक्त राशि दे सकते हैं।' },
    rule: any(
      all(inField('bplHousehold', 'yes'), inField('ageBand', ['60-69', '70-79', '80-plus'])),
      all(inField('bplHousehold', 'yes'), inField('widowed', 'yes'), inField('ageBand', ['40-59', '60-69', '70-79', '80-plus'])),
      all(inField('bplHousehold', 'yes'), inField('severeDisability', 'yes'), inField('ageBand', ['18-39', '40-59', '60-69', '70-79'])),
    ),
    eligibility: [
      { en: 'All three pension routes require the household to be identified as Below Poverty Line (BPL) under Government of India criteria. State/UT beneficiary ceilings and verification also apply.', hi: 'तीनों पेंशन मार्गों के लिए परिवार का भारत सरकार के मानदंडों के अनुसार गरीबी रेखा से नीचे (BPL) पहचाना जाना ज़रूरी है। राज्य/केंद्रशासित प्रदेश की लाभार्थी सीमा और जाँच भी लागू है।' },
      { en: 'IGNOAPS old-age pension: age 60 or older. Central assistance is ₹200/month at 60–79 and ₹500/month at 80 or older.', hi: 'IGNOAPS वृद्धावस्था पेंशन: उम्र 60 वर्ष या अधिक। केंद्रीय सहायता 60–79 वर्ष पर ₹200/माह और 80 वर्ष या अधिक पर ₹500/माह है।' },
      { en: 'IGNWPS widow pension: a widow aged 40 or older from a BPL household. Central assistance is ₹300/month at 40–79 and ₹500/month at 80 or older.', hi: 'IGNWPS विधवा पेंशन: BPL परिवार की 40 वर्ष या अधिक उम्र की विधवा। केंद्रीय सहायता 40–79 वर्ष पर ₹300/माह और 80 वर्ष या अधिक पर ₹500/माह है।' },
      { en: 'IGNDPS disability pension: a person aged 18–79 with severe or multiple disabilities, from a BPL household. The State/UT confirms the disability documentation and qualifying threshold; central assistance is ₹300/month, rising to ₹500 at age 80 under the published central assistance schedule.', hi: 'IGNDPS दिव्यांगता पेंशन: BPL परिवार का 18–79 वर्ष का गंभीर या बहु-दिव्यांग व्यक्ति। दिव्यांगता दस्तावेज़ और पात्र सीमा की पुष्टि राज्य/केंद्रशासित प्रदेश करता है; प्रकाशित केंद्रीय सहायता अनुसूची में ₹300/माह है, जो 80 वर्ष पर ₹500 हो जाती है।' },
      { en: 'NSAP is implemented by State/UT Governments; the local application route, documents, additional criteria and any State top-up vary by location.', hi: 'NSAP राज्य/केंद्रशासित प्रदेश सरकारें लागू करती हैं; स्थानीय आवेदन मार्ग, दस्तावेज़, अतिरिक्त शर्तें और राज्य की अतिरिक्त राशि जगह के अनुसार बदलती हैं।' },
    ],
    applicationDocuments: [
      { en: 'Ask the State/UT social-welfare or rural-development office for its current application checklist and proof requirements. SchemeSaathi does not collect certificates or identifiers.', hi: 'मौजूदा आवेदन सूची और प्रमाण के लिए राज्य/केंद्रशासित प्रदेश के सामाजिक कल्याण या ग्रामीण विकास कार्यालय से पूछें। SchemeSaathi प्रमाणपत्र या पहचान विवरण नहीं लेता।' },
    ],
    importantNotes: [
      { en: 'The amounts shown are the Central Government contribution, not necessarily the total amount paid. State/UT pension top-ups and local eligibility rules differ.', hi: 'यहाँ दिखाई गई राशि केंद्र सरकार का योगदान है, ज़रूरी नहीं कि कुल मिलने वाली पेंशन इतनी ही हो। राज्य/केंद्रशासित प्रदेश की अतिरिक्त राशि और स्थानीय पात्रता नियम अलग-अलग हैं।' },
      { en: 'A match only suggests that one national pension route may fit. The State/UT must verify BPL status, age, category and available beneficiary slots.', hi: 'मेल का अर्थ केवल यह है कि राष्ट्रीय पेंशन का कोई एक मार्ग लागू हो सकता है। BPL स्थिति, उम्र, श्रेणी और उपलब्ध लाभार्थी सीटों की पुष्टि राज्य/केंद्रशासित प्रदेश करेगा।' },
    ],
    sourceTitle: 'Press Information Bureau, NSAP pension details (Government of India)',
    sourceUrl: 'https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=155928&lang=2&reg=48',
    sourceQuote: 'IGNWPS supports “widows aged between 40 and 79 years” from BPL families; IGNDPS serves people “aged between 18 and 79 years who have severe or multiple disabilities” and belong to BPL families.',
    applicationUrl: 'https://nsap.nic.in/',
    applicationLabel: { en: 'Open the NSAP portal; contact your State/UT for applications', hi: 'NSAP पोर्टल खोलें; आवेदन के लिए राज्य/केंद्रशासित प्रदेश से संपर्क करें' },
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
