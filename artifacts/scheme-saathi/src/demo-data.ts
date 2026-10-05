export type Answer = string | number | boolean | null;
export type Profile = {
  state: string | null;
  district: string | null;
  category: string | null;
  ageBand: string | null;
  incomeBand: string | null;
  occupation: string | null;
  studentStatus: string | null;
  farmingStatus: string | null;
  familyStatus: string | null;
};
export type Field = keyof Profile;
export type Rule =
  | { all_of: Rule[] }
  | { any_of: Rule[] }
  | { not: Rule }
  | { field: Field; op: 'eq' | 'in' | 'gte' | 'lte'; value: Answer | Answer[] };
export type DemoScheme = {
  id: string;
  title: string;
  category: string;
  rule: Rule;
  checklist: string[];
  guidance: string;
  sourceNote: string;
  status: string;
};

export const demoSchemes: DemoScheme[] = [
  {
    id: 'pathfinder-learning',
    title: 'Pathfinder Learning Grant',
    category: 'Education',
    rule: {
      all_of: [
        { field: 'studentStatus', op: 'eq', value: 'student' },
        { field: 'ageBand', op: 'in', value: ['18-24', '25-34'] },
        { field: 'incomeBand', op: 'in', value: ['under-1', '1-2.5'] },
        { not: { field: 'state', op: 'eq', value: 'Goa' } },
      ],
    },
    checklist: ['A note describing your current course (demo)', 'A household income estimate (demo)', 'A way to contact you, if you choose (demo)'],
    guidance: 'This fictional example suggests asking a trusted local support worker what learning assistance may exist. It is not an application route.',
    sourceNote: 'No official source. This is a made-up example created only to demonstrate the prototype.',
    status: 'Fictional demo example',
  },
  {
    id: 'monsoon-field-kit',
    title: 'Monsoon Field Kit Support',
    category: 'Farming',
    rule: {
      all_of: [
        { field: 'farmingStatus', op: 'eq', value: 'farmer' },
        { field: 'state', op: 'in', value: ['Maharashtra', 'Odisha', 'Rajasthan'] },
        { any_of: [
          { field: 'incomeBand', op: 'in', value: ['under-1', '1-2.5'] },
          { field: 'familyStatus', op: 'eq', value: 'large-household' },
        ] },
      ],
    },
    checklist: ['A note about the kind of farming you do (demo)', 'A rough household income band (demo)', 'Questions to take to a local agriculture help desk (demo)'],
    guidance: 'For this made-up scenario, a person might ask a local agriculture help desk about seasonal support. No such program is being claimed.',
    sourceNote: 'No official source. This is a made-up example created only to demonstrate the prototype.',
    status: 'Fictional demo example',
  },
  {
    id: 'first-home-circle',
    title: 'First Home Circle',
    category: 'Housing',
    rule: {
      all_of: [
        { field: 'familyStatus', op: 'eq', value: 'first-home' },
        { field: 'incomeBand', op: 'in', value: ['under-1', '1-2.5', '2.5-5'] },
        { any_of: [
          { field: 'state', op: 'eq', value: 'Delhi' },
          { field: 'occupation', op: 'eq', value: 'worker' },
        ] },
      ],
    },
    checklist: ['A note on current housing needs (demo)', 'A broad income range (demo)', 'Questions for a community housing adviser (demo)'],
    guidance: 'This fictional example only models a conversation about housing needs. It does not describe a real scheme or application.',
    sourceNote: 'No official source. This is a made-up example created only to demonstrate the prototype.',
    status: 'Fictional demo example',
  },
  {
    id: 'care-neighbour-network',
    title: 'Care Neighbour Network',
    category: 'Family support',
    rule: {
      any_of: [
        { field: 'familyStatus', op: 'eq', value: 'caregiver' },
        { all_of: [
          { field: 'ageBand', op: 'in', value: ['55-64', '65+'] },
          { field: 'incomeBand', op: 'in', value: ['under-1', '1-2.5'] },
        ] },
      ],
    },
    checklist: ['A note about the kind of support needed (demo)', 'Questions for a trusted community worker (demo)'],
    guidance: 'In this made-up example, someone could discuss care needs with a trusted community worker. This is not an official service.',
    sourceNote: 'No official source. This is a made-up example created only to demonstrate the prototype.',
    status: 'Fictional demo example',
  },
];

export const initialProfile: Profile = {
  state: null, district: null, category: null, ageBand: null, incomeBand: null,
  occupation: null, studentStatus: null, farmingStatus: null, familyStatus: null,
};

export const fieldLabels: Record<Field, string> = {
  state: 'State or union territory',
  district: 'District',
  category: 'Support area',
  ageBand: 'Age range',
  incomeBand: 'Approximate yearly household income',
  occupation: 'Work situation',
  studentStatus: 'Are you currently studying?',
  farmingStatus: 'Do you work in farming?',
  familyStatus: 'Household situation',
};

export const options: Partial<Record<Field, { value: string; label: string }[]>> = {
  state: ['Andhra Pradesh', 'Delhi', 'Goa', 'Maharashtra', 'Odisha', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Another state / UT'].map((v) => ({ value: v, label: v })),
  district: ['Not listed / prefer not to say', 'North', 'South', 'Central', 'East', 'West'].map((v) => ({ value: v, label: v })),
  ageBand: ['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65 or older'].map((label, i) => ({ value: ['under-18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'][i], label })),
  incomeBand: ['Under ₹1 lakh', '₹1–2.5 lakh', '₹2.5–5 lakh', 'Above ₹5 lakh'].map((label, i) => ({ value: ['under-1', '1-2.5', '2.5-5', 'above-5'][i], label })),
  occupation: [{ value: 'worker', label: 'Wage or salaried work' }, { value: 'self-employed', label: 'Self-employed' }, { value: 'not-working', label: 'Not working now' }, { value: 'other', label: 'Another situation' }],
  studentStatus: [{ value: 'student', label: 'Yes, currently studying' }, { value: 'not-student', label: 'No' }],
  farmingStatus: [{ value: 'farmer', label: 'Yes, I work in farming' }, { value: 'not-farmer', label: 'No' }],
  familyStatus: [{ value: 'first-home', label: 'Looking for a first home' }, { value: 'caregiver', label: 'I care for someone in my household' }, { value: 'large-household', label: 'Household has 5 or more people' }, { value: 'other', label: 'None of these / another situation' }],
};

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
  const answer = profile[rule.field] as Answer;
  if (answer === null || answer === undefined || answer === '') return 'unknown';
  const values = Array.isArray(rule.value) ? rule.value : [rule.value];
  if (rule.op === 'eq') return answer === rule.value;
  if (rule.op === 'in') return values.includes(answer);
  if (rule.op === 'gte') return Number(answer) >= Number(rule.value);
  return Number(answer) <= Number(rule.value);
}

export function unresolvedFields(rule: Rule, profile: Profile): Field[] {
  if ('all_of' in rule) return rule.all_of.flatMap((item) => unresolvedFields(item, profile));
  if ('any_of' in rule) return rule.any_of.flatMap((item) => unresolvedFields(item, profile));
  if ('not' in rule) return unresolvedFields(rule.not, profile);
  return profile[rule.field] === null ? [rule.field] : [];
}

