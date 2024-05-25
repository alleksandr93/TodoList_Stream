import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';
import {log} from 'node:util';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filterValue: FilterValuesType) => void
    addTask: (title: string) => void
}
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}
export const Todolist: React.FC<TodolistPropsType> = ({title, tasks, removeTask, changeTodolistFilter, addTask}) => {
    const [taskTitle, setTaskTitle] = useState('')
    const listItems: Array<JSX.Element> = tasks.map(el => {
        const onclickHeandler = () => {
            removeTask(el.id)
        }
        return (
            <li key={el.id}>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
                <Button onClickHandler={onclickHeandler} title={'X'}/>
            </li>
        )
    })
    const tasksList = tasks.length !== 0
        ? <ul>{listItems}</ul>
        : <span>Tasks list is empty</span>
    const onChangeSetTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    console.log(taskTitle.trim())
    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(taskTitle)
        } else {
            alert('У тебя одни пробелы')
        }
        setTaskTitle('')
    }
    const addTaskKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (taskTitle.trim()) {
                addTask(taskTitle)
            } else {
                alert('У тебя одни пробелы')
            }
            setTaskTitle('')
        }
    }
    return (
        <div className={'todoList'}>
            <h3>{title}</h3>
            <div>
                <input onKeyDown={addTaskKeyDownHandler} value={taskTitle} onChange={onChangeSetTaskTitle}/>
                <Button isDisabled={!taskTitle} title={'+'} onClickHandler={addTaskHandler}/>
            </div>
            {tasksList}
            <div>
                <Button onClickHandler={() => changeTodolistFilter('All')} title={'All'}/>
                <Button onClickHandler={() => changeTodolistFilter('Active')} title={'Active'}/>
                <Button onClickHandler={() => changeTodolistFilter('Completed')} title={'Completed'}/>
            </div>
        </div>
    );
};
