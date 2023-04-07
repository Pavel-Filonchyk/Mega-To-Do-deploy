import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { 
  PlusCircleOutlined, 
  DeleteOutlined, 
  CheckSquareOutlined, 
  EditOutlined, 
  CarryOutOutlined 
} from '@ant-design/icons'
import { 
  deleteTask, 
  saveTask, 
  newTask, 
  grabFirstTask, 
  grabSecondTask, 
  grabChangeTasks 
} from '../../core/actions/tasksAction'
import { addCheck } from '../../core/actions/addCheckAction'
//import { deleteElem, addElem } from '../../common/utils'

import style from './Tasks.module.scss'

export default function Tasks({ id, todo, subTask}) {

  const [editTask, setEditTask] = useState(null)
  const [showEditTask, setShowEditTask] = useState(false)
  const [changeTask, setChangeTask] = useState('')

  const tasks = useSelector(({ getTasks: { tasks } }) => tasks)
  const check = useSelector(({ addCheck: { check } }) => check)
  const dispatch = useDispatch()
  //console.log(tasks)
  const ref = useRef()

  useEffect(() => {
    ref.current?.focus()
  }, [changeTask])

  const onEditTask = (id) => {
    setEditTask(id)
    const filter = tasks.filter(item => item.id === id)
    setChangeTask(filter?.[0]?.task)
    setShowEditTask(value => !value)
  }
  const onSaveTask = (id) => {
    dispatch(saveTask({id: id, value: changeTask}))
    setShowEditTask(value => !value)
  }
  const onDeleteTask = (id) => {
    dispatch(deleteTask(id))
  }
  const onCheck = (id) => {
    dispatch(addCheck(id))
  }
  const addNewTask = (id) => {
    dispatch(newTask({id, todo: ''}))
  }

  const dragStartHendler = (e, id, todo) => {
    dispatch(grabFirstTask({id, todo}))
  }
  const dropHendler = (e, id, todo) => {
    e.preventDefault()
    dispatch(grabSecondTask({id, todo}))
    dispatch(grabChangeTasks(true))
  }
  const dragOverHendler = (e) => {
   e.preventDefault()
  }

  return (
    <>
    <div className={style.wrapToDo}>
      <div 
        className={style.tasks} 
        key={id}
        draggable={true}
        onDragStart={(e) => dragStartHendler(e, id, todo)}
        // onDragLeave={(e) => dragLeaveHendler(e, id, todo)}
        // onDragEnd={(e) => dragEndHendler(e, id, todo)}
        onDragOver={(e) => dragOverHendler(e, id, todo)}
        onDrop={(e) => dropHendler(e, id, todo)}
      >
        <CarryOutOutlined 
          className={check?.find(elem => elem === id) ? style.checked : style.check}
          onClick={() => onCheck(id)}
        />
        {
          editTask === id && showEditTask ? (
            <div className={style.wrapInput}>
              <input 
                className={style.inputTask} 
                value={changeTask}
                ref={ref}
                onChange={(e) => setChangeTask(e.target.value)}
              /> 
              <CheckSquareOutlined 
                className={style.saveTask}
                onClick={() => onSaveTask(id)}
              />
            </div>
          ) : (
            <div className={style.task}>
              {todo}
            </div>
          )
        } 
        <PlusCircleOutlined
          className={style.addIconPlus}
          onClick={() => addNewTask(id)}
        />
        <EditOutlined 
          className={style.changeTask} 
          style={{ color: showEditTask && editTask === id ? 'green' : 'blue' }}
          onClick={() => onEditTask(id)}
        />
        <DeleteOutlined
          className={style.basket} 
          onClick={() => onDeleteTask(id)}
        />
      </div>
    </div> 
    <div className={style.subTask}>
      {subTask}
    </div> 
  </>
  )
}




