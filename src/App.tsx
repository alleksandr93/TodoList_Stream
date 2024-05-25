import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from './Todolist';
import {v1} from 'uuid';



export type FilterValuesType = 'All' | 'Active' | 'Completed'

//C(R)UD
function App(): JSX.Element {

    const [task, setTask] = React.useState<TaskPropsType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
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
    const addTask =(title:string)=>{
        setTask([{id:v1(), title, isDone:false}, ...task])
    }

    const removeTask = (taskId: string) => {
        setTask(task.filter(el => el.id !== taskId))
    }
    return (
        <div className="App">
            <Todolist changeTodolistFilter={changeTodolistFilter}
                      removeTask={removeTask}
                      addTask={addTask}
                      tasks={getFilyeredTask(task,filterValue)}
                      title={'What to learn?'}/>

        </div>
    );
}


export default App;
