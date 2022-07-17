import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import SkeletonPizza from '../components/PizzaBlock/SkeletonPizza';
import Sort from '../components/Sort';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { sortList } from '../components/Sort';

const Home = () => {
	const navigate = useNavigate();
	const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter);
	const { items, status } = useSelector((state) => state.pizza);
	const isMounted = React.useRef(false);
	const dispatch = useDispatch();

	const skeletons = [...new Array(6)].map((_, i) => <SkeletonPizza key={i} />);
	const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	const getPizzas = async () => {
		const category = categoryId > 0 ? `&category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');

		dispatch(fetchPizzas({ category, search, order, sortBy, currentPage }));

		window.scrollTo(0, 0);
	};

	// Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		getPizzas();
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	// Если изменили параметры и был первый рендер
	React.useEffect(() => {
		if (isMounted.current) {
			const params = {
				categoryId: categoryId > 0 ? categoryId : null,
				sortProperty: sort.sortProperty,
				currentPage,
			};
			const queryString = qs.stringify(params);
			navigate(`/?${queryString}`);
		}
	}, [categoryId, sort.sortProperty, searchValue, currentPage, navigate]);

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
			if (sort) {
				params.sort = sort;
			}
			dispatch(setFilters(params));
		}
		isMounted.current = true;
	}, [dispatch]);

	// Если был первый рендер, то запрашиваем пиццы
	React.useEffect(() => {
		if (!window.location.search) {
			fetchPizzas();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="container">
				<div className="content__top">
					<Categories value={categoryId} onChangeCategory={onChangeCategory} />
					<Sort />
				</div>
				<h2 className="content__title">Все пиццы</h2>
				{status === 'error' ? (
					<div className="content__error-info">
						<h2>Произошла ошибка (-_-)</h2>
						<p>
							К сожалению, не удалось получить питсы.
							<br />
							Попробуйте повторить попытку позже.
						</p>
					</div>
				) : (
					<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
				)}

				<Pagination currentPage={currentPage} onChangePage={onChangePage} />
			</div>
		</>
	);
};

export default Home;
