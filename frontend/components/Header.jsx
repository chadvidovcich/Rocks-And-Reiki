// @ts-ignore
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
  font-size: 4rem;
  width: 50vw;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  /* background: var(--purple, rebeccapurple); */
  transform: skew(-12deg);
  a {
    color: var(--purple);
    text-decoration: underline;
    text-transform: uppercase;
    padding: 0.5rem 1 rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
  @media screen and (max-width: 900px) {
    .bar {
      border-bottom: 10px solid var(--black, black);
      display: grid;
      grid-template-columns: auto 1fr;
      justify-content: space-between;
      align-items: stretch;
      /* border: 10px solid green; */
    }

    .sub-bar {
      display: grid;
      grid-template-columns: 1fr auto;
      border-bottom: 1px solid var(--black, black);
    }
  }
`;

function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <Link href="/">Rocks and Reiki</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
    </HeaderStyles>
  );
}
Header.propTypes = {};
export default Header;
