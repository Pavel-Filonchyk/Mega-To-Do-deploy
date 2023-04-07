import _ from 'lodash'
import uuid from 'react-uuid'

export function addElem(arr, id, task) {
  const allTasks = _.map(arr, item => {
    let newObj 
    if(item.id === id){
      newObj = {
        id: item?.id, 
        task: item?.task, 
        arrs: [{
          id: uuid(), 
          task: task, 
          arrs: null
          }, 
          ...addElem(item.arrs, id, task) 
        ]
      } 
    }else{
      newObj = {
        id: item.id, 
        task: item.task, 
        arrs: addElem(item.arrs, id, task)
      }
    }
    return newObj
  })
  return allTasks
}

export function deleteElem(arr, id) {
const filter = _.filter(arr, item => item.id === id)
let allTasks
if(filter.length >= 1){
  const deleteItem = _.filter(arr, item => item.id !== id)
  return deleteItem
}else{
  allTasks = _.map(arr, item => {
  const newObj = {
      id: item.id, 
      task: item.task, 
      arrs: deleteElem(item.arrs, id)
    }
  return newObj
  })
  return allTasks
}
}

export function changeElem(arr, id, value) {
const allTasks = _.map(arr, item => {
  let newObj 
  if(item.id === id){
    newObj = {
      id: id, 
      task: value, 
      arrs: changeElem(item.arrs, id, value)
    } 
  }else{
    newObj = {
      id: item.id, 
      task: item.task, 
      arrs: changeElem(item.arrs, id, value)
    }
  }
  return newObj
})
return allTasks
}

export function findElem(arr, taskId, value) {
const filter = _.filter(arr, item => item.task === value)
//console.log(filter)
let allTasks
if(filter.length > 0 ){
  return filter?.[0]?.task
}else{
  allTasks = _.map(arr, item => {
  const newObj = {
      id: item.id, 
      task: item.task, 
      arrs: findElem(item.arrs, taskId, value)
    }
  return newObj
  })
  return allTasks
}
}
