import { useImmer } from 'use-immer';
import template from './template.js';
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
        data={data}/>
      </header>
      <main>
        <Education isActive={activeIndex} onActive={(n) => setActiveIndex(n)}
          data={data}/>
        <Experience isActive={activeIndex} onActive={(n) => setActiveIndex(n)}
          data={data}/>
      </main>
    </>
 
  )
function Head({isActive, onActive, data}){
  const[name, setName] = useState(data.name);
  const [phone, setPhone] = useState(data.phoneNumber);
  const [email, setEmail] = useState(data.email);
  const [address, setAddress] = useState(data.address);
  return(
    <div className='header'>
      {isActive === 0 &&
       <div className='nameFieldEdit'>
       <input type="text" id="nameInput" value={name}
       onChange={(e) => setName(e.target.value)}/>
       <button id="submitName" onClick={() => addData('name', name)}>Submit</button>
       </div>
       ||
      <div className="nameField">
        <h1>{name}</h1>
        <button onClick={()=>onActive(0)}>{<img src='https://www.svgrepo.com/show/36160/edit-button.svg' style={{
          height:10, width:10}}/>}</button>
      </div>
      }
      {isActive !== 1 &&
      <div className='phoneField'>
      <h3>{phone}</h3> 
      <button onClick={()=>onActive(1)}>{<img src='https://www.svgrepo.com/show/36160/edit-button.svg' style={{
          height:10, width:10}}/>}</button>
      </div>
      ||
      <div className='phoneFieldEdit'>
       <input type="num" id="phoneInput"
        value={phone} onChange={(e)=> setPhone(e.target.value)}/>
        <button onClick={() => addData('phoneNumber', phone)}>Submit</button>
      </div> 
      }
      {isActive === 2 &&
      <div className='emailFieldEdit'>
        <input type="text" id="emailInput" value={email}
        onChange={e=>setEmail(e.target.value)}/>
        <button id="submitName" onClick={() => addData('email', email)}>Submit</button>
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
        <input type="text" id="addresInput" value={address}
        onChange={e=>setAddress(e.target.value)}/>
        <button id="submitName" onClick={() => addData('address', address)}>Submit</button>
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
function Education({isActive, onActive, data}){
const [schools, setSchools] = useImmer(data.education)
  return(
    <div className="education-section">
      <h1>Education</h1> 
      <ul key="education">
        {schools.map((school, index) => {
            if(isActive === "school" + school.id){
              return (
              <div key={school.id + 'school-div'} className='schoolField'>
              <input type="text" id={'school' + school.id} value={school.name}
              onChange={(e) =>{setSchools(draft => {
                draft[[index]].name = e.target.value
              })}} />
              <button id="submitName" 
              onClick={() => {setData(draft =>{
                draft.education = schools
              });setActiveIndex('')}}>Submit</button>
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
    <button id="addJob" onClick={() =>{
    setData(draft => {
      draft.education[[schools.length]] = {id: schools.length,
        name: 'your school name here - level of education',
      }
    })
  }}>Add</button>
    </div>
   
)
}
function Experience({isActive, onActive, data}){
  const [experience, setExperience] = useImmer(data.experience)
  return(
    <div className="experience-section">
      <h1>Experience</h1>
    <ul key="experience">
    {experience.map((job, index) => {
        if(isActive === "job" + job.id){
          return (<div key={job.id + 'job-div'}>
          <input type="text" id={'job' + job.id} value={job.name}
          onChange={(e) => {
            setExperience(draft =>{
              draft[[index]].name = e.target.value
            })
          }} />
          <button id="submitJob" 
          onClick={() =>{
            setData(draft =>{
              draft.experience = experience
            }); setActiveIndex('')
          }}>Submit</button>
          </div>)
        }else if(isActive === "resp" + job.id){
          return(
            <div key={job.div + 'job-div'}>
              <div className="jobName">
              <li key={job.id}>{job.name}</li>
              <button onClick={()=>{onActive('job' + job.id)}}>{<img src='https://www.svgrepo.com/show/36160/edit-button.svg' style={{
              height:10, width:10}}/>}</button>
            </div>
            <div className="aboutJob">
              <input type='text' id={'resp' + job.id} value={job.responsibility}
              onChange={(e) => {setExperience(draft => {
                draft[[index]].responsibility = e.target.value
              })}} />
              <button id='submitAbout'
              onClick={() =>{
                setData(draft =>{
                  draft.experience = experience
                }); setActiveIndex('')
              }}>Submit</button>
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
  <button id="addJob" onClick={() =>{
    setData(draft => {
      draft.experience[[experience.length]] = {id: experience.length,
        name: 'your company name here - your position in the company',
        responsibility: 'responsibilities of your position'
      }
    })
  }}>Add</button>
  </div>
  )
   
}
}

export default CvForm
