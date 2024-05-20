import React from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (taskId: number) => void
    changeTodolistFilter: (filterValue: FilterValuesType) => void
}
export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}
export const Todolist: React.FC<TodolistPropsType> = ({title, tasks, removeTask, changeTodolistFilter}) => {
    const mapping: JSX.Element | Array<JSX.Element> = tasks.length === 0 ? <p>Нет тасок</p> : tasks.map(el => {
        return (
            <li key={el.id}>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>

            </li>
        )
    })
    const listItems: Array<JSX.Element> = tasks.map(el => {
        const onclickHeandler = () => {
            removeTask(el.id)
        }
        return <li key={el.id}>
            <input type="checkbox" checked={el.isDone}/>
            <span>{el.title}</span>
            <Button onClickHandler={onclickHeandler} title={'X'}/>
        </li>
    })
    const tasksList = tasks.length !== 0
        ? <ul>{listItems}</ul>
        : <span>Tasks list is empty</span>
    return (
        <div className={'todoList'}>
            <h3>{title}</h3>
            <div>
                <input/>
               <Button title={'+'}/>
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
