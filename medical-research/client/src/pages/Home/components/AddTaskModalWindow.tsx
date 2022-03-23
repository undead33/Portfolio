import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { default as styledComponents } from 'styled-components';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { taskValidation, } from 'tools/formValidation';
import { useTasksActions, } from 'hooks/useActions';
import { TaskObj } from 'types/tasks';
import { v4 as uuidv4 } from 'uuid';

const FormContainer = styled(Box)({
    margin: 0,
    width: '100%',
    display: 'grid',
});

export const TaskForm = styledComponents.form({
    textAlign: 'left',
});

export const FormTitle = styled(DialogTitle)({
    textTransform: 'capitalize',
    color: 'var(--colors-ui-base)',
});

export const FormContent = styled(DialogContent)({
    display: 'flex',
    padding: '0 20px',
});

const AddTaskBtn = styled(Button)({
    marginTop: 20,
    justifySelf: 'right',
});

const validationSchema = yup.object().shape(taskValidation);
const initialFormValues: TaskObj = {
    id: '',
    title: '',
    completed: false,
};

export const AddTaskModalWindow = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => setOpen(false);
    const { addTask } = useTasksActions();

    const formik = useFormik({
        initialValues: initialFormValues,
        validationSchema: validationSchema,
        onSubmit: sendAddTaskForm,
    });

    function sendAddTaskForm(values: TaskObj) {
        addTask({ ...values, id: uuidv4(), });
        formik.resetForm();
        handleClickClose();
    }

    return (
        <>
            <AddTaskBtn variant='outlined' onClick={handleClickOpen}>
                add task
            </AddTaskBtn>

            <Dialog open={open} onClose={handleClickClose}>
                <TaskForm name='newTaskForm' onSubmit={formik.handleSubmit}>
                    <FormTitle>new task</FormTitle>

                    <FormContent>
                        <FormContainer
                            width={[355, 355, 600]}
                        >
                            <TextField
                                id='title'
                                name='title'
                                placeholder='Enter task title'
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                        </FormContainer>
                    </FormContent>

                    <DialogActions>
                        <Button type='submit'>add</Button>

                        <Button onClick={handleClickClose}>cancel</Button>
                    </DialogActions>
                </TaskForm>
            </Dialog>
        </>
    );
}

export default AddTaskModalWindow;
