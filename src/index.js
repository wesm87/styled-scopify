// @flow

import styledTransformProxy from 'styled-transform-proxy';
import { curry } from 'ramda';

import scopifyTemplate from './scopify-template';

const styledScopify = curry((selector: string, styled: *) =>
  styledTransformProxy(scopifyTemplate(selector), styled)
);

export default styledScopify;
