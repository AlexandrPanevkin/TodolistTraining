import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true)

    }
    const activateViewMode = () => {
        setEditMode(false)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value)
    }

    return editMode ?
        <input autoFocus value={props.value} onBlur={activateViewMode} onChange={changeTitle}/> :
        <span onDoubleClick={activateEditMode}>{props.value}</span>
}
