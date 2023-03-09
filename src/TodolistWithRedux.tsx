import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './Components/AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {Task} from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const TodolistWithRedux = ((props: PropsType) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const dispatch = useDispatch()

    const addTask = (title: string) => dispatch(addTaskAC(title, props.id))
    const removeTask = (taskId: string) => dispatch(removeTaskAC(props.id, taskId))
    const changeTaskStatus = (id: string, isDone: boolean) => dispatch(changeTaskStatusAC(id, isDone, props.id))
    const changeTaskTitle = (taskId: string, newTitle: string) => dispatch(changeTaskTitleAC(taskId, newTitle, props.id))

    const onAllClickHandler = () => dispatch(ChangeTodolistFilterAC(props.id, "all"))
    const onActiveClickHandler = () => dispatch(ChangeTodolistFilterAC(props.id, "active"))
    const onCompletedClickHandler = () => dispatch(ChangeTodolistFilterAC(props.id, "completed"))


    const removeTodolist = () => dispatch(RemoveTodolistAC(props.id))
    const changeTodolistTitle = (title: string) => dispatch(ChangeTodolistTitleAC(props.id, title))


    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    return <Task key={t.id} task={t} changeTaskStatus={changeTaskStatus}
                                 changeTaskTitle={changeTaskTitle}
                                 removeTask={removeTask}/>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


