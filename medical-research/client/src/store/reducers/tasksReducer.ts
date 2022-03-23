import { TasksState, TasksActionS, TasksActionTypes } from 'types/tasks';
import initialState from 'store/reducers/initialState';

const tasksReducer = (state = initialState.tasks, action: TasksActionS)
    : TasksState => {
    switch (action.type) {
        case TasksActionTypes.FETCH_TASKS:
            return { tasks: [], loading: true, error: null, };

        case TasksActionTypes.FETCH_TASKS_SUCCESS:
            return { tasks: action.payload, loading: false, error: null, };

        case TasksActionTypes.FETCH_TASKS_ERROR:
            return { tasks: [], loading: false, error: action.payload, };

        case TasksActionTypes.ADD_TASK:
            return { tasks: [...state.tasks], loading: true, error: null, };

        case TasksActionTypes.ADD_TASK_SUCCESS:
            return { tasks: [...state.tasks, action.payload], loading: false, error: null, };

        case TasksActionTypes.EDIT_TASK:
            return { tasks: [...state.tasks], loading: true, error: null, };

        case TasksActionTypes.EDIT_TASK_SUCCESS:
            const editedTasksState = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    return action.payload;
                }

                return task;
            });

            return {
                tasks: [...editedTasksState], loading: false, error: null,
            };

        case TasksActionTypes.DELETE_TASK:
            return { tasks: [...state.tasks], loading: true, error: null, };

        case TasksActionTypes.DELETE_TASK_SUCCESS:
            const newTasksState = state.tasks.filter(task => task.id !== action.payload);

            return { tasks: [...newTasksState], loading: false, error: null, };

        default:
            return state;
    }
}

export default tasksReducer;
