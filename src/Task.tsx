import React, {ChangeEvent, memo} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    removeTask: (taskId: string) => void
}

export const Task = memo(({
                         task,
                         removeTask,
                         changeTaskStatus,
                         changeTaskTitle
}: TaskPropsType) => {
    let {id, isDone, title} = {...task}

    const onClickHandler = () => removeTask(id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(id, newIsDoneValue);
    }
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(id, newValue);
    }

    return <div className={isDone ? "is-done" : ""}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
});