import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import 'styles/index.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

ReactDOM.render(
	<React.StrictMode>
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<App />
		</LocalizationProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
