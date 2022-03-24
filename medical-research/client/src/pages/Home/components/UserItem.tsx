import * as React from 'react';
import { styled } from '@mui/material/styles';
//import { useNavigate } from 'react-router-dom';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { splitNameByUnderscore, splitNameByCamelCase } from 'tools/transformStrings';

const StyledTableBodyRow = styled(TableRow)({
    width: '100%',
    height: 'fit-content',
    minHeight: 70,
    display: 'grid',
    gridTemplateColumns: '240px minmax(210px, 600px) 240px',
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

interface UserItemProps {
    id: string;
    className: string;
    userName: string;
    email: string | null | undefined;
    phoneNumber: string | null | undefined;
}

const UserItem: React.FC<UserItemProps> = ({
    id, className, userName, email, phoneNumber,
}) => {
    //const navigate = useNavigate();
    const redirectToUser = () => {
        // navigate(`${id}`); 
    };

    return (
        <>
            <StyledTableBodyRow className={className}>
                <StyledTableCell onDoubleClick={redirectToUser}>
                    <div>
                        {userName.includes('_')
                            ? splitNameByUnderscore(userName)
                            : splitNameByCamelCase(userName)}
                    </div>
                </StyledTableCell>

                <StyledTableCell>
                    <div>{email}</div>
                </StyledTableCell>

                <StyledTableCell>
                    <div>{phoneNumber}</div>
                </StyledTableCell>
            </StyledTableBodyRow>
        </>
    );
}

export default UserItem;
