'use client'
import React, { useState } from 'react'

const Page = () => {
  const [task, setTask] = useState("")
  const [desc, setDesc] = useState("")
  const [maintask, setMaintask] = useState([])
  const [editingIndex, setEditingIndex] = useState(null) // track editing task index

  const submitHandler = (e) => {
    e.preventDefault()

    if (editingIndex !== null) {
      // update the existing task
      const updatedTasks = [...maintask]
      updatedTasks[editingIndex] = { task, desc }
      setMaintask(updatedTasks)
      setEditingIndex(null)
    } else {
      // add new task
      setMaintask([...maintask, { task, desc }])
    }

    setTask('')
    setDesc('')
  }

  let deleteHandler = (idx) => {
    let copytask = [...maintask]
    copytask.splice(idx, 1)
    setMaintask(copytask)
  }

  let editHandler = (idx) => {
    setTask(maintask[idx].task)
    setDesc(maintask[idx].desc)
    setEditingIndex(idx)
  }

  const rendertask = maintask.length === 0
    ? <h1 className='text-center text-gray-500'>No Task Available</h1>
    : maintask.map((elem, idx) => {
      return (
        <div key={idx} className='bg-white rounded p-3 my-2 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
          <div>
            <h4 className='text-xl font-bold'>{elem.task}</h4>
            <h4 className='text-gray-700'>{elem.desc}</h4>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => editHandler(idx)}
              className='py-2 px-4 font-bold text-white bg-[#450920] rounded hover:bg-[#A53860]'
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(idx)}
              className='py-2 px-4 font-bold text-white bg-[#450920] rounded hover:bg-[#A53860]'
            >
              Delete
            </button>
          </div>
        </div>
      )
    })

  return (
    <div>
      <h1 className='text-white text-3xl font-semibold py-2 px-2 text-center bg-[#450920]'>
        Swati ToDo List
      </h1>

      <form onSubmit={submitHandler} className='flex flex-col items-center my-5'>

        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type='text'
          className='text-xl px-5 py-2 border-2 border-black rounded m-2 w-[80%] max-w-md'
          placeholder='Enter your task'
        />

        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type='text'
          className='text-xl px-5 py-2 border-2 border-black rounded m-2 w-[80%] max-w-md'
          placeholder='Enter your description'
        />

        <button
          type='submit'
          className='py-2 px-4 text-xl text-white bg-[#450920] rounded mt-4 hover:bg-[#5e0f2b]'
        >
          {editingIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>

      <div className='p-4 bg-[#450920] my-5 max-w-2xl mx-auto rounded'>
        {rendertask}
      </div>
    </div>
  )
}

export default Page
