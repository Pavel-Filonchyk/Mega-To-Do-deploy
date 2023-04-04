import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  PlusCircleOutlined, 
  DeleteOutlined, 
  CheckSquareOutlined, 
  EditOutlined, 
  CarryOutOutlined } from '@ant-design/icons'

import { addTask, deleteTask } from '../../core/actions/tasksAction'
import { addCheck } from '../../core/actions/addCheckAction'

import style from './Main.module.scss'

export default function Main() {
  
  const [task, setTask] = useState('')
  const [editTask, setEditTask] = useState(null)
  const [changeTask, setChangeTask] = useState('')
  
  const tasks = useSelector(({ getTasks: { tasks } }) => tasks)
  const check = useSelector(({ addCheck: { check } }) => check)

  const dispatch = useDispatch()

  const ref = useRef()

  useEffect(() => {
    //dispatch(getTasks())
    ref.current?.focus()
  }, [changeTask])

 
  const onAddTask = () => {
    dispatch(addTask(task))
  }
  const onEditTask = (id) => {
    setEditTask(id)
    const filter = tasks.filter(item => item.id === id)
    setChangeTask(filter?.[0].task)
  }
  const onDeleteTask = (id) => {
    dispatch(deleteTask(id))
  }
  const onCheck = (id) => {
    dispatch(addCheck(id))
  }

  return (
    <>
      <div className={style.mainWrapper}> 
        <span className={style.title}>TO-DO LIST</span>
        <div className={style.addTask}>
          <input 
            value={task} 
            className={style.inputTask}
            onChange={(e) => setTask(e.target.value)}
          />
          <div className={style.iconMainPlus}>
            <PlusCircleOutlined 
              className={style.iconPlus}
              onClick={() => onAddTask()}
            />
          </div>
          <span style={{marginTop: 3}}>Add Task</span>
        </div>
        <div className={style.wrapToDo}>
          {
            tasks.map((item, id) => {
              return (
                <div 
                  className={style.tasks} 
                  key={item.id}
                >
                  <CarryOutOutlined 
                    className={check?.find(elem => elem === item.id) ? style.checked : style.check}
                    onClick={() => onCheck(item.id)}
                  />
                  {
                    editTask === item.id ? (
                      <div>
                        <input 
                          className={style.inputTask} 
                          value={changeTask}
                          ref={ref}
                          onChange={(e) => setChangeTask(e.target.value)}
                        /> 
                        <CheckSquareOutlined className={style.saveTask}/>
                      </div>
                     
                    ) : (
                      <div className={style.task}>
                        {item.task}
                      </div>
                    )
                  } 
                  <EditOutlined 
                    className={style.changeTask} 
                    onClick={() => onEditTask(item.id)}
                  />
                  <DeleteOutlined
                    className={style.basket} 
                    onClick={() => onDeleteTask(item.id)}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}


