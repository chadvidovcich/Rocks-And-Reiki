import { MockedProvider } from '@apollo/react-testing';
import Pagination from '../components/Pagination';
import { makePaginationMocksFor } from '../lib/testUtils';
import { render, screen } from '@testing-library/react';
import { perPage } from '../config';

describe('<Pagination/>', () => {
  it('should display a loading message', () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    expect(container).toHaveTextContent('Loading...');
  });

  it('should render pagination for 34 items', async () => {
    const firstPage = 1;
    const items = 34;
    const lastPage = Math.ceil(items / perPage);
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(items)}>
        <Pagination page={firstPage} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    expect(container).toHaveTextContent(`Page ${firstPage} of ${lastPage}`);
    expect(container).toMatchSnapshot();
  });

  it('should disable the prev page on first page', async () => {
    const firstPage = 1;
    const items = 34;
    const lastPage = Math.ceil(items / perPage);
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(items)}>
        <Pagination page={firstPage} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
  it('should disable the next page on last page', async () => {
    const items = 34;
    const lastPage = Math.ceil(items / perPage);
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(items)}>
        <Pagination page={lastPage} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  });
  it('should enable both on middle page', async () => {
    const items = 34;
    const lastPage = Math.ceil(items / perPage);
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(items)}>
        <Pagination page={Math.floor(lastPage / 2)} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
});
