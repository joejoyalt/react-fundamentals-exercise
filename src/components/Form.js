import React, { useState, useEffect, useRef } from 'react'
import { getJobTitles, addAttendant, getAttendants } from '../api';
import Card from "./card/Card";
import Loader from './loader';
import Modal from './modal';

function Form() {
  const [attendantsApi, setAttendants] = useState([])
  const [jobTitlesApi, setJobTitlesApi] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpened, setIsOpened] = useState(false);

  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const jobTitleRef = useRef(null);
  const ageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { name, lastName, jobTitle, age } = e.target
    if (checkIfExists(name.value, lastName.value)) {
      setIsLoading(false)
      setIsOpened(true)
    } else {
      const attendant = { name: name.value, lastName: lastName.value, jobTitle: jobTitle.value, age: age.value }
      await addAttendant(attendant)
      e.target.reset();
      await getAttendantsApi()
      setIsLoading(false)
    }
  }

  const getAttendantsApi = async () => {
    const res = await getAttendants()
    setAttendants(res.data)
  }

  const checkIfExists = (name, lastName) => {
    let alreadyExists
    if (attendantsApi.length > 0) {
      attendantsApi.forEach(attendant => {
        if (attendant.name.toLowerCase() == name.toLowerCase() && attendant.lastName.toLowerCase() == lastName.toLowerCase()) {
          alreadyExists = true
        } else {
          alreadyExists = false
        }
      });
    } else {
      alreadyExists = false
    }
    return alreadyExists
  }

  useEffect(() => {
    const getTitlesOfJob = async () => {
      const res = await getJobTitles()
      setJobTitlesApi(res.data)
      setIsLoading(false)
    }
    getTitlesOfJob()
  }, [])

  return (
    <>
      <section className="form-grid">
        {isLoading ? <Loader /> : null}
        <div>
          <h2>Create new user</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <div>
              <label htmlFor='name'>First Name</label><br />
              <input ref={nameRef} name='name' id='name' placeholder='John' required />
            </div>
            <br />
            <div>
              <label htmlFor='lastName'>Last Name</label><br />
              <input ref={lastNameRef} name='lastName' id='lastName' placeholder='Smith' required />
            </div>
            <br />
            <div>
              <label htmlFor='jobTitle'>Job Title</label><br />
              <select ref={jobTitleRef} name='jobTitle' id="jobTitle" required >
                {jobTitlesApi.length > 0 &&
                  jobTitlesApi.sort().map((option, index) => {
                    return (<option key={index} value={option}>{option}</option>)
                  })}
              </select>
            </div>
            <br />
            <div>
              <label htmlFor='age'>Age</label><br />
              <input ref={ageRef} name='age' type='number' id='age' placeholder='23' required />
            </div><br />
            <button type='submit'>Submit</button>
          </form>
        </div>
        <div>
          <h2 className="center-text">Current users</h2>
          <div className='grid'>
            {attendantsApi.length > 0 &&
              attendantsApi.sort(function (a, b) { return a.age - b.age; }).map((attendant) => {
                return (
                  <Card key={attendant.name + attendant.lastName} attendant={attendant} />
                )
              })}
          </div>
        </div>
      </section>
      <Modal
        title="Error occurred"
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
      >
        <p>The combination of name and surname already exists</p>
        <p>To close: click Close, press Escape, or click outside.</p>
      </Modal>
    </>
  )
}

export default Form