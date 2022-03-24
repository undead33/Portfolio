import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from 'tools/testUtils';
import { waitFor, cleanup } from '@testing-library/react';
import Users from 'pages/Home/Routes/Users';
import { state } from 'tests/App.test';

export const handlers = [
  rest.get('http://localhost:9001/api/Users/FindAll', (req, res, ctx) => {
    return res(ctx.json([
      {
        userName: 'userWww',
        email: 'userQw@gmail.com',
        phoneNumber: 'test',
        images: [],
      },
      {
        userName: 'user_Qqq',
        email: 'user@gmail.com',
        phoneNumber: 'test2',
        images: [],
      },
    ]), ctx.delay(0));
  }),
];

describe('users page testing', () => {
  const server = setupServer(...handlers);
  const preloadedState = JSON.parse(JSON.stringify(state));

  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('fetches & receives a users', async () => {
    render(<Users />, { preloadedState, });

    expect(screen.getByText('Name')).toBeInTheDocument();

    expect(screen.getByText('Email')).toBeInTheDocument();

    expect(screen.getByText('Phone Number')).toBeInTheDocument();

    await waitFor(() => screen.getByText('User Qqq'), { timeout: 500 });
    expect(screen.getByText('User Qqq')).toBeInTheDocument();

    await waitFor(() => screen.getByText('User Www'), { timeout: 500 });
    expect(screen.getByText('User Www')).toBeInTheDocument();

    await waitFor(() => screen.getByText('userQw@gmail.com'), { timeout: 500 });
    expect(screen.getByText('userQw@gmail.com')).toBeInTheDocument();
  });
});
