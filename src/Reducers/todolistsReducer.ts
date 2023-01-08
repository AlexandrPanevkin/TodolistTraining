import {FilterValuesType, TodolistsType} from "../App";

export const todolistsReducer = (state: TodolistsType[], action: generalType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistsType = {
                id: action.payload.newTodolistId,
                title: action.payload.title,
                filter: 'all'
            }
            return (
                [newTodolist, ...state]
            )
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(t => t.id === action.payload.todolistId ? {...t, title: action.payload.newValue} : t)
            // setTodolists(todolists.map(t=>t.id===todolistId ? {...t, title: newValue} : t))
        }
        case "CHANGE-FILTER": {
            return state.map(t => t.id === action.payload.todolistId ? {...t, filter: action.payload.value} : t)
        }
        default:
            return state
    }
}

type generalType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterAC

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, newTodolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            newTodolistId
        }
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newValue: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newValue
        }
    } as const
}

type changeFilterAC = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistId,
            value
        }
    } as const
}