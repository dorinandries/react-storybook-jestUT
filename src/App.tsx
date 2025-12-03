import React from 'react';
import Orders from './pages/Orders';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OrderPage from './pages/Orders/Order';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Orders />} />
					<Route path='/order/:id' element={<OrderPage />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
