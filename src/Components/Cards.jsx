import React from 'react'
import Card from './AnimalCard'
function Cards(props) {
  const {data}=props
  return (
    <div className='cards'>
     {
       data? data.map((ele)=>{
         return <Card data={ele} key={ele.id}/>
       }):''
     }
      
    </div>
  )
}

export default Cards
