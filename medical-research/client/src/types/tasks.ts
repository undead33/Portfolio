export interface TasksState {
    tasks: TaskObj[],
    loading: boolean,
    error: null | string
};

export interface TaskObj {
    id: string,
    title: string,
    completed: boolean,
};

export enum TasksActionTypes {
    FETCH_TASKS = 'FETCH_TASKS',
    FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS',
    FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR',
    ADD_TASK = 'ADD_TASK',
    ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS',
    EDIT_TASK = 'EDIT_TASK',
    EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS',
    DELETE_TASK = 'DELETE_TASK',
    DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS',
}

interface FetchTasksAction {
    type: TasksActionTypes.FETCH_TASKS,
};

interface FetchTasksSuccessAction {
    type: TasksActionTypes.FETCH_TASKS_SUCCESS,
    payload: any[],
};

interface FetchTasksErrorAction {
    type: TasksActionTypes.FETCH_TASKS_ERROR,
    payload: string,
};

interface AddTaskAction {
    type: TasksActionTypes.ADD_TASK,
};

interface AddTaskSuccessAction {
    type: TasksActionTypes.ADD_TASK_SUCCESS,
    payload: TaskObj,
};

interface EditTaskAction {
    type: TasksActionTypes.EDIT_TASK,
};

interface EditTaskSuccessAction {
    type: TasksActionTypes.EDIT_TASK_SUCCESS,
    payload: TaskObj,
};

interface DeleteTaskAction {
    type: TasksActionTypes.DELETE_TASK,
};

interface DeleteTaskSuccessAction {
    type: TasksActionTypes.DELETE_TASK_SUCCESS,
    payload: string,
};

export type TasksActionS = AddTaskAction | AddTaskSuccessAction |
    EditTaskAction | EditTaskSuccessAction |
    FetchTasksAction | FetchTasksSuccessAction | FetchTasksErrorAction |
    DeleteTaskAction | DeleteTaskSuccessAction;
