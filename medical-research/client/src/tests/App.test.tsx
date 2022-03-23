import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from 'App';

describe('App testing', () => {
    it('app description always exist', () => {
        render(<App />);

        expect(screen.getByText(/© 2020 Medical Research/)).toBeInTheDocument();
    });
});

export const state = {
    user: {
        userName: 'testName',
        email: 'admin@gmail.com',
        phoneNumber: 'test',
        images: [{
            id: 'test',
            fileName: 'test',
            data: 'test',
        }],
        loading: false,
        error: null,
    },
};
