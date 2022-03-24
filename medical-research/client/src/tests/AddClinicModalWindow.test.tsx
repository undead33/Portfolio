import { render, fireEvent, screen } from 'tools/testUtils';
import { waitFor, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { AddClinicModalWindow } from 'pages/Clinics/components/AddClinicModalWindow';

type GetByRoleParams = [string, { name: RegExp }];

describe('add medicine modal window testing', () => {
    beforeEach(() => render(<AddClinicModalWindow />));

    afterEach(cleanup);

    const addClinicBtn: GetByRoleParams = ['button', { name: /add clinic/ }];
    const addClinicModal: GetByRoleParams = ['dialog', { name: /add clinic/ }];
    const addBtn: GetByRoleParams = ['button', { name: /add/ }];
    const cancelBtn: GetByRoleParams = ['button', { name: /cancel/ }];

    it('initial rendering', () => {
        expect(screen.getByRole(...addClinicBtn)).toBeInTheDocument();
        expect(screen.queryByText(/new clinic/)).not.toBeInTheDocument();
    });

    it('click add clinic button', () => {
        fireEvent.click(screen.getByRole(...addClinicBtn));

        expect(screen.queryByRole(...addClinicBtn)).not.toBeInTheDocument();

        expect(screen.getByText(/new clinic/)).toBeInTheDocument();

        expect(screen.getByRole(...addBtn)).toBeInTheDocument();

        expect(screen.getByRole(...cancelBtn)).toBeInTheDocument();
    });

    it('click cancel button', async () => {
        fireEvent.click(screen.getByRole(...addClinicBtn));

        fireEvent.click(screen.getByRole(...cancelBtn));

        await waitFor(() => screen.getByRole(...addClinicBtn), { timeout: 200 });

        expect(screen.getByRole(...addClinicBtn)).toBeInTheDocument();
    });

    // it('click add button', async () => {
    //     fireEvent.click(screen.getByRole(...addMedicineBtn));

    //     await act(async () => {
    //         await fireEvent.submit(screen.getByRole(...addBtn));
    //     });

    //     await waitFor(() => screen.getByText('add medicine'), { timeout: 1200 });

    //     //expect(screen.getByRole(...addMedicineBtn)).toBeInTheDocument();
    // });

    // it('click outside modal window', () => {
    //     fireEvent.click(screen.getByRole(...addMedicineBtn));

    //     expect(screen.queryByRole(...addMedicineBtn)).not.toBeInTheDocument();
    //     console.log(screen.getByRole(...addMedicineModal))//////////
    //     fireEvent.click(screen.getByRole(...addMedicineModal));

    //     expect(screen.getByRole(...addMedicineBtn)).toBeInTheDocument();
    // });
});
