import { useImmer } from 'use-immer'
import template from './template.js'
import { useState } from 'react';
function CvForm() {
  const [data, setData] = useImmer(template);
  const [activeIndex, setActiveIndex] = useState('');
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
      <header>
        <Head isActive={activeIndex} onActive={(n) => setActiveIndex(n)}
        />
      </header>
      <main>
        <Education isActive={activeIndex} onActive={(n) => setActiveIndex(n)}
          />
        <Experience isActive={activeIndex} onActive={(n) => setActiveIndex(n)}/>
      </main>
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
        <button onClick={()=>onActive(0)}>{<img src='https://www.svgrepo.com/show/36160/edit-button.svg' style={{
          height:10, width:10}}/>}</button>
      </div>
      }
      {isActive !== 1 &&
      <div className='phoneField'>
      <h3>{data.phoneNumber}</h3> 
      <button onClick={()=>onActive(1)}>{<img src='https://www.svgrepo.com/show/36160/edit-button.svg' style={{
          height:10, width:10}}/>}</button>
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
      <button onClick={()=>onActive(2)}>{<img src='https://www.svgrepo.com/show/36160/edit-button.svg' style={{
          height:10, width:10}}/>}</button>
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
      <button onClick={()=>onActive(3)}>{<img src='https://www.svgrepo.com/show/36160/edit-button.svg' style={{
          height:10, width:10}}/>}</button>
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
                <div className='schoolField' key={school.id + "school-div"}>
                <li key={school.id}>{school.name}</li>
                <button onClick={()=>onActive('school' + school.id)}>{<img src='https://www.svgrepo.com/show/36160/edit-button.svg' style={{
          height:10, width:10}}/>}</button>
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
              <button onClick={()=>onActive('job' + job.id)}>{<img src='https://www.svgrepo.com/show/36160/edit-button.svg' style={{
              height:10, width:10}}/>}</button>
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
              <button onClick={()=>onActive('job' + job.id)}>{<img src='https://www.svgrepo.com/show/36160/edit-button.svg' style={{
              height:10, width:10}}/>}</button>
            </div>
            <div className="aboutJob">
              <p key={job.id + "responsibilities"}>{job.responsibility}</p>
              <button onClick={()=>onActive('resp' + job.id)}>{<img src='https://www.svgrepo.com/show/36160/edit-button.svg' style={{
              height:10, width:10}}/>}</button>
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
