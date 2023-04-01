// @ts-ignore
import { render, screen } from '@testing-library/react';
// @ts-ignore
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('renders', () => {
    render(<CartCount count={10} />);
  });

  it('matches snapshot', () => {
    const { container } = render(<CartCount count={31} />);
    expect(container).toMatchSnapshot();
  });

  it('updates via props', async () => {
    const { container, rerender, debug } = render(<CartCount count={31} />);
    expect(container).toHaveTextContent('31');

    rerender(<CartCount count={'32'} />);
    // wait for 400ms
    expect(container).toHaveTextContent('3231');
    await wait(400);
    expect(container).toHaveTextContent('32');
    expect(container).toMatchSnapshot();
  });
});
