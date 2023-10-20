import React, { useState, useEffect, useRef } from 'react'
import { getJobTitles } from '../api';
import Card from "./Card";

function Form() {
  const [employee, setEmployee] = useState([])
  const [jobTitlesFromApi, setJobTitlesFromApi] = useState([])

  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const jobTitleRef = useRef(null);
  const ageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, lastName, jobTitle, age } = e.target
    const employer = { name: name.value, lastName: lastName.value, jobTitle: jobTitle.value, age: age.value }
    setEmployee([...employee, employer]);
    e.target.reset();
  }
  
  useEffect(() => {
    const getTitlesOfJob = async () => {
      const res = await getJobTitles()
      setJobTitlesFromApi(res.data)
    }
    getTitlesOfJob()
  }, [])

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
            {jobTitlesFromApi.length > 0 &&
              jobTitlesFromApi.sort().map((option, index) => {
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
      {employee.length > 0 &&
        employee.sort(function (a, b) { return a.age - b.age; }).map((employer, index) => {
          return (
            <Card key={index} employer={employer} />
          )
        })}
    </section>
  )
}

export default Form