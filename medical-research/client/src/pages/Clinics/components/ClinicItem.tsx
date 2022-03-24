import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableBodyRow = styled(TableRow)({
    width: '100%',
    height: 'fit-content',
    minHeight: 70,
    display: 'grid',
    gridTemplateColumns: '180px 180px minmax(210px, 600px) 180px',
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
    [`&.${tableCellClasses.body}:nth-of-type(1)`]: {
        cursor: 'pointer',
    },
});

interface ClinicItemProps {
    id: string;
    className: string;
    clinicName: string | null;
    cityName: string | null;
    address: string | null;
    phoneNumber: string | null | undefined;
    phone: string | null | undefined;
}

const ClinicItem: React.FC<ClinicItemProps> = ({
    id, className, clinicName, cityName, address, phoneNumber, phone
}) => {
    //const navigate = useNavigate();
    const redirectToClinic = () => {
        // navigate(`/clinics/${id}`); 
    };

    return (
        <>
            <StyledTableBodyRow className={className}>
                <StyledTableCell onDoubleClick={redirectToClinic}>
                    <div>{clinicName}</div>
                </StyledTableCell>

                <StyledTableCell>
                    <div>{cityName}</div>
                </StyledTableCell>

                <StyledTableCell>
                    <div>{address}</div>
                </StyledTableCell>

                <StyledTableCell>
                    <div>{phoneNumber || phone}</div>
                </StyledTableCell>
            </StyledTableBodyRow>
        </>
    );
}

export default ClinicItem;
