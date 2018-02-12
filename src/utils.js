const wrapRulesWithScope = (scopeSelector, strings) => {
  const rules = [...strings];
  const rulesPrefix = `\n${scopeSelector} & {`;
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

export const scopify = (scopeSelector) => {
  const scopifiedTemplateFn = (strings, ...interpolations) => [
    wrapRulesWithScope(scopeSelector, strings),
    ...interpolations,
  ];

  return scopifiedTemplateFn;
};
