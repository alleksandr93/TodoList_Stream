import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';
// Типизация
type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filterValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    filterValue:string
}
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist: React.FC<TodolistPropsType> = ({title, tasks, removeTask, changeTodolistFilter, addTask, changeTaskStatus,filterValue}) => {
    // Input Стейт
    const [taskTitle, setTaskTitle] = useState('')
    const [inputError,setInputError]=useState(false)
    // Проходим Map
    const listItems: Array<JSX.Element> = tasks.map(el => {
        const onclickHeandler = () => {
            removeTask(el.id)
        }
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(el.id, event.currentTarget.checked)
        }
        return (
            <li key={el.id} className={el.isDone ? 'task-done' : 'task'}>
                <input type="checkbox" checked={el.isDone} onChange={onChangeHandler}/>
                <span>{el.title}</span>
                <Button onClickHandler={onclickHeandler} title={'X'}/>
            </li>
        )
    })
    const tasksList = tasks.length !== 0
        ? <ul>{listItems}</ul>
        : <span>Tasks list is empty</span>
    const onChangeSetTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
       inputError && setInputError(false)
        setTaskTitle(event.currentTarget.value)
    }
    // Проверка на пробелы
    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(taskTitle)
        } else {
            setInputError(true)
        }
        setTaskTitle('')
    }
    // Запуск кнопочки
    const addTaskKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter') {
            if (taskTitle.trim()) {
                addTask(taskTitle)
            } else {
                setInputError(true)
            }
            setTaskTitle('')
        }
    }
    return (
        <div className={'todoList'}>
            <h3>{title}</h3>
            <div>
                <input onKeyDown={addTaskKeyDownHandler} value={taskTitle} onChange={onChangeSetTaskTitle} className={inputError ? 'input-error':''}/>
                <Button isDisabled={!taskTitle.trim()} title={'+'} onClickHandler={addTaskHandler}/>
                {inputError && <div style={{color:'red', fontWeight:'700'}}>Error: Title is required</div>}
            </div>
            {tasksList}
            <div>
                <Button classes={filterValue==='All' ? 'btn-active':''} onClickHandler={() => changeTodolistFilter('All')} title={'All'}/>
                <Button classes={filterValue==='Active' ? 'btn-active':''} onClickHandler={() => changeTodolistFilter('Active')} title={'Active'}/>
                <Button classes={filterValue==='Completed' ? 'btn-active':''} onClickHandler={() => changeTodolistFilter('Completed')} title={'Completed'}/>
            </div>
        </div>
    );
};
