import { render, fireEvent, screen } from 'tools/testUtils';
import { waitFor, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import { AddMedicineModalWindow } from 'pages/Medicines/components/AddMedicineModalWindow';

type GetByRoleParams = [string, { name: RegExp }];

describe('add medicine modal window testing', () => {
    //act(() => { beforeEach(() => render(<AddMedicineModalWindow />)) });
    afterEach(cleanup);

    const addMedicineBtn: GetByRoleParams = ['button', { name: /add medicine/ }];
    const addMedicineModal: GetByRoleParams = ['dialog', { name: /add medicine/ }];
    const chooseDateBtn: GetByRoleParams = ['textbox', { name: /Choose date/ }];
    const previousMonthBtn: GetByRoleParams = ['button', { name: /Previous month/ }];
    const addBtn: GetByRoleParams = ['button', { name: /add/ }];
    const cancelBtn: GetByRoleParams = ['button', { name: /cancel/ }];

    it('initial rendering', () => {
        render(<AddMedicineModalWindow />);

        expect(screen.getByRole(...addMedicineBtn)).toBeInTheDocument();
        expect(screen.queryByText(/new medicine/)).not.toBeInTheDocument();
    });

    it('click add medicine button', () => {
        fireEvent.click(screen.getByRole(...addMedicineBtn));

        expect(screen.queryByRole(...addMedicineBtn)).not.toBeInTheDocument();

        expect(screen.getByText(/new medicine/)).toBeInTheDocument();

        expect(screen.getByRole(...addBtn)).toBeInTheDocument();

        expect(screen.getByRole(...cancelBtn)).toBeInTheDocument();
    });

    it('click choose date button', () => {
        fireEvent.click(screen.getByRole(...addMedicineBtn));

        fireEvent.click(screen.getByRole(...chooseDateBtn));

        expect(screen.getByRole(...previousMonthBtn)).toBeInTheDocument();
    });

    it('click cancel button', async () => {
        fireEvent.click(screen.getByRole(...addMedicineBtn));

        fireEvent.click(screen.getByRole(...cancelBtn));

        await waitFor(() => screen.getByRole(...addMedicineBtn), { timeout: 200 });

        expect(screen.getByRole(...addMedicineBtn)).toBeInTheDocument();
    });

    it('click add button', async () => {
        const result = render(<AddMedicineModalWindow />);
        fireEvent.click(screen.getByRole(...addMedicineBtn));

        const someElement = result.container.querySelector('#type');
        console.log(someElement)////////////

        await act(async () => {
            await fireEvent.submit(screen.getByRole(...addBtn));
        });

        await waitFor(() => screen.getByText('add medicine'), { timeout: 1200 });

        //expect(screen.getByRole(...addMedicineBtn)).toBeInTheDocument();
    });

    // it('click outside modal window', () => {
    //     fireEvent.click(screen.getByRole(...addMedicineBtn));

    //     expect(screen.queryByRole(...addMedicineBtn)).not.toBeInTheDocument();
    //     console.log(screen.getByRole(...addMedicineModal))//////////
    //     fireEvent.click(screen.getByRole(...addMedicineModal));

    //     expect(screen.getByRole(...addMedicineBtn)).toBeInTheDocument();
    // });
});
