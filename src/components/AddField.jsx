import React from 'react';

import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({ onAddTaks }) => {
  const [inputTextTask, setInputTextTask] = React.useState('');
  const [checkbox, setCheckbox] = React.useState(false);

  const chekBox = () => {
    setCheckbox(!checkbox);
  };

  return (
    <div className="field">
      <Checkbox
        onClick={chekBox}
        checked={checkbox}
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField
        value={inputTextTask}
        onChange={(event) => setInputTextTask(event.target.value)}
        placeholder="Введите текст задачи..."
        variant="standard"
        fullWidth
      />
      <Button onClick={() => onAddTaks(inputTextTask, checkbox, setInputTextTask, setCheckbox)}>
        <AddIcon />
      </Button>
    </div>
  );
};
