import React from 'react';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useUsersListActions } from 'hooks/useActions';
import TokenExpiredUI from 'components/base/TokenExpiredUI';
import UsersTable from 'pages/Home/components/UsersTable';
import { HomePageContainer, HomePageTitle } from 'pages/Home/components/Base';

const Users: React.FC = () => {
    const { fetchUsers } = useUsersListActions();
    let { usersList } = useTypedSelector(state => state.usersList);

    React.useEffect(() => {
        fetchUsers();
    }, []);

    if (localStorage.getItem('tokenExpirationTime') === 'expired') {
        setTimeout(() => localStorage.removeItem('tokenExpirationTime'), 1000);

        return <TokenExpiredUI error={'Your session time is over. Please, log in again.'} />;
    }

    return (
        <HomePageContainer>
            <HomePageTitle>List of users:</HomePageTitle>
            <UsersTable users={usersList} />
        </HomePageContainer>
    );
};

export default Users;
