export const ADD_TASK = (text, checked) => {
	return {
		type: 'ADD_TASK',
		payload: {
			text,
			checked,
		},
	}
}

export const REMOVE_TASK = (id) => {
	return {
		type: 'REMOVE_TASK',
		payload: id,
	}
}

export const REMOVE_ALL_TASK = () => {
	return {
		type: 'REMOVE_ALL_TASK',
	}
}

export const TOGGLE_COMPLETED_TASK = (id) => {
	return {
		type: 'TOGGLE_COMPLETED_TASK',
		payload: id,
	}
}

export const TOGGLE_COMPLETED_ALL_TASK = () => {
	return {
		type: 'TOGGLE_COMPLETED_ALL_TASK',
	}
}

export const SET_EDIT_TASK = (id, newTaskEdit) => {
	return {
		type: 'SET_EDIT_TASK',
		payload: {text: newTaskEdit, id},
	}
}
