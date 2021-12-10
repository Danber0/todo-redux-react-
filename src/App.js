import React from 'react';

import {Paper, Divider, Button, List, Tabs, Tab} from '@mui/material';
import {AddField} from './components/AddField';
import {Item} from './components/Item';

const reducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TASK':
			return {
				...state, tasks: [
					...state.tasks, {
						id: state.tasks.length, text: action.payload.text,
						completed: action.payload.checked,
					},
				],
			};
		case 'REMOVE_TASK':
			return {
				...state,
				tasks: state.tasks.filter((elem) => elem.id !== action.payload),
			};
		case 'REMOVE_ALL_TASK':
			return {
				...state,
				tasks: [],
			};
		case 'TOGGLE_COMPLETED':
			return {
				...state,
				tasks: state.tasks.map((obj) =>
					obj.id === action.payload
						? {
							...obj,
							completed: !obj.completed,
						}
						: obj,
				),
			};
		case 'TOGGLE_COMPLETED_ALL':
			return {
				...state,
				tasks: state.tasks.map((obj) => ({
					...obj,
					completed: true,
				})),
			};
		case 'SET_FILTER':
			return {
				...state,
				filteredBy: action.payload,
			};
		case 'SET_EDIT':
			console.log(state.tasks)
			return {
				...state,
				tasks: state.tasks.map((obj) => obj.id === action.payload.id
					? {
						...obj,
						text: action.payload.text,
					}
					: obj),
			};
		default:
	}
	return state;
};

function App() {
	const [state, dispatch] = React.useReducer(reducer, {
		filteredBy: 'all',
		tasks: [
			{
				id: 0,
				text: 'Первая задача',
				completed: false,
			},
			{
				id: 1,
				text: 'Вторая задача',
				completed: true,
			},
			{
				id: 2,
				text: 'Третья задача',
				completed: true,
			},
			{
				id: 3,
				text: 'Четвертая задача',
				completed: false,
			},
			{
				id: 4,
				text: 'Пятая задача',
				completed: true,
			},
		],
	});

	const arrFiltered = ['all', 'active', 'ended'];

	const addTask = (text, checked) => {
		dispatch({
			type: 'ADD_TASK',
			payload: {
				text,
				checked,
			},
		});
	};

	const removeTask = (id) => {
		if (window.confirm('ты реально этого хочешь?!')) {
			dispatch({
				type: 'REMOVE_TASK',
				payload: id,
			});
		}
	};

	const removeAllTask = () => {
		if (window.confirm('ты реально этого хочешь?!')) {
			dispatch({
				type: 'REMOVE_ALL_TASK',
			});
		}
	};

	const toggleComplete = (id) => {
		dispatch({
			type: 'TOGGLE_COMPLETED',
			payload: id,
		});
	};

	const toggleCompleteAll = () => {
		dispatch({
			type: 'TOGGLE_COMPLETED_ALL',
		});
	};

	const setFiltered = (_, index) => {
		dispatch({
			type: 'SET_FILTER',
			payload: arrFiltered[index],
		});
	};

	const onEditItem = (id) => {
		const newTaskEdit = window.prompt('Введите новое значение', state.tasks[id].text);

		if (!newTaskEdit) {
			return;
		}

		if (newTaskEdit.trim()) {
			dispatch({
				type: 'SET_EDIT',
				payload: {text: newTaskEdit, id},
			});
		}

	};

	return (
		<div className="App">
			<Paper className="wrapper">
				<Paper className="header" elevation={0}>
					<h4>Список задачек</h4>
				</Paper>
				<AddField onAddTask={addTask}/>
				<Divider/>
				<Tabs onChange={setFiltered} value={arrFiltered.indexOf(state.filteredBy)}>
					<Tab label="Все"/>
					<Tab label="Активные"/>
					<Tab label="Завершённые"/>
				</Tabs>
				<Divider/>
				<List>
					{state.tasks
						.filter((obj) => {
							if (state.filteredBy === 'all') {
								return true;
							}
							if (state.filteredBy === 'active') {
								return !obj.completed;
							}
							if (state.filteredBy === 'ended') {
								return obj.completed;
							}
							return obj;
						})
						.map((obj) => (
							<Item
								key={obj.id}
								text={obj.text}
								completed={obj.completed}
								removeTask={() => removeTask(obj.id)}
								onClickCheckBox={() => toggleComplete(obj.id)}
								handleEditItem={() => onEditItem(obj.id)}
							/>
						))}
				</List>
				<Divider/>
				<div className="check-buttons">
					<Button disabled={!state.tasks.length} onClick={toggleCompleteAll}>
						Отметить всё
					</Button>
					<Button disabled={!state.tasks.length} onClick={removeAllTask}>
						Очистить
					</Button>
				</div>
			</Paper>
		</div>
	);
}

export default App;
