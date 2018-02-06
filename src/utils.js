import { curry, keys, reduce, is } from 'ramda';

const copyMethodsWith = curry((transform, target, source) => {
  const reducer = (acc, key) => {
    if (is(Function, source[key])) {
      acc[key] = transform(source[key]);
    }

    return acc;
  };

  return reduce(reducer, target, keys(source));
});

const createThunkWith = curry((transform, fn) => {
  return (...args) => {
    return transform(fn(...args));
  };
});

const wrapRulesWithScope = curry((scopeSelector, strings) => {
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
});

const scopify = curry((scopeSelector, fn) => {
  return (strings, ...interpolations) => {
    const wrappedRules = wrapRulesWithScope(scopeSelector, strings);

    return fn(wrappedRules, ...interpolations);
  };
});

export const scopifyTemplateFunction = curry((scopeSelector, fn) => {
  const scopedTemplate = scopify(scopeSelector, fn);
  const scopifyMethods = copyMethodsWith(createThunkWith(scopify(scopeSelector)));

  return scopifyMethods(scopedTemplate, fn);
});

export const scopifyTemplateFactory = curry((scopeSelector, fn) => {
  const scopedFactory = createThunkWith(scopifyTemplateFunction(scopeSelector), fn);

  return scopedFactory;
});
