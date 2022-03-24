import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from 'tools/testUtils';
import Tasks from 'pages/Home/Routes/Tasks';
import { state } from 'tests/App.test';

export const handlers = [
    rest.get('http://localhost:7000/tasks', (req, res, ctx) => {
        return res(ctx.json([
            {
                title: 'test name',
                id: '111',
                completed: true
            },
        ]), ctx.delay(0));
    }),
];

describe('tasks page testing', () => {
    const server = setupServer(...handlers);
    const preloadedState = JSON.parse(JSON.stringify(state));

    beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('render tasks page(role: user), fetches tasks', async () => {
        render(<Tasks />, { preloadedState, });

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        expect(screen.queryByText('Title')).not.toBeInTheDocument();

        expect(await screen.findByText('Completed')).toBeInTheDocument();

        expect(await screen.findByText('test name')).toBeInTheDocument();

        expect(await screen.findByText('Title')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();

        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('click add task button', async () => {
        render(<Tasks />, { preloadedState, });

        expect(await screen.findByText('Completed')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();

        expect(screen.queryByText(/new task/)).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /add task/i }));

        expect(screen.queryByText(/new task/)).toBeInTheDocument();
    });
});
