import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const Dot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

function CartCount({ count }) {
  return (
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        classNames={count}
        className="count"
        key={count}
        timeout={{ enter: 5000, exit: 5000 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default CartCount;
