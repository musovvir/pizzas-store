import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	currentPage: 1,
	searchValue: '',
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId: (state, action) => {
			state.categoryId = action.payload;
		},
		setSortProperty: (state, action) => {
			state.sort = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		},
		setFilters: (state, action) => {
			if (Object.keys(action.payload)) {
				state.currentPage = Number(action.payload.currentPage);
				state.categoryId = Number(action.payload.categoryId);
				state.sort = action.payload.sort;
			} else {
				state.currentPage = 1;
				state.categoryId = 0;
				state.sort = {
					nama: 'популярности',
					sortProperty: 'rating',
				};
			}
		},
	},
});

export const { setCategoryId, setSortProperty, setCurrentPage, setSearchValue, setFilters } =
	filterSlice.actions;

export default filterSlice.reducer;
