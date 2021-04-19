import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';


// USER DEFINED
import Website from "./Components/Website";
import { UtilityStyles } from './Styles/Utils'
import { store } from "./Redux/Store";

//THEME
import 'antd/dist/antd.less';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter basename={process.env.REACT_APP_BASE_PATH}>
					<Website />
					<UtilityStyles />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
