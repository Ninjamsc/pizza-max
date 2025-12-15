import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
	const [value, setValue] = React.useState('');
	const { setSearchValue } = React.useContext(SearchContext);

	const inputRef = React.useRef();
	const onClickClear = () => {
		setSearchValue('');
		setValue('');
		inputRef.current.focus();
	};

	const updateSearchValue = React.useCallback(
		debounce(str => {
			setSearchValue(str);
		}, 1000),
		[]
	);
	const onChangeInput = event => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.search__icon}
				version='1.1'
				id='Capa_1'
				xmlns='http://www.w3.org/2000/svg'
				x='0px'
				y='0px'
				width='632.399px'
				height='632.399px'
				viewBox='0 0 632.399 632.399'
				enableBackground='new 0 0 632.399 632.399'
			>
				<path
					d='M255.108,0C119.863,0,10.204,109.66,10.204,244.904c0,135.245,109.659,244.905,244.904,244.905
		c52.006,0,100.238-16.223,139.883-43.854l185.205,185.176c1.671,1.672,4.379,1.672,5.964,0.115l34.892-34.891
		c1.613-1.613,1.47-4.379-0.115-5.965L438.151,407.605c38.493-43.246,61.86-100.237,61.86-162.702
		C500.012,109.66,390.353,0,255.108,0z M255.108,460.996c-119.34,0-216.092-96.752-216.092-216.092
		c0-119.34,96.751-216.091,216.092-216.091s216.091,96.751,216.091,216.091C471.199,364.244,374.448,460.996,255.108,460.996z'
				/>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Поиск пиццы...'
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.clear__icon}
					data-name='Layer 1'
					height='200'
					id='Layer_1'
					viewBox='0 0 200 200'
					width='200'
					xmlns='http://www.w3.org/2000/svg'
				>
					<title />
					<path d='M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z' />
				</svg>
			)}
		</div>
	);
};

export default Search;
