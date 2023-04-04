import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';
import { MockedProvider } from '@apollo/react-testing';
// @ts-ignore
import { render, screen } from '@testing-library/react';

// create Mocks and fake data
const product = fakeItem();
const mocks = [
  {
    // when someone requests this query and variable combo
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: {
        id: '123',
      },
    },
    // return this data
    result: {
      data: {
        Product: product,
      },
    },
  },
];

describe('<Single Product/>', () => {
  it('renders with proper data', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    // wait for test id to show up
    await screen.findByTestId('singleProduct');
    expect(container).toMatchSnapshot();
  });

  it('errors out when an item is not found', async () => {
    const errorMock = [
      {
        // when someone requests this query and variable combo
        request: {
          query: SINGLE_ITEM_QUERY,
          variables: {
            id: '123',
          },
        },
        // return this data
        result: {
          errors: [{ message: 'Item not found!' }],
        },
      },
    ];
    const { container, debug } = render(
      <MockedProvider mocks={errorMock}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    await screen.findByTestId('graphql-error');
    expect(container).toHaveTextContent('Shoot!');
    expect(container).toHaveTextContent('Item not found!');
  });
});
