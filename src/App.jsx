import { useImmer } from 'use-immer'
import template from './template.js'
import { useState } from 'react';

function CvForm() {
  const [data, setData] = useImmer(template);
  const [activeIndex, setActiveIndex] = useState(2);
  function handleIndex(number){
    setActiveIndex(number)
  }
  return (
    <>
      <Head isActive={activeIndex} onActive={() => setActiveIndex(0)}/>
      <Education />
      <Experience />
    </>
 
  )
function Head({isActive, onActive, onChange}){
 
  return(
    <>
      {isActive === 0 &&
       <>
       <input type="text" id="nameInput" value={data.name[0]}
       onChange={onChange}/>
       <button id="submitName">Submit</button>
       </>
       ||
      <>
      <h1>{data.name[0]}</h1> 
      <button onClick={onActive}>Edit</button>
      </>
      }
      {isActive !== 1 &&  <h3>{data.phoneNumber[0]}</h3> ||
       <input type="num" id="phoneInput"/> 
      }
      <h3>{data.email[0]}</h3>
      <h3>{data.address[0]}</h3>
    </>
   
  )
}
function Education(){
  return(
    <ul key="education">
      {data.education.map((school) => {
        return(
        <div key={school.id + "school-div"}>
          <li key={school.id}>{school.name}' - '{school.level}</li>
        </div>
        )
      })}
    </ul>
  )
}
function Experience(){
  return(
    <ul key="experience">
      {data.experience.map((job) => {
        return(
        <div key={job.id + "job-div"}>
          <li key={job.id}>{job.name}' - '{job.position}</li>
          <p key={job.id + 'resp'}>{job.responsability}</p>
        </div>
        )
      })}
    </ul>
  )
   
}
}

export default CvForm
