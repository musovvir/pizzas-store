import React from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

const Search = () => {
	const [value, setValue] = React.useState('');
	const inputRef = React.useRef();
	const dispatch = useDispatch();

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current.focus();
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const updateSearchValue = React.useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str));
		}, 500),
		[],
	);

	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				enableBackground="new 0 0 32 32"
				id="Editable-line"
				version="1.1"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg">
				<circle
					cx="14"
					cy="14"
					fill="none"
					id="XMLID_42_"
					r="9"
					stroke="#000000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeMiterlimit="10"
					strokeWidth="2"
				/>
				<line
					fill="none"
					id="XMLID_44_"
					stroke="#000000"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeMiterlimit="10"
					strokeWidth="2"
					x1="27"
					x2="20.366"
					y1="27"
					y2="20.366"
				/>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles.input}
				placeholder="Поиск пиццы"
			/>
			{value ? (
				<svg
					onClick={onClickClear}
					className={styles.clearIcon}
					data-name="Layer 1"
					height="200"
					id="Layer_1"
					viewBox="0 0 200 200"
					width="200"
					xmlns="http://www.w3.org/2000/svg">
					<title />
					<path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
				</svg>
			) : null}
		</div>
	);
};

export default Search;
