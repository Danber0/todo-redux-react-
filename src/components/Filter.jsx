import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FILTER } from "../redux/action/filter";


export const Filter = () => {
	const dispatch = useDispatch();
	const filteredBy = useSelector(state => state.filter.filteredBy);
	const arrFiltered = ['all', 'active', 'ended'];

	const setFiltered = (_, index) => {
		dispatch(SET_FILTER(arrFiltered, index));
	};

	return (
		<div>
			<Tabs onChange={setFiltered} value={arrFiltered.indexOf(filteredBy)}>
				<Tab label="Все"/>
				<Tab label="Активные"/>
				<Tab label="Завершённые"/>
			</Tabs>
		</div>
	);
};
