// @flow

import { pipe, update } from 'ramda';

type ProxyFn = (Array<string>, ...*) => Array<*>;

const scopifyStrings = (selector: string, strings: Array<string>): Array<string> => {
  const rules = [...strings];
  const rulesPrefix = `\n${selector} & {`;
  const rulesSuffix = `}\n`;

  const firstRule = rules[0];

  if (strings.length === 1) {
    if (firstRule === '') {
      return rules;
    }

    return [`${rulesPrefix}${firstRule}${rulesSuffix}`];
  }

  const lastRuleIndex = rules.length - 1;
  const lastRule = rules[lastRuleIndex];

  return pipe(
    update(0, `${rulesPrefix}${firstRule}`),
    update(lastRuleIndex, `${lastRule}${rulesSuffix}`),
  )(rules);
};

const scopifyTemplate = (scopeSelector: string): ProxyFn => {
  const scopifiedTemplateFn = (strings, ...interpolations) => [
    scopifyStrings(scopeSelector, strings),
    ...interpolations,
  ];

  return scopifiedTemplateFn;
};

export default scopifyTemplate;
