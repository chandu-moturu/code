import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const EmpsList = () => {

  const { emps, changeAvailability , aToken , getAllEmps} = useContext(AdminContext)

  useEffect(() => {
    console.log(emps)
    if (aToken) {
        getAllEmps()
    }
}, [aToken])

  return (
    <div  className='empList-main'>
      <h1 >All Emps</h1>
      <div >
        {emps.map((item, index) => (
          <div key={index}>
            <img  src={item.image} alt="" />
            <div >
              <p >{item.name}</p>
              <p >{item.speciality}</p>
              <div >
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmpsList