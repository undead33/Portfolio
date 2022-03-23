import axios from 'axios';

const hostAndService = 'http://localhost:7000/tasks';
const headersObj = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
};

export const getAllTasksReq = () => axios.get(hostAndService, { ...headersObj });

export const addTaskReq = (newTask: any) =>
    axios.post(`${hostAndService}/add`, newTask, { ...headersObj });

export const editTaskReq = (editedTask: any, editedTaskId: string | null) =>
    axios.patch(`${hostAndService}/edit/${editedTaskId}`, editedTask, { ...headersObj });

export const deleteTaskReq = (taskId: string | null) =>
    axios.delete(`${hostAndService}/delete/${taskId}`, { ...headersObj });
