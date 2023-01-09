import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./Reducers/todolistsReducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type tasksType = {
    id: string
    title: string
    isDone: boolean
}
export type tasksStateType = {
    [key: string]: tasksType[]
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolist] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<tasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    function removeTodolist(todolistId: string) {
        dispatchTodolist(removeTodolistAC(todolistId))
    }

    function addTodolist(title: string) {
        let newTodolistId = v1()
        dispatchTodolist(addTodolistAC(newTodolistId, title))
        setTasks({...tasks, [newTodolistId]: []})
    }

    const changeTodolistTitle = (todolistId: string, newValue: string) => {
        dispatchTodolist(changeTodolistTitleAC(todolistId, newValue))
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatchTodolist(changeFilterAC(todolistId, value))
    }

    function removeTask(todolistId: string, id: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
    }

    function addTask(todolistId: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const changeTasksTitle = (todolistId: string, taskId: string, newValue: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newValue} : t)})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id];


                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                }
                return (
                    <Todolist
                        todolistId={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTasksTitle={changeTasksTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                )
            })}

        </div>
    );
}

export default App;
