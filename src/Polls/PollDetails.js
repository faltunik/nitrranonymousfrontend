import React, { useContext } from 'react'
import { Form } from 'react-bootstrap'
import PostContext from '../context/PostContext'

export default function PollDetails({poll}) {
    const {api} = useContext(PostContext)

    const subVote = (e) => {

      console.log('Submitted', e.target.choice.value )
    }


    const postVote = ( choice) => {
        try{ const response = api.post('pollaction/vote/', {'post': poll.id, 'choice': choice} )
    }
    catch(err){console.log(err)}

    


    }
  return (
    <div className='shadow-sm border border-primary mb-2 p-3' style={{fontSize: '75%'}}>
        
    <h6 className='text-start'>{poll.text}</h6>
    <Form className='mb-3' name= 'choice' >
    {poll.choices.map((choice, index) => (
        // <div>
        //     <input type='radio' name='poll' value={choice}/>
        // </div>
        <div className="d-flex justify-content-start border border-light flex-row bd-highlight mb-3"  key={index}>
        {/* <div className="p-2 flex-shrink-0 " ><i className="ri-checkbox-blank-circle-line" ></i></div> */}
        <input type="radio" className='ms-3' name="radio"/> 
            <span className="checkmark"></span> 
        <div className="p-2 text-start">{choice.choice_text}</div>
      </div>

      
    ))}  
    </Form>   
    <div class="d-flex align-items-center pt-3">
        <div id="prev"> <button class="btn btn-primary mx-3" type='submit' onSubmit={subVote} >Submit Vote</button> </div>
        <div class="ml-auto mr-sm-5"> <button class="btn btn-success">Reset</button> </div>
    </div>
</div> 

    

  )
}


{/* <div className="d-flex justify-content-start border border-light flex-row bd-highlight mb-3" onClick={console.log('Voted')}>
        <div className="p-2 flex-shrink-0 " ><i className="ri-checkbox-blank-circle-line" ></i></div>
        <div className="p-2 text-start">China This is some content from a media component. You can replace this with any content and adjust it as needed.</div>
      </div> */}


{/* <div className="form-check">
<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
<label className="form-check-label" htmlFor="flexRadioDefault1">
  Default radio
</label>
</div>
<div className="form-check">
<input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
<label className="form-check-label" htmlFor="flexRadioDefault2">
  Default checked radio
</label>
</div> */}