import React from 'react';
import './App.css';
import {TaskPropsType, Todolist} from './Todolist';

function App(): JSX.Element {
    const tasks_1: Array<TaskPropsType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ]
    const tasks_2: Array<TaskPropsType> = [
        {id: 1, title: 'Meat', isDone: true},
        {id: 2, title: 'Fish', isDone: true},
        {id: 3, title: 'Water', isDone: true},
    ]
    return (
        <div className="App">
            <Todolist tasks={tasks_1} title={'What to learn?'}/>
            <Todolist tasks={tasks_2} title={'What to buy?'}/>

        </div>
    );
}


export default App;
