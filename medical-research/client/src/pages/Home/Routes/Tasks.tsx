import React from 'react';
import Loader from 'components/base/Loader';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useTasksActions } from 'hooks/useActions';
import TokenExpiredUI from 'components/base/TokenExpiredUI';
import { HomePageContainer, HomePageTitle } from 'pages/Home/components/Base';
import AddTaskModalWindow from 'pages/Home/components/AddTaskModalWindow';
import TasksTable from 'pages/Home/components/TasksTable';
import TaskStatus from 'pages/Home/components/TaskStatus';

const Tasks: React.FC = () => {
    const { fetchTasks } = useTasksActions();
    let { tasks, error, loading } = useTypedSelector(state => state.tasks);
    let ui = (
        <HomePageTitle>
            {tasks.length ? (
                <>
                    <HomePageTitle>Tasks list</HomePageTitle>
                    <TaskStatus />
                    <TasksTable tasks={tasks} />
                </>
            ) : (
                <HomePageTitle>Tasks list is empty</HomePageTitle>
            )}
            <AddTaskModalWindow />
        </HomePageTitle>
    );

    React.useEffect(() => {
        fetchTasks();
    }, []);

    if (localStorage.getItem('tokenExpirationTime') === 'expired') {
        setTimeout(() => localStorage.removeItem('tokenExpirationTime'), 1000);

        ui = <TokenExpiredUI error={'Your session time is over. Please, log in again.'} />;
    } else if (loading) {
        ui = <><Loader /></>;
    } else if (error) {
        ui = <>{error}</>;
    }

    return (
        <HomePageContainer>
            {ui}
        </HomePageContainer>
    );
};

export default Tasks;
