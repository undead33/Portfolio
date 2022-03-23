import * as React from 'react';
import styled from 'styled-components';
import ButtonMUI from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useUserActions, useUsersListActions } from 'hooks/useActions';
import { useNavigate } from 'react-router-dom';

const Button = styled(ButtonMUI)({
    padding: 0,
    width: 10,
});

const ArrowDown = styled(MdOutlineKeyboardArrowDown)({
    color: 'var(--colors-text-secondary)',
    cursor: 'pointer',
    fontSize: 24,
});

export default function DropDownMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => { setAnchorEl(null); };
    const { userLogout } = useUserActions();
    const { clearUsersList } = useUsersListActions();
    const navigate = useNavigate();
    const redirectToAccountPage = () => {
        setAnchorEl(null);
        navigate('/account');
    };
    const logout = () => {
        userLogout();
        clearUsersList();
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationTime');
        localStorage.removeItem('user');
        navigate('/home');
    };

    return (
        <div>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <ArrowDown />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={redirectToAccountPage}>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
