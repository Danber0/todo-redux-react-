export const SET_FILTER = (arrFiltered, index) => {
	return {
		type: 'SET_FILTER',
		payload: arrFiltered[index],
	}
}