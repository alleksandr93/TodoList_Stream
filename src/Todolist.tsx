import React from 'react';
import {Button} from './Button';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
}
export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}
export const Todolist: React.FC<TodolistPropsType> = ({title, tasks}) => {
    const mapping: JSX.Element | Array<JSX.Element> = tasks.length === 0 ? <p>Нет тасок</p> : tasks.map(el => {
        return (
            <li key={el.id}><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
        )
    })
    const listItems: Array<JSX.Element> = []
    for (let i = 0; i < tasks.length; i++) {
        const listItem: JSX.Element = <li key={tasks[i].id}><input type="checkbox"
                                                                   checked={tasks[i].isDone}/><span>{tasks[i].title}</span>
        </li>
        listItems.push(listItem)
    }
    return (
        <div className={'todoList'}>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            <ul>{listItems.length > 0 ? listItems : <p>Нет тасок</p>}</ul>
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    );
};
