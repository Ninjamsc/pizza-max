import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { list } from '../components/Sort';

import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';
import axios from 'axios';

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
	const navigate = useNavigate();
	// const categoryId = useSelector(state => state.filter.categoryId);
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { categoryId, sort, currentPage } = useSelector(state => state.filter);

	// const sortType = useSelector(state => state.filter.sort.sortProperty);

	const { searchValue } = React.useContext(SearchContext);
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	// const [categoryId, setCategoryId] = React.useState(0);
	// const [currentPage, setCurrentPage] = React.useState(1);
	const [pageCount, setPageCount] = React.useState(1);
	// const [sortType, setSortType] = React.useState({
	// 	name: 'популярности',
	// 	sortProperty: 'rating',
	// });

	const onChangeCategory = id => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = number => {
		dispatch(setCurrentPage(number));
	};

	console.log(sort.sortProperty);

	const fetchPizzas = async () => {
		setIsLoading(true);

		const sortBy = sort.sortProperty;
		// .replace('-', '');
		// const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `&category=${categoryId}` : '';
		const search = searchValue ? `&title_like=${searchValue}` : '';

		// fetch(
		// 	`http://localhost:3001/items?_page=${currentPage}&_per_page=8${category}&_sort=${sortBy}${search}`
		// )
		// 	.then(res => res.json())
		// 	.then(data => {
		// 		console.log(data.data);
		// 		console.log(data);
		// 		setItems(data.data);N
		// 		setPageCount(data.pages);
		// 		setIsLoading(false);
		// 	});

		const fetchItems = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3001/items?_page=${currentPage}&_per_page=8${category}&_sort=${sortBy}${search}`
				);

				// .then(res => res.data)
				// .then(response => {
				// 	console.log('что в рес?', response);
				// console.log('что в дата?', data);
				// console.log('что в рес.дата?', response.data);
				const data = response.data.data;
				// console.log('что в дата.дата?', data.data);
				// console.log('что в дата.дата.дата?', data.data.data);
				if (Array.isArray(data)) {
					console.log('data является массивом:', data);
					// Ваш код для работы с массивом
				} else {
					console.log('data не является массивом:', data);
					// Обработка случая, когда data не массив
				}
				setItems(data);
				console.log('что в items?', items);
				// const filteredData = data.data.filter(item => {
				// Your filtering logic here
				// });
				// Use filteredData as needed
				// })

				// setItems(data.data);
				// console.log('что в items?', items);
				setPageCount(response.data.pages);
				setIsLoading(false);
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			}
		};
		fetchItems();
		// axios
		// 	.get(
		// 		`http://localhost:3001/items?_page=${currentPage}&_per_page=8${category}&_sort=${sortBy}${search}`
		// 	)
		// 	// .then(res => res.data)
		// 	.then(response => {
		// 		console.log('что в рес?', response);
		// 		// console.log('что в дата?', data);
		// 		console.log('что в рес.дата?', response.data);
		// 		const data = response.data.data;
		// 		console.log('что в дата.дата?', data.data);
		// 		// console.log('что в дата.дата.дата?', data.data.data);
		// 		if (Array.isArray(data)) {
		// 			console.log('data является массивом:', data);
		// 			// Ваш код для работы с массивом
		// 		} else {
		// 			console.log('data не является массивом:', data);
		// 			// Обработка случая, когда data не массив
		// 		}
		// 		// const filteredData = data.data.filter(item => {
		// 		// Your filtering logic here
		// 		// });
		// 		// Use filteredData as needed
		// 		// })

		// 		setItems(data.data);
		// 		console.log('что в items?', items);
		// setPageCount(res.pages);
		// setIsLoading(false);
		// 	});
		// setItems(data);
		console.log('что в items?', items);
		console.log(items);
	};
	// Если изменили параметры и если был первый рендер, то подставь параметры из редакса;
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);

	// Если был первый рендер, то проверяем url-параметры и сохраняем в redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = list.find(obj => obj.sortProperty === params.sortProperty);

			// list.forEach(obj => {
			// 	if (obj.sortProperty === params.sortProperty) {
			// 		dispatch(setSort(obj));
			// 	}
			// });
			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearch.current = true;
		}
	}, []);
// Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			fetchPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage, pageCount]);

	console.log(items);
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
				currentPage={currentPage}
				onChangePage={onChangePage}
				pageCount={pageCount}
			/>
		</div>
	);
};

export default Home;
