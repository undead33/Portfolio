import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from 'store/reducers/userReducer';
import medicinesReducer from 'store/reducers/medicinesReducer';
import clinicsReducer from 'store/reducers/clinicsReducer';
import usersListReducer from 'store/reducers/usersListReducer';
import tasksReducer from 'store/reducers/tasksReducer';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({ 
      reducer: { 
        user: userReducer,
        medicines: medicinesReducer,
        clinics: clinicsReducer,
        usersList: usersListReducer,
        tasks: tasksReducer,
      }, 
      preloadedState, 
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
