import React,{useEffect,useState} from 'react'
import {useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {MapComponent} from ''
import {setMap} from ''

const MainPage = () => {
  const location=useLocation()
  const dispatch=useDispatch()
  const data=location.state

  const [actor,setActor]=useState({
    vehicleNo:'',
    companyName: '',
    vehicleRegistrationNumber: '',
    routesTo: '',
    routesFro: '',
    fareRanges: '',
    docks: '',
    password: ''
  })

  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    //log that data has been saved in state
    if(data||data.vehicle){
      console.log(data)
      setActor({
        vehicleNo:data.vehicleNo,
        companyName:data.companyName,
        vehicleRegistrationNumber:data.nehicleRegistrationNumber,
        routesTo:data.routes.to,
        routesFro:data.routes.fro,
        fareRanges:data.fareRanges,
        docks:data.docks,
        password:data.password

      })
      setLoading(false)
    }else{
      console.log('no sacco data found')
      setLoading(false)
    }
  },[data])

  console.log('actor',actor)



  if(!data){
    return <p>No Data Received</p>
  }

  if(loading){
    return <p>Loading...</p>
  }

  return (
    <div>
      <header>
        <h1><strong>WELCOME:</strong>{actor.vehicleNo}</h1>
      </header>
      <section>
        <div>
          <MapComponent vehicles={vehicles}/>
        </div>
      </section>
      <footer></footer>

    </div>
  )
}

export default MainPage