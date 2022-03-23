import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTypedSelector } from 'hooks/useTypedSelector';

const TaskStatusContainer = styled(Box)({
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    padding: '20px 0',
});

const TaskStatusMessage = styled(Typography)({
    margin: 0,
});

const CompletedTaskNumber = styled(Typography)({
    margin: 0,
    color: 'green',
    fontWeight: 700,
});

const TotalTaskNumber = styled(Typography)({
    margin: 0,
    color: 'red',
    fontWeight: 700,
});

const TasksStatus: React.FC = () => {
    const { tasks } = useTypedSelector(state => state.tasks);
    const completedTaskNumber = tasks.filter((task) => task.completed === true).length;
    const taskStatusMessage = `task${tasks.length > 1 ? 's' : ''} ${completedTaskNumber > 1 ? 'are' : 'is'} completed`;

    return (
        <>
            {tasks.length ? (
                <TaskStatusContainer>
                    <CompletedTaskNumber>
                        {completedTaskNumber}
                    </CompletedTaskNumber>
                    <TaskStatusMessage>
                        out of
                    </TaskStatusMessage>
                    <TotalTaskNumber>
                        {tasks.length}
                    </TotalTaskNumber>
                    <TaskStatusMessage>
                        {taskStatusMessage}
                    </TaskStatusMessage>
                </TaskStatusContainer>
            ) : null}
        </>
    );
};

export default TasksStatus;
