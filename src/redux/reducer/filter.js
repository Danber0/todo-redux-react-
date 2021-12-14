const initialState = {
	filteredBy: 'all'
}

export const filterReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_FILTER':
			return {
				filteredBy: action.payload,
			};
		default:
	}
	return state
}

