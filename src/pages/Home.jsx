import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

import { setCategoryId } from '../redux/slices/filterSlice';

/**
 * Home page component
 * @param {object} props - component props
 * @return {ReactElement} - rendered component
 * @description
 * This component renders the home page of the application.
 * It fetches data from the server and renders a list of pizzas.
 * It also renders a pagination component and a sort component.
 * The component uses the context API to get the search value from the search input.
 */
const Home = () => {
	// const categoryId = useSelector(state => state.filter.categoryId);
	const dispatch = useDispatch();
	const { categoryId, sort } = useSelector(state => state.filter);

	// const sortType = useSelector(state => state.filter.sort.sortProperty);

	const { searchValue } = React.useContext(SearchContext);
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	// const [categoryId, setCategoryId] = React.useState(0);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [pageCount, setPageCount] = React.useState(1);
	// const [sortType, setSortType] = React.useState({
	// 	name: 'популярности',
	// 	sortProperty: 'rating',
	// });

	const onChangeCategory = id => {
		dispatch(setCategoryId(id));
	};

	console.log(sort.sortProperty);

	React.useEffect(() => {
		setIsLoading(true);

		const sortBy = sort.sortProperty;
		// .replace('-', '');
		// const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `&category=${categoryId}` : '';
		const search = searchValue ? `&title_like=${searchValue}` : '';

		fetch(
			`http://localhost:3001/items?_page=${currentPage}&_per_page=8${category}&_sort=${sortBy}${search}`
		)
			.then(res => res.json())
			.then(data => {
				console.log(data.data);
				console.log(data);
				setItems(data.data);
				setPageCount(data.pages);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage, pageCount]);

	const pizzas = items
		.filter(data => {
			if (data.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true;
			}
			return false;
		})
		.map(data => <PizzaBlock key={data.id} {...data} />);

	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
				{/* <Sort value={sortType} onChangeSort={i => setSortType(i)} /> */}
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			<Pagination
				onChangePage={number => setCurrentPage(number)}
				pageCount={pageCount}
			/>
		</div>
	);
};

export default Home;
