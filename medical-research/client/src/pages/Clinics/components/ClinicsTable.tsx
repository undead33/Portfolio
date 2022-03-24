import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ClinicItem from 'pages/Clinics/components/ClinicItem';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { ClinicObj } from 'types/clinics';

export const tableHeadCells: string[] = ['Name', 'City', 'Address', 'Phone Number',];

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label='first page'>
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>

            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label='previous page'>
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>

            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='next page'>
                {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>

            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label='last page'>
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

const StyledTable = styled(Table)({
    border: 0,
    boxShadow: 'none',
    width: '100%',
});

const StyledTableHead = styled(TableHead)({
    display: 'block',
    width: '100%',
    borderTop: 'solid 2px var(--colors-ui-base)',
    borderRight: 'solid 2px var(--colors-ui-base)',
    borderLeft: 'solid 2px var(--colors-ui-base)',
});

const StyledTablePagination = styled(TablePagination)({
    border: 0,
});

const StyledTableBody = styled(TableBody)({
    width: '100%',
});

const StyledTableHeadRow = styled(TableRow)({
    width: '100%',
    height: 70,
    backgroundColor: 'var(--colors-ui-base)',
    display: 'grid',
    gridTemplateColumns: '180px 180px minmax(210px, 600px) 180px',
    borderRight: 'solid 2px var(--colors-ui-base)',
    borderLeft: 'solid 2px var(--colors-ui-base)',
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
});

function createData(obj: ClinicObj) {
    const {
        id,
        name: clinicName,
        city: { name: cityName },
        address,
        phoneNumber,
        phone,
    } = obj;

    return { id, clinicName, cityName, address, phoneNumber, phone, };
}

interface TableWithPaginationProps {
    clinics: ClinicObj[];
}

const TableWithPagination: React.FC<TableWithPaginationProps> = (props) => {
    const { email } = useTypedSelector(state => state.user);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const rows = props.clinics.map((clinic) => createData(clinic));
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer sx={{ boxShadow: 'none', border: 0 }} component={Paper}>
            <StyledTable sx={{ minWidth: 500 }} aria-label='custom pagination table'>
                <StyledTableHead>
                    <StyledTableHeadRow>
                        {tableHeadCells.map((cellName) => {
                            if (email !== 'admin@gmail.com' && cellName === '') return;

                            if (cellName === '') {
                                return (
                                    <StyledTableCell key={cellName}>
                                        <div>&emsp;&emsp;&emsp;&emsp;</div>
                                    </StyledTableCell>
                                )
                            }

                            return (
                                <StyledTableCell key={cellName}>
                                    <div>{cellName}</div>
                                </StyledTableCell>
                            )
                        })}
                    </StyledTableHeadRow>
                </StyledTableHead>

                <StyledTableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row, i: number) => (
                        <ClinicItem
                            key={row.id}
                            id={row.id}
                            className={i % 2 === 0 ? 'colored' : 'white'}
                            clinicName={row.clinicName}
                            cityName={row.cityName}
                            address={row.address}
                            phoneNumber={row.phoneNumber}
                            phone={row.phone}
                        />
                    ))}
                </StyledTableBody>

                <TableFooter>
                    <TableRow>
                        <StyledTablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </StyledTable>
        </TableContainer>
    );
};

export default TableWithPagination;
