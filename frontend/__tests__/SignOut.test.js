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
    result: {},
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
});
