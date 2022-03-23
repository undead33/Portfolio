import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from 'tools/testUtils';
import Medicines from 'pages/Medicines/Routes/Medicines';
import { state } from 'tests/App.test';

export const handlers = [
    rest.get('http://localhost:10001/Medicines/FindAll', (req, res, ctx) => {
        return res(ctx.json([
            {
                id: '164734208282016473420828',
                type: '0',
                description: 'test description',
                dosageForm: '0',
                container: '0',
                state: '0',
                expireAt: '2022-03-09T11:01:18Z',
            },
        ]), ctx.delay(0));
    }),
];

describe('medicines page testing', () => {
    const server = setupServer(...handlers);

    beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('render medicines page(role: admin), fetches medicines', async () => {
        const preloadedState = JSON.parse(JSON.stringify(state));

        render(<Medicines />, { preloadedState, });

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        expect(screen.queryByText('Description')).not.toBeInTheDocument();

        expect(await screen.findByText('ID')).toBeInTheDocument();

        expect(await screen.findByText('16473420 82820164 73420828')).toBeInTheDocument();

        expect(await screen.findByText('Description')).toBeInTheDocument();

        expect(await screen.findByText('test description')).toBeInTheDocument();

        expect(await screen.getByRole('button', { name: /add medicine/i })).toBeInTheDocument();

        expect(await screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('render medicines page(role: user), fetches medicines', async () => {
        const preloadedState = JSON.parse(JSON.stringify(state));

        preloadedState.user.email = 'user@gmail.com';

        render(<Medicines />, { preloadedState, });

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        expect(screen.queryByText('Description')).not.toBeInTheDocument();

        expect(await screen.findByText('ID')).toBeInTheDocument();

        expect(await screen.findByText('16473420 82820164 73420828')).toBeInTheDocument();

        expect(await screen.findByText('Description')).toBeInTheDocument();

        expect(await screen.findByText('test description')).toBeInTheDocument();

        const addMedicineBtn = await screen.queryByRole('button', { name: /add medicine/i });
        expect(addMedicineBtn).not.toBeInTheDocument();

        expect(await screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
});
