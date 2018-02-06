import { __, curry, pipe, keys, reduce, is } from 'ramda';

import { scopifyTemplateFunction, scopifyTemplateFactory } from './utils';

const wrapStyled = curry((scopeSelector, styled) => {
  const styledReducer = (acc, key) => {
    const originalValue = styled[key];

    if (is(Function, originalValue) && is(Function, originalValue.attrs)) {
      acc[key] = scopifyTemplateFunction(scopeSelector, originalValue);
    }

    return acc;
  };

  return pipe(
    scopifyTemplateFactory(scopeSelector), // styled(Component)
    reduce(styledReducer, __, keys(styled)), // styled.div, styled.span, etc.
  )(styled);
});

export default wrapStyled;
