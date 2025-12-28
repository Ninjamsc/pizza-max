import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ onChangePage, currentPage, pageCount }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel='...'
			nextLabel='>'
			onPageChange={event => onChangePage(event.selected + 1)}
			pageRangeDisplayed={8}
			pageCount={pageCount}
			forcePage={currentPage - 1}
			previousLabel='<'
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
