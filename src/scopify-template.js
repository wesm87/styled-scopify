// @flow

type ProxyFn = (Array<string>, ...*) => Array<Array<string> | *>;

const scopifyStrings = (selector: string, strings: Array<string>): Array<string> => {
  const rules = [...strings];
  const rulesPrefix = `\n${selector} & {`;
  const rulesSuffix = `}\n`;

  const firstRule = rules[0];

  if (strings.length === 1) {
    if (firstRule === '') {
      return rules;
    }

    rules[0] = `${rulesPrefix}${firstRule}${rulesSuffix}`;

    return rules;
  }

  const lastRuleIndex = rules.length - 1;
  const lastRule = rules[lastRuleIndex];

  rules[0] = `${rulesPrefix}${firstRule}`;
  rules[lastRuleIndex] = `${lastRule}${rulesSuffix}`;

  return rules;
};

const scopifyTemplate = (scopeSelector: string): ProxyFn => {
  const scopifiedTemplateFn = (strings, ...interpolations) => [
    scopifyStrings(scopeSelector, strings),
    ...interpolations,
  ];

  return scopifiedTemplateFn;
};

export default scopifyTemplate;
