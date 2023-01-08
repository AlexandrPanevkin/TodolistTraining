import {tasksStateType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: tasksStateType, action: tasksReducerType) => {
    switch (action.type) {
        case "ADD-TASK": {
            let task = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistId]: [task, state[action.payload.todolistId]]}
        }
        default:
            return state
    }
}

type tasksReducerType = addTaskACType

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title
        }
    } as const
}