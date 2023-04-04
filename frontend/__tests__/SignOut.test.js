// @ts-ignore
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '../node_modules/@apollo/react-testing/index';
import SignOut, { SIGNOUT_MUTATION } from '../components/SignOut';
import wait from 'waait';

const mocks = [
  // mutation mock
  {
    request: {
      query: SIGNOUT_MUTATION,
      variables: {},
    },
    result: {
      success: [{ message: 'Success Log Out' }],
    },
  },
];

describe('<SignOut/>', () => {
  it('should render and match snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <SignOut />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('should call the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SignOut />
      </MockedProvider>
    );
    await wait(400);
    // TODO
    // click log out button
    // await userEvent.click(screen.getByTestId('logOutButton'));
    // debug();
  });
});
