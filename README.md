# styled-scopify

A helper function for styled-components that wraps the main `styled` function and scopes
all of your CSS rules to a root selector. This is useful if you use something like the
`postcss-scopify` plugin. The helper function is curried and accepts two arguments - a
CSS selector string to use as the scope and the original `styled` function - and returns
the wrapped `styled` function.

## Type Definitions

```
styledScopify :: String selector -> styled -> styled
```

## Examples

```js
// src/styled.js
import styled from 'styled-components';
import styledScopify from 'styled-scopify';

export default styledScopify('#root', styled);

// src/components/Foo.js
import styled from '../styled';

const Foo = styled.span`
  font-size: 14px;
  color: #333;
`;

// Without this helper function you'd have to do this for every component:
const Bar = styled.div`
  #root & {
    ...
  }
`;
```
