import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from 'tools/testUtils';
import Clinics from 'pages/Clinics/Routes/Clinics';
import { state } from 'tests/App.test';

export const handlers = [
    rest.get('http://localhost:10001/api/Clinics/FindAll', (req, res, ctx) => {
        return res(ctx.json([
            {
                id: 'test',
                name: 'test name',
                city: { id: 0, name: 'test city' },
                address: 'test address',
                phoneNumber: 'test phoneNumber',
                phone: 'test',
                medicineId: 'test',
                medicines: 'test',
            },
        ]), ctx.delay(0));
    }),
];

describe('clinics page testing', () => {
    const server = setupServer(...handlers);

    beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('render clinics page(role: admin), fetches clinics', async () => {
        const preloadedState = JSON.parse(JSON.stringify(state));

        render(<Clinics />, { preloadedState, });

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        expect(screen.queryByText('Name')).not.toBeInTheDocument();

        expect(await screen.findByText('Address')).toBeInTheDocument();

        expect(await screen.findByText('test name')).toBeInTheDocument();

        expect(await screen.findByText('City')).toBeInTheDocument();

        expect(await screen.findByText('test phoneNumber')).toBeInTheDocument();

        expect(await screen.getByRole('button', { name: /add clinic/i })).toBeInTheDocument();

        expect(await screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('render clinics page(role: user), fetches clinics', async () => {
        const preloadedState = JSON.parse(JSON.stringify(state));

        preloadedState.user.email = 'user@gmail.com';

        render(<Clinics />, { preloadedState, });

        expect(screen.getByText('Loading...')).toBeInTheDocument();

        expect(screen.queryByText('Name')).not.toBeInTheDocument();

        expect(await screen.findByText('Address')).toBeInTheDocument();

        expect(await screen.findByText('test name')).toBeInTheDocument();

        expect(await screen.findByText('City')).toBeInTheDocument();

        expect(await screen.findByText('test phoneNumber')).toBeInTheDocument();

        const addClinicBtn = await screen.queryByRole('button', { name: /add clinic/i });
        expect(addClinicBtn).not.toBeInTheDocument();

        expect(await screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
});
