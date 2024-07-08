import { useImmer } from 'use-immer'
import template from './template.js'
import { useState } from 'react';

function CvForm() {
  const [data, setData] = useImmer(template);
  const [activeIndex, setActiveIndex] = useState('');
  const [value, setValue] = useImmer('');
  function addData(key, newData){
      if(newData.length < 1){
        setActiveIndex('');
      }else{
        let nextData = {...data, [key]: newData}
        setData(nextData);
        setActiveIndex('')
      }
  }
  function addNestedData(key1, position, key2, newData){
    if(newData.length < 1){
      setActiveIndex('');
    }else{
      setData(draft => {
        draft[key1][[position]][key2] = newData
      })
      setActiveIndex('')
    }
    }
  return (
    <>
      <Head isActive={activeIndex} onActive={(n) => setActiveIndex(n)}
      />
      <Education isActive={activeIndex} onActive={(n) => setActiveIndex(n)}
        />
      <Experience isActive={activeIndex} onActive={(n) => setActiveIndex(n)}/>
    </>
 
  )
function Head({isActive, onActive}){
  let nextValue = '';
  function handleChange(e){
    nextValue = e.target.value
  }
  return(
    <div className='header'>
      {isActive === 0 &&
       <div className='nameFieldEdit'>
       <input type="text" id="nameInput" placeholder={data.name}
       onChange={handleChange}/>
       <button id="submitName" onClick={() => addData('name', nextValue)}>Submit</button>
       </div>
       ||
      <div className="nameField">
        <h1>{data.name}</h1>
        <button onClick={()=>onActive(0)}>Edit</button>
      </div>
      }
      {isActive !== 1 &&
      <div className='phoneField'>
      <h3>{data.phoneNumber}</h3> 
      <button onClick={()=>onActive(1)}>Edit</button>
      </div>
      ||
      <div className='phoneFieldEdit'>
       <input type="num" id="phoneInput"
        placeholder={data.phoneNumber} onChange={handleChange}/>
        <button onClick={() => addData('phoneNumber', nextValue)}>Submit</button>
      </div> 
      }
      {isActive === 2 &&
      <div className='emailFieldEdit'>
        <input type="text" id="emailInput" placeholder={data.email}
        onChange={handleChange}/>
        <button id="submitName" onClick={() => addData('email', nextValue)}>Submit</button>
      </div>
      ||
      <div className='emailField'>
      <h3>{data.email}</h3> 
      <button onClick={()=>onActive(2)}>Edit</button>
      </div>
      }
      {isActive === 3 &&
      <div className='addressFieldEdit'>
        <input type="text" id="addresInput" placeholder={data.address}
        onChange={handleChange}/>
        <button id="submitName" onClick={() => addData('address', nextValue)}>Submit</button>
      </div>
      ||
      <div className='addressField'>
      <h3>{data.address}</h3> 
      <button onClick={()=>onActive(3)}>Edit</button>
      </div>
      }
    </div>
   
  )
}
function Education({isActive, onActive}){
  let nextValue = '';
  function handleChange(e){
    nextValue = e.target.value
  }
  return(
    <div className="education-section">
      <h1>Education</h1> 
      <ul key="education">
        {data.education.map((school, index) => {
            if(isActive === "school" + school.id){
              return (
              <div key={school.id + 'school-div'} className='schoolField'>
              <input type="text" id={'school' + school.id} placeholder={school.name}
              onChange={handleChange} />
              <button id="submitName" 
              onClick={() => addNestedData('education', index, 'name', nextValue)}>Submit</button>
              </div>)
            }else{
              return(
                <div key={school.id + "school-div"}>
                <li key={school.id}>{school.name}</li>
                <button onClick={()=>onActive('school' + school.id)}>Edit</button>
              </div>
            )
          }
      })}
    </ul>
    </div>
  )
}
function Experience({isActive, onActive}){
  let nextValue = '';
  function handleChange(e){
    nextValue = e.target.value
  }
  return(
    <div className="experience-section">
      <h1>Experience</h1>
    <ul key="experience">
    {data.experience.map((job, index) => {
        if(isActive === "job" + job.id){
          return (<div key={job.id + 'job-div'}>
          <input type="text" id={'job' + job.id} placeholder={job.name}
          onChange={handleChange} />
          <button id="submitJob" 
          onClick={() => addNestedData('experience', index, 'name', nextValue)}>Submit</button>
          </div>)
        }else if(isActive === "resp" + job.id){
          return(
            <div key={job.div + 'job-div'}>
              <div className="jobName">
              <li key={job.id}>{job.name}</li>
              <button onClick={()=>onActive('job' + job.id)}>Edit</button>
            </div>
            <div className="aboutJob">
              <input type='text' id={'resp' + job.id} placeholder={job.responsibility}
              onChange={handleChange} />
              <button id='submitAbout'
              onClick={() => addNestedData('experience', index, 'responsibility', nextValue)}>Submit</button>
            </div>
            </div>
          )
        }
        else{
          return(
            <div key={job.id + "job-div"}>
            <div className="jobName">
              <li key={job.id}>{job.name}</li>
              <button onClick={()=>onActive('job' + job.id)}>Edit</button>
            </div>
            <div className="aboutJob">
              <p key={job.id + "responsibilities"}>{job.responsibility}</p>
              <button onClick={()=>onActive('resp' + job.id)}>Edit</button>
            </div>
          </div>
          )
        }
    })}
  </ul>
  </div>
  )
   
}
}

export default CvForm
