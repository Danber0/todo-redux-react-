import React from 'react';

import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const reducer = (state, action) => {
  if (action.type === 'ADD_TASK') {
    return [
      ...state,
      {
        id: state.length + 1,
        text: action.payload.text,
        complited: action.payload.checked,
      },
    ];
  }
  return state;
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, [
    {
      id: 1,
      text: 'Первая задача',
      complited: false,
    },
    {
      id: 2,
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
            <Item key={obj.id} text={obj.text} complited={obj.complited} />
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
