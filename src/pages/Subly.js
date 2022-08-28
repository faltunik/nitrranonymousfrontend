import React from 'react'

export default function Subly({subly}) {
    return (
        <div className='border border-dark m-3 text-start p-2'>
            <div className='text-dark'> 
            <div className='badge bg-success text-wrap my-1'>{subly.author}</div>
            <br></br>
             {subly.body} </div>  
        </div>
    )
    }