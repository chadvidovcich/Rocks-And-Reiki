import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'radnika_next';
  src: url('/public/static/radnikanext-medium-webfont.woff2')
  format('woff2');
  font-weight: normal;
  font-style: normal;
}
:root {
  --red: #ff0000
  --purple: rebeccapurple
  --black: #393939
  --grey: #3a3a3a
  --gray: var(--grey)
  --lightGrey: #3a3a3a
  --lightGray: var(--lightGrey)
  --offWhite: #ededed
  --maxWidth: 1000px
  --bs: 0 12px 24px 0 rgba(0,0,0,0.09)
}
*, *::before, *:after {
  box-sizing: inherit;
}
body {
  font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0;
  margin: 0;
  font-style: 1.5rem;
  line-height:2;
}
a {
  text-decoration: none;
  color: var(--black)
}
a:hover {
  text-decoration: underline;
}
button {
  font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

const InnerStyles = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2rem;
`;

function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
export default Page;