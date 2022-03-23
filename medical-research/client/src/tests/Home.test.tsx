import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from 'tools/testUtils';
import Home from 'pages/Home/Routes/Home';
import { state } from 'tests/App.test';

export const handlers = [
  rest.get('http://localhost:9001/api/Users/FindAll', (req, res, ctx) => {
    return res(ctx.json([
      {
        userName: 'userQw',
        email: 'userQw@gmail.com',
      },
      {
        userName: 'user_er',
        email: 'userEr@gmail.com',
      },
    ]), ctx.delay(0));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

it('fetches & receives a user after clicking the fetch user button', async () => {
  const preloadedState = JSON.parse(JSON.stringify(state));

  render(<Home />, { preloadedState, });

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  expect(screen.queryByText('List of users:')).not.toBeInTheDocument();

  expect(await screen.findByText('List of users:')).toBeInTheDocument();

  expect(await screen.findByText('1) User Qw')).toBeInTheDocument();

  expect(await screen.findByText('2) User Er')).toBeInTheDocument();

  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});
