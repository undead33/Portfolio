import * as React from 'react';
import { styled } from '@mui/material/styles';
//import { useNavigate } from 'react-router-dom';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useMedicinesActions } from 'hooks/useActions';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa';
import { sliceId, } from 'tools/transformStrings';
import { useTypedSelector } from 'hooks/useTypedSelector';

const StyledTableBodyRow = styled(TableRow)({
    width: '100%',
    height: 'fit-content',
    minHeight: 70,
    display: 'grid',
    gridTemplateColumns:
        '80px 40px minmax(210px, 700px) 70px 70px 75px 85px 1fr',
    borderRight: 'solid 4px var(--colors-ui-base)',
    borderLeft: 'solid 4px var(--colors-ui-base)',
    [`&.${tableRowClasses.root}:last-child`]: {
        borderBottom: 'solid 4px var(--colors-ui-base)',
        borderRadius: '0 0 4px 4px',
    },
});

const StyledTableCell = styled(TableCell)({
    [`&.${tableCellClasses.root}`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%',
        padding: 0,
        textAlign: 'center',
        borderBottom: 0,
    },
    [`&.${tableCellClasses.head}`]: {
        color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    [`&.${tableCellClasses.head}:not(:last-child)`]: {
        borderRight: 'solid 2px var(--colors-ui-border)',
    },
    [`&.${tableCellClasses.body}:not(:last-child)`]: {
        borderRight: 'solid 2px var(--colors-ui-base)',
    },
    [`&.${tableCellClasses.body}:nth-of-type(3)`]: {
        cursor: 'pointer',
    },
});

const EditBtn = styled(FaPencilAlt)({
    margin: '0 0 3px 5px',
    fontSize: 22,
    color: 'var(--colors-ui-base)',
    cursor: 'pointer',
});

export const DeleteBtn = styled(MdOutlineDeleteForever)({
    fontSize: 30,
    color: 'var(--colors-ui-base)',
    cursor: 'pointer',
});

interface MedicineItemProps {
    className: string;
    id: string;
    type: string;
    description: string;
    dosageForm: string;
    container: string;
    state: string;
    expireAt: string;
}

const MedicineItem: React.FC<MedicineItemProps> = ({
    className, id, type, description, dosageForm, container, state, expireAt,
}) => {
    const { email } = useTypedSelector(state => state.user);
    const { deleteMedicine } = useMedicinesActions();
    //const navigate = useNavigate();
    const redirectToMedicine = () => {
        // navigate(`/medicines/${id}`); 
    };
    const redirectToMedicineEdit = () => {
        // navigate(`/medicines/${id}/edit`); 
    };
    const deleteMedicineAction = () => { deleteMedicine(id); };

    return (
        <>
            <StyledTableBodyRow className={className}>
                <StyledTableCell>
                    <div>{sliceId(id)}</div>
                </StyledTableCell>

                <StyledTableCell>
                    <div>{type}</div>
                </StyledTableCell>

                <StyledTableCell onDoubleClick={redirectToMedicine}>
                    <div>{description}</div>
                </StyledTableCell>

                <StyledTableCell>
                    <div>{dosageForm}</div>
                </StyledTableCell>

                <StyledTableCell>
                    <div>{container}</div>
                </StyledTableCell>

                <StyledTableCell>
                    <div>{state}</div>
                </StyledTableCell>

                <StyledTableCell>
                    <div>{expireAt}</div>
                </StyledTableCell>

                {email === 'admin@gmail.com' ?
                    <StyledTableCell>
                        <EditBtn onClick={redirectToMedicineEdit} />
                        <DeleteBtn onClick={deleteMedicineAction} />
                    </StyledTableCell>
                    : null}
            </StyledTableBodyRow>
        </>
    );
}

export default MedicineItem;
