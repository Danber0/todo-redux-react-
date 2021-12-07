import React from 'react';

import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: state.length,
          text: action.payload.text,
          complited: action.payload.checked,
        },
      ];
    case 'REMOVE_TASK':
      return state.filter((elem) => elem.id !== action.payload);
  }
  return state;
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, [
    {
      id: 0,
      text: 'Первая задача',
      complited: false,
    },
    {
      id: 1,
      text: 'Вторая задача',
      complited: true,
    },
  ]);

  const addTaks = (text, checked) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        text,
        checked,
      },
    });
  };

  const removeTaks = (id) => {
    if (window.confirm('ты реально этого хочешь?!')) {
      dispatch({
        type: 'REMOVE_TASK',
        payload: id,
      });
    }
  };

  console.log(state);

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задачек</h4>
        </Paper>
        <AddField onAddTaks={addTaks} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => (
            <Item
              key={obj.id}
              text={obj.text}
              complited={obj.complited}
              removeTaks={() => removeTaks(obj.id)}
            />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
