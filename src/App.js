import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Paper, Divider, Button, List } from "@mui/material";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";
import { Filter } from "./components/Filter";

import {
  ADD_TASK,
  REMOVE_TASK,
  REMOVE_ALL_TASK,
  TOGGLE_COMPLETED_TASK,
  TOGGLE_COMPLETED_ALL_TASK,
  SET_EDIT_TASK,
} from "./redux/action/tasks";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const addTask = (text, checked) => {
    dispatch(ADD_TASK(text, checked));
  };

  const removeTask = (id) => {
    if (window.confirm("ты реально этого хочешь?!")) {
      dispatch(REMOVE_TASK(id));
    }
  };

  const removeAllTask = () => {
    if (window.confirm("ты реально этого хочешь?!")) {
      dispatch(REMOVE_ALL_TASK());
    }
  };

  const toggleComplete = (id) => {
    dispatch(TOGGLE_COMPLETED_TASK(id));
  };

  const toggleCompleteAll = () => {
    dispatch(TOGGLE_COMPLETED_ALL_TASK());
  };

  const onEditItem = (id) => {
    const newTaskEdit = window.prompt(
      "Введите новое значение",
      state.tasks[id].text
    );
    if (!newTaskEdit) {
      return;
    }
    if (newTaskEdit.trim()) {
      dispatch(SET_EDIT_TASK(id, newTaskEdit));
    }
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задачек</h4>
        </Paper>
        <AddField onAddTask={addTask} />
        <Divider />
        <Filter />
        <Divider />
        <List>
          {state.tasks
            .filter((obj) => {
              if (state.filter.filteredBy === "all") {
                return true;
              }
              if (state.filter.filteredBy === "active") {
                return !obj.completed;
              }
              if (state.filter.filteredBy === "ended") {
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
        <Divider />
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
