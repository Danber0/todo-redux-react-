const initialState = [
	{
		id: 0,
		text: 'Первая задача',
		completed: true,
	},
	{
		id: 1,
		text: 'Вторая задача',
		completed: false,
	},
	{
		id: 2,
		text: 'Третья задача',
		completed: true,
	},
	{
		id: 3,
		text: 'Четвертая задача',
		completed: true,
	},
	{
		id: 4,
		text: 'Пятая задача',
		completed: false,
	},
]

export const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TASK':
			return [
				...state,
				{
					id: state.length,
					text: action.payload.text,
					completed: action.payload.checked,
				}
			];
		case 'REMOVE_TASK':
			return state.filter((elem) => elem.id !== action.payload)
		case 'REMOVE_ALL_TASK':
			return []
		case 'TOGGLE_COMPLETED_TASK':
			return state.map((obj) =>
				obj.id === action.payload
					? {
						...obj,
						completed: !obj.completed,
					}
					: obj,
			);
		case 'TOGGLE_COMPLETED_ALL_TASK':
			return state.map((obj) => ({
				...obj,
				completed: true,
			}))
		case 'SET_EDIT_TASK':
			return state.map((obj) => obj.id === action.payload.id
				? {
					...obj,
					text: action.payload.text,
				}
				: obj)

		default:
	}
	return state;
};