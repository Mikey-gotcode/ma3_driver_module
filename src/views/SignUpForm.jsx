import React,{useState} from 'react'

function SignUpForm() {
    const [actor,setActor]=useState({
        vehicleNo:'',
        companyName:'',
        vehicleRegistrationNumber:'',
        vehicleStartRoute:'',
        vehicleEndRoute:'',
        fareRange:'',
        docks:'',
        password:''

    })

    const handleChange=(e)=>{
        const{name,value}=e.target 
        setActor({...actor,[name]:value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try {
            const response=await fetch('http://localhost:5000/api/vehicle/register',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(actor)
            })

            const data=await response.json()
            console.log(data)
        } catch (error) {
            console.error('Error:',error)
        }
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div><input type="text" name="vehicleNo" value={actor.vehicleNo} onChange={handleChange} placeholder='' required /></div>
            <div><input type="text" name="companyName" value={actor.companyName} onChange={handleChange} placeholder='' required /></div>
            <div><input type="text" name="vehicleRegistrationNumber" value={actor.vehicleRegistrationNumber} onChange={handleChange} placeholder='' required /></div>
            <div><input type="text" name="vehicleStartRoute" value={actor.vehicleStartRoute} onChange={handleChange} placeholder='' required /></div>
            <div><input type="text" name="vehicleEndRoute" value={actor.vehicleEndRoute} onChange={handleChange} placeholder='' required /></div>
            <div><input type="text" name="fareRange" value={actor.fareRange} onChange={handleChange} placeholder='' required /></div>
            <div><input type="text" name="docks" value={actor.docks} onChange={handleChange} placeholder='' required /></div>
            <div><input type="text" name="password" value={actor.password} onChange={handleChange} placeholder='' required /></div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUpForm