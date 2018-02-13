import styledTransformProxy from 'styled-transform-proxy';
import { curry } from 'ramda';

import scopifyTemplate from './scopify-template';

const styledScopify = curry((scopeSelector, styled) =>
  styledTransformProxy(scopifyTemplate(scopeSelector), styled)
);

export default styledScopify;
