import React, { useState, useEffect, useRef } from 'react'
import { getJobTitles, addAttendant, getAttendants } from '../api';
import Card from "./Card";

function Form() {
  const [attendantsApi, setAttendants] = useState([])
  const [jobTitlesApi, setJobTitlesApi] = useState([])

  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const jobTitleRef = useRef(null);
  const ageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, lastName, jobTitle, age } = e.target
    const attendant = { name: name.value, lastName: lastName.value, jobTitle: jobTitle.value, age: age.value }
    await addAttendant(attendant)
    e.target.reset();
    getAttendantsApi()
  }

  const getAttendantsApi = async () => {
    const res = await getAttendants()
    setAttendants(res.data)
  }

  useEffect(() => {
    const getTitlesOfJob = async () => {
      const res = await getJobTitles()
      setJobTitlesApi(res.data)
    }
    getTitlesOfJob()
  }, [])

  console.log(attendantsApi)

  return (
    <section className="center-text">
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label htmlFor='name'>First Name</label><br />
          <input ref={nameRef} name='name' id='name' placeholder='Jhon ' />
        </div>
        <br />
        <div>
          <label htmlFor='lastName'>Last Name</label><br />
          <input ref={lastNameRef} name='lastName' id='lastName' placeholder='Smith' />
        </div>
        <br />
        <div>
          <label htmlFor='jobTitle'>Job Title</label><br />
          <select ref={jobTitleRef} name='jobTitle' id="jobTitle">
            {jobTitlesApi.length > 0 &&
              jobTitlesApi.sort().map((option, index) => {
                return (<option key={index} value={option}>{option}</option>)
              })}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor='age'>Age</label><br />
          <input ref={ageRef} name='age' type='number' id='age' placeholder='23' />
        </div><br />
        <button type='submit'>Submit</button>
      </form>
      <h2 className="center-text">Current users</h2>
      {attendantsApi.length > 0 &&
        attendantsApi.sort(function (a, b) { return a.age - b.age; }).map((attendant, index) => {
          return (
            <Card key={index} attendant={attendant} />
          )
        })}
    </section>
  )
}

export default Form