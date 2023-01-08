import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (todolistId: string) => void
    changeTasksTitle: (todolistId: string, taskId: string, newValue: string) => void
    changeTodolistTitle: (todolistId: string, newValue: string) => void
}

export function Todolist(props: PropsType) {

    const AddTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }


    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");

    const onRemoveTodolistClickHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const onChangeTodolistHandler = (newValue: string) => {
        props.changeTodolistTitle(props.todolistId, newValue)
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={onChangeTodolistHandler}/>
            <button onClick={onRemoveTodolistClickHandler}>X</button>
        </h3>
        <AddItemForm addItem={AddTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }
                    const onChangeTaskTitleHandler = (newValue: string) => {
                        props.changeTasksTitle(props.todolistId, t.id, newValue)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onChangeTaskTitleHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
