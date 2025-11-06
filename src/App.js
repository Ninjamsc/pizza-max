import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';
import { decrement, increment } from './redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

// import pizzas from "./assets/pizzas.json";
// import axios from "axios";

export const SearchContext = React.createContext('');

function App() {
	const [searchValue, setSearchValue] = React.useState('');
	const count = useSelector(state => state.counter.value);
	const dispatch = useDispatch();

	const path = window.location.pathname;
	if (path === '/404') {
		return <NotFound />;
	}

	return (
		<div className='wrapper'>
			<button
				aria-label='Increment value'
				onClick={() => dispatch(increment())}
			>
				Increment
			</button>
			<span>{count}</span>
			<button
				aria-label='Decrement value'
				onClick={() => dispatch(decrement())}
			>
				Decrement
			</button>
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='' element={<Home searchValue={searchValue} />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;
