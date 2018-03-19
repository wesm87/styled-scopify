// @flow

import styledTransformProxy from 'styled-transform-proxy'
import { curry, compose, update } from 'ramda'

type ProxyFn = (Array<string>, ...*) => Array<*>;

const scopifyStrings = (selector: string, strings: Array<string>): Array<string> => {
  const rules = [...strings]
  const rulesPrefix = `\n${selector} & {`
  const rulesSuffix = `}\n`

  const firstRuleIndex = 0
  const firstRule = rules[firstRuleIndex]

  if (strings.length === 1) {
    if (firstRule === '') {
      return rules
    }

    return [`${rulesPrefix}${firstRule}${rulesSuffix}`]
  }

  const lastRuleIndex = rules.length - 1
  const lastRule = rules[lastRuleIndex]

  return compose(
    update(lastRuleIndex, `${lastRule}${rulesSuffix}`),
    update(firstRuleIndex, `${rulesPrefix}${firstRule}`),
  )(rules)
}

const scopifyTemplate = (scopeSelector: string): ProxyFn => {
  const scopifiedTemplateFn = (strings, ...interpolations) => [
    scopifyStrings(scopeSelector, strings),
    ...interpolations,
  ]

  return scopifiedTemplateFn
}

const styledScopify = curry(
  (selector: string, styled: *) =>
    styledTransformProxy(scopifyTemplate(selector), styled)
)

export default styledScopify
