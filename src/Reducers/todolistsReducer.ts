import {FilterValuesType, TodolistsType} from "../App";

export const todolistsReducer = (state: TodolistsType[], action: generalType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistsType = {
                id: action.payload.newTodolistId,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map((el => el.id === action.payload.todolistId ? {...el, title: action.payload.newValue} : el))
        }
        case "CHANGE-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
        }

        default:
            return state
    }
}

type generalType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType

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

export const addTodolistAC = (newTodolistId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistId,
            title
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

type changeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (todolistId: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistId,
            value
        }
    } as const
}