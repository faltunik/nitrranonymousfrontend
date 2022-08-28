import React, {useState, useEffect, useContext} from 'react'
import PostContext from '../context/PostContext'
import AddPolls from './AddPolls'
import PollDetails from './PollDetails'

export default function PollList() {

  // const [polls, setPolls] = useState('')
  const {getPolls, polls} = useContext(PostContext)


  useEffect(()=> {
    getPolls()
  }, [])

  




  return (
    <div className='p-3'>
        <AddPolls/>
        {
        polls? polls.map(poll => (
          <div key={poll.id}>
            <PollDetails poll= {poll}/>
          </div>
        ))
      : <h1>No Polls</h1>}

      
    </div>

    
  )
    
    }
