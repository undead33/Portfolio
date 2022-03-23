import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { FormControlLabel, Checkbox, } from 'components/base/FormElements';
import { DeleteBtn } from 'pages/Medicines/components/MedicineItem';
import { useTasksActions } from 'hooks/useActions';

const StyledTableBodyRow = styled(TableRow)({
    width: '100%',
    height: 'fit-content',
    minHeight: 70,
    display: 'grid',
    gridTemplateColumns: 'minmax(240px, 800px) 100px 60px',
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
});

interface UserItemProps {
    id: string;
    className: string;
    title: string;
    completed: boolean;
}

const UserItem: React.FC<UserItemProps> = ({
    id, className, title, completed,
}) => {
    const { deleteTask, editTask } = useTasksActions();
    const completeTaskAction = () => { editTask({ id, title, completed: !completed, }); };
    const deleteTaskAction = () => { deleteTask(id); };

    return (
        <>
            <StyledTableBodyRow className={className}>
                <StyledTableCell>
                    <div>{title}</div>
                </StyledTableCell>

                <StyledTableCell>
                    <FormControlLabel
                        control={
                            <Checkbox
                                id='completed'
                                name='completed'
                                defaultChecked={completed}
                                onChange={completeTaskAction}
                            />
                        }
                        label=''
                    />
                </StyledTableCell>

                <StyledTableCell>
                    <DeleteBtn onClick={deleteTaskAction} />
                </StyledTableCell>
            </StyledTableBodyRow>
        </>
    );
}

export default UserItem;
