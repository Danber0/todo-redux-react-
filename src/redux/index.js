import { combineReducers, createStore } from 'redux'
import { tasksReducer } from "./reducer/tasks";
import { filterReducer } from "./reducer/filter";


const rootReducer = combineReducers({
	filter: filterReducer,
	tasks: tasksReducer,
})

export const store = createStore(rootReducer)