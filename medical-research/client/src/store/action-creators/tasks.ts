import { TasksActionS, TasksActionTypes } from 'types/tasks';
import { Dispatch } from 'redux';
import { TaskObj } from 'types/tasks';
import { getAllTasksReq, addTaskReq, deleteTaskReq, editTaskReq } from 'api/tasks';
import axiosErrCatching from 'tools/axiosErrCatching';

export const fetchTasks = () =>
    async (dispatch: Dispatch<TasksActionS>) => {
        dispatch({ type: TasksActionTypes.FETCH_TASKS });

        try {
            const response = await getAllTasksReq();

            dispatch({
                type: TasksActionTypes.FETCH_TASKS_SUCCESS,
                payload: response.data
            });
        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'fetchTasks');

            dispatch({
                type: TasksActionTypes.FETCH_TASKS_ERROR,
                payload: errMessage,
            });
        }
    };


export const addTask = (newTask: TaskObj) =>
    async (dispatch: Dispatch<TasksActionS>) => {
        dispatch({ type: TasksActionTypes.ADD_TASK });

        try {
            const response = await addTaskReq(newTask);

            if (response.status === 200) {
                dispatch({
                    type: TasksActionTypes.ADD_TASK_SUCCESS,
                    payload: newTask,
                });
            }
        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'addTask');

            dispatch({
                type: TasksActionTypes.FETCH_TASKS_ERROR,
                payload: errMessage,
            });
        }
    };

export const editTask = (editedTask: TaskObj) =>
    async (dispatch: Dispatch<TasksActionS>) => {
        dispatch({ type: TasksActionTypes.EDIT_TASK });

        try {
            const response = await editTaskReq(editedTask, editedTask.id);

            if (response.status === 200) {
                dispatch({
                    type: TasksActionTypes.EDIT_TASK_SUCCESS,
                    payload: editedTask,
                });
            }

        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'editTask');

            dispatch({
                type: TasksActionTypes.FETCH_TASKS_ERROR,
                payload: errMessage,
            });
        }
    };

export const deleteTask = (taskId: string) =>
    async (dispatch: Dispatch<TasksActionS>) => {
        dispatch({ type: TasksActionTypes.DELETE_TASK });

        try {
            const response = await deleteTaskReq(taskId);

            if (response.status === 200) {
                dispatch({
                    type: TasksActionTypes.DELETE_TASK_SUCCESS,
                    payload: taskId,
                });
            }
        } catch (err: any) {
            let errMessage = axiosErrCatching(err.message, 'deleteTask');

            dispatch({
                type: TasksActionTypes.FETCH_TASKS_ERROR,
                payload: errMessage,
            });
        }
    };
