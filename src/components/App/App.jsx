import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { Modal } from 'antd'

import Tasks from '../Tasks/Tasks'
import { addTask } from '../../core/actions/tasksAction'
import { findElem } from '../../common/utils'

import style from './App.module.scss'

export default function App() {
  const tasks = useSelector(({ getTasks: { tasks } }) => tasks)
  const taskId = useSelector(({ getTasks: { taskId } }) => taskId)

  const [task, setTask] = useState('')
  const [title, setTitle] = useState('TO-DO LIST')
  const [filter, setFilter] = useState('')
  const [foundTask, setFoundTask] = useState([])
  const [showTask, setShowTask] = useState(null)

  const ref = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    ref.current?.focus()
  }, [title])

  useEffect(() => {
    setTitle(localStorage.getItem('pushTitle'))
  }, [])

  useEffect(() => {
    const findTask = findElem(tasks, taskId, filter)
    console.log(findTask)
    if(typeof findTask === 'string'){
      setFoundTask(findTask)
    }
  }, [filter])

  useEffect(() => {
    if(foundTask?.length >= 1){
      setShowTask(foundTask)
    }
  }, [foundTask])

  const onTitle = (e) => {
    localStorage.setItem('pushTitle', e)
    setTitle(e)
  }
  const onAddTask = () => {
    dispatch(addTask(task))
    setTask('')
  }
  const viewTasks = (arr) => {
    const allTasks = _.map(arr, item => {
     return (<Tasks
        key = {item?.id}
        id = {item?.id}
        todo = {item?.task} 
        subTask = {viewTasks(item?.arrs)}
      />)
    })
    return allTasks
  }
  
  return (
    <div className={style.mainWrapper}> 
      <div className={style.title}>
        <input 
          value={title} 
          ref={ref}
          className={style.inputTitle}
          onChange={(e) => onTitle(e.target.value)}
        />
      </div>
      <div className={style.addTask}>
        <input 
          value={filter} 
          className={style.inputTask}
          onChange={(e) => setFilter(e.target.value)}
        />
        <div className={style.iconMainPlus}>
          <SearchOutlined 
            className={style.iconFind}
          />
        </div>
        <span style={{marginTop: 3}}>Find a task</span>
      </div>
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
        <span style={{marginTop: 3}}>Add a task</span>
      </div>
      <div className={style.wrapTasks}>
        { viewTasks(tasks) }
      </div>
      <Modal
        open={showTask}
        closable={false}
        footer={null}
        centered={true}
        width={400}
        mask={true}
        onCancel={() => setShowTask(null)}
        maskStyle={{ background: 'rgba(48,49,72, 0.3)' }}
        bodyStyle={{ height: 130, padding: 0, borderRadius: '10px'}}
        >
          <div className={style.modal}>
            <span>{showTask}</span>
          </div>
      </Modal>
    </div>
  )
}
