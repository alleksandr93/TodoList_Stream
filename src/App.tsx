import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from './Todolist';
import {v1} from 'uuid';


export type FilterValuesType = 'All' | 'Active' | 'Completed'


function App(): JSX.Element {

    // Данные
    const [task, setTask] = React.useState<TaskPropsType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])
    // Создание локального стейта для фильтра кнопок
    const [filterValue, setFilterValue] = useState<FilterValuesType>('All')
    const changeTodolistFilter = (filterValue: FilterValuesType) => {
        setFilterValue(filterValue)
    }
    // Создаем функцию которая фильтруем таски в зависимосити от состояния фильтра
    const getFilyeredTask = (tasks: Array<TaskPropsType>, filterValue: FilterValuesType): Array<TaskPropsType> => {
        return filterValue === 'Active'
            ? task.filter(el => !el.isDone)
            : filterValue === 'Completed'
                ? task.filter(el => el.isDone)
                : task
    }
    // Добавление тасок
    const addTask = (title: string) => {
        setTask([{id: v1(), title, isDone: false}, ...task])
    }
    // Удалиние таски
    const removeTask = (taskId: string) => {
        setTask(task.filter(el => el.id !== taskId))
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean) => {
        const nextState: TaskPropsType[] =
            task.map(el => el.id === taskId ? {...el, isDone: newIsDoneValue} : el)
        setTask(nextState)
    }
    return (
        <div className="App">
            <Todolist changeTodolistFilter={changeTodolistFilter}
                      removeTask={removeTask}
                      addTask={addTask}
                      tasks={getFilyeredTask(task, filterValue)}
                      title={'What to learn?'}
                      changeTaskStatus={changeTaskStatus}
                      filterValue={filterValue}/>


        </div>
    );
}


export default App;
