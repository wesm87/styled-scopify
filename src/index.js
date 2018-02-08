import styledTransformProxy from 'styled-transform-proxy';
import { curry } from 'ramda';

import { scopify } from './utils';

const styledScopify = curry((scopeSelector, styled) =>
  styledTransformProxy(scopify(scopeSelector), styled)
);

export default styledScopify;
