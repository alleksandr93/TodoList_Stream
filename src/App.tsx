import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from './Todolist';

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App(): JSX.Element {
    const [task, setTask] = React.useState<TaskPropsType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ])
    const [filterValue, setFilterValue] = useState<FilterValuesType>('All')
    const changeTodolistFilter = (filterValue:FilterValuesType)=>{
        setFilterValue(filterValue)
    }

    const getFilyeredTask = (tasks: Array<TaskPropsType>, filterValue: FilterValuesType):Array<TaskPropsType> => {
        return filterValue === 'Active'
            ? task.filter(el => !el.isDone)
            : filterValue === 'Completed'
                ? task.filter(el => el.isDone)
                : task
    }
    const removeTask = (taskId: number) => {
        setTask(task.filter(el => el.id !== taskId))
    }
    return (
        <div className="App">
            <Todolist changeTodolistFilter={changeTodolistFilter} removeTask={removeTask} tasks={getFilyeredTask(task,filterValue)} title={'What to learn?'}/>

        </div>
    );
}


export default App;
