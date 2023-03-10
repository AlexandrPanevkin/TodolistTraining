import {TasksStateType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type ActionsType = removeTaskActionType | addTaskActionType | changeTaskStatusType | changeTaskTitleType | AddTodolistActionType | RemoveTodolistActionType;

const initialState:TasksStateType  = {}

export const tasksReducer = (state= initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK':
            let task = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [task, ...state[action.todolistId]]}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todolistId]: state[action.todolistId].map(el=>el.id === action.id ? {...el, isDone: action.isDone} : el)}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.todolistId]: state[action.todolistId].map(el=>el.id === action.id ? {...el, title: action.newTitle} : el)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
           return state
    }
}

export type removeTaskActionType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}

export type addTaskActionType = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}

export type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId} as const
}

export type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId} as const
}