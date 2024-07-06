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
      <Experience />
    </>
 
  )
function Head({isActive, onActive}){
  let nextValue = '';
  function handleChange(e){
    nextValue = e.target.value
  }
  return(
    <>
      {isActive === 0 &&
       <>
       <input type="text" id="nameInput" placeholder={data.name}
       onChange={handleChange}/>
       <button id="submitName" onClick={() => addData('name', nextValue)}>Submit</button>
       </>
       ||
      <>
      <h1>{data.name}</h1> 
      <button onClick={()=>onActive(0)}>Edit</button>
      </>
      }
      {isActive !== 1 &&
      <>
      <h3>{data.phoneNumber}</h3> 
      <button onClick={()=>onActive(1)}>Edit</button>
      </>
      ||
      <>
       <input type="num" id="phoneInput"
        placeholder={data.phoneNumber} onChange={handleChange}/>
        <button onClick={() => addData('phoneNumber', nextValue)}>Submit</button>
      </> 
      }
      {isActive === 2 &&
      <>
        <input type="text" id="emailInput" placeholder={data.email}
        onChange={handleChange}/>
        <button id="submitName" onClick={() => addData('email', nextValue)}>Submit</button>
      </>
      ||
      <>
      <h3>{data.email}</h3> 
      <button onClick={()=>onActive(2)}>Edit</button>
      </>
      }
      {isActive === 3 &&
      <>
        <input type="text" id="addresInput" placeholder={data.address}
        onChange={handleChange}/>
        <button id="submitName" onClick={() => addData('address', nextValue)}>Submit</button>
      </>
      ||
      <>
      <h3>{data.address}</h3> 
      <button onClick={()=>onActive(3)}>Edit</button>
      </>
      }
    </>
   
  )
}
function Education({isActive, onActive}){
  let nextValue = '';
  function handleChange(e){
    nextValue = e.target.value
  }
  return(
    <ul key="education">
      {data.education.map((school, index) => {
          if(isActive === "school" + school.id){
            return (<div key={school.id + 'school-div'}>
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
  )
}
function Experience(){
  return(
    <ul key="experience">
      {data.experience.map((job) => {
        return(
        <div key={job.id + "job-div"}>
          <li key={job.id}>{job.name}</li>
          <p key={job.id + 'resp'}>{job.responsability}</p>
        </div>
        )
      })}
    </ul>
  )
   
}
}

export default CvForm
