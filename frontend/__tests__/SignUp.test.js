// @ts-ignore
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '../node_modules/@apollo/react-testing/index';
// import userEvent from '@testing-library/user-event';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';
import wait from 'waait';
import userEvent from '@testing-library/user-event';

const mockUser = fakeUser();
const mocksPassword = 'password123';

const mocks = [
  // mutation mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: mockUser.name,
        email: mockUser.email,
        password: mocksPassword,
      },
    },
    result: {
      data: {
        __typename: 'User',
        id: 'abc23',
        email: mockUser.email,
        name: mockUser.name,
      },
    },
  },
];

describe('<SignUp/>', () => {
  it('should render and match snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('should call the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );
    await wait(400);
    // type into the boxes
    await userEvent.type(
      screen.getByPlaceholderText('Your Name'),
      mockUser.name
    );
    await userEvent.type(
      screen.getByPlaceholderText('Your Email Address'),
      mockUser.email
    );
    await userEvent.type(
      screen.getByPlaceholderText('Password'),
      mocksPassword
    );
    //  click the submit button
    await userEvent.click(screen.getByTestId('signUpButton'));
  });
});
