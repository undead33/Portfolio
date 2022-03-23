import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const EmptyDataListContainer = styled(Box)({
    marginTop: 40,
    display: 'grid',
    gridTemplateRows: '60px 60px',
    justifyContent: 'center',
    gap: 10,
});

export const AddBtnModalWindowWrapper = styled(Box)({
    display: 'grid',
    justifyContent: 'center',
});
