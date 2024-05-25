import React, {useRef} from 'react';
import {Button} from './Button';
import {FilterValuesType} from './App';

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

    const taskTitleInput = useRef<HTMLInputElement>(null)
    const addTaskHandler = ()=>{
        if(taskTitleInput.current){
            addTask(taskTitleInput.current.value)
            taskTitleInput.current.value = ''
        }
    }


    return (
        <div className={'todoList'}>
            <h3>{title}</h3>
            <div>
                <input ref={taskTitleInput}/>
                <Button  title={'+'} onClickHandler={addTaskHandler}/>
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
