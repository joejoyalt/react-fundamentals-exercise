import React, { useState, useEffect, useRef } from 'react'
import { getJobTitles, addAttendant, getAttendants } from '../api';
// Some of the imports use double quotes and others use single quotes.
// I would recommend getting a prettier extension and enabling "format on save"
// to have the code always formatted.
import Card from "./card/Card";
import Loader from './loader';
import Modal from './modal';

// Other components seem to have their own folders,
// so it would make sense for form to have its own folder too for consistency.
function Form() {
  // `attendants` would be more clear. Same goes for `jobTitles`
  const [attendantsApi, setAttendants] = useState([])
  const [jobTitlesApi, setJobTitlesApi] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // Would help if the variable explained what exactily is open e.g. `isModalOpen`, `isDropdownOpen`
  const [isOpened, setIsOpened] = useState(false);

  // These ref are not used anywhere so they can be removed
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const jobTitleRef = useRef(null);
  const ageRef = useRef(null);

  // good naming 👍
  const handleSubmit = async (e) => {
    e.preventDefault()
    // `setLoading` in this function does not do much. If you remove all `setIsLoading` lines, the app behaves the same
    setIsLoading(true)
    const { name, lastName, jobTitle, age } = e.target
    // It is recommended to exit early with if statements to reduce nesting.
    // e.g.
    /*
      if (something) {
        // do something
        return;
      }

      // do something else
    */
    if (checkIfExists(name.value, lastName.value)) {
      setIsLoading(false)
      setIsOpened(true)
    } else {
      // to make the code less verbose, you can pass the object straight to the function
      const attendant = { name: name.value, lastName: lastName.value, jobTitle: jobTitle.value, age: age.value }
      await addAttendant(attendant)
      e.target.reset();
      await getAttendantsApi()
      setIsLoading(false)
    }
  }

  // The function would better be named `fetchAttendants`
  const getAttendantsApi = async () => {
    const res = await getAttendants()
    setAttendants(res.data)
  }

  // It is not clear what exactly this function does. The convention is to name it `getIsSomethingTrue`
  // In this case it would be better to use attendants.some(...) function. It is more performant since
  // it will return on first match
  const checkIfExists = (name, lastName) => {
    let alreadyExists
    if (attendantsApi.length > 0) {
      attendantsApi.forEach(attendant => {
        // Eslint suggests using triple equals `===` instead of `==`. All eslint errors should be fixed
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
    // Rename to fetchJobTitles
    const getTitlesOfJob = async () => {
      const res = await getJobTitles()
      setJobTitlesApi(res.data)
      // Loading state is set to false but there is no setIsLoading(true) at the beginning of the useEffect
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
          {/* onSubmit={e => handleSubmit(e)} can be reduced to onSubmit={handleSubmit} */}
          <form onSubmit={e => handleSubmit(e)}>
            <div>
              {/* Good job adding labels for inputs. It makes the form more accessible */}
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
                {/* You can pull the jobTitles code below into a renderJobTitles() function */}
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
            {/* Do same as with job titles */}
            {attendantsApi.length > 0 &&
              /* Use arrow function for the sorting function. It is important for code to be consistent. */
              attendantsApi.sort(function (a, b) { return a.age - b.age; }).map((attendant) => {
                /* you can write this function without a return to make it less verbose */
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
        // pass handleClose function to the modal
        onClose={() => setIsOpened(false)}
      >
        <p>The combination of name and surname already exists</p>
        <p>To close: click Close, press Escape, or click outside.</p>
      </Modal>
    </>
  )
}

export default Form