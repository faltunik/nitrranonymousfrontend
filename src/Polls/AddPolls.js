import React, { useState, useContext, Fragment } from 'react'
import {Modal, Button} from 'react-bootstrap'
import PostContext from '../context/PostContext';

export default function AddPolls() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [quefield, setQuefield] = useState('')
    const [optfields, setOptfields] = useState(['',''])
    const {api, setPolls, polls} = useContext(PostContext)

    
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(optfields)
    try{
      const response = await api.post('/poll/poll/', {'text': quefield, 'choice_text': optfields})
      console.log(response.data)
      setQuefield('')
      setOptfields(['',''])
      setShow(false)
      setPolls([{'text': quefield, 'choices': optfields}, ...polls])
      console.log(polls)
    }
    catch(err){console.log(err)}
    
  }


    const handleAddFields = () => {
        const values = [...optfields];
        values.push('');
        setOptfields(values);

      };

      // const handleAddFields = () => {
      //   const values = [...optfields];  // what it means is to copy the array
      //   values.push('' );
      //   setoptfields(values);
      // };

    const handleRemoveFields = index => {
      const values = [...optfields];
        values.splice(index, 1);
        setOptfields(values);
      };


    const handleChoiceChange = (e, index) => {
      const values = [...optfields];
      values[index] = e.target.value;
      setOptfields(values);
      };

      const resetForm = e => setOptfields(['',''])

  return (
    <div>
        <Button variant="primary btn-sm" onClick={handleShow}>
        Add Poll
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className='text-dark' closeButton>
          <Modal.Title>Add Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form onSubmit={handleSubmit}>
        <div className="form-row">
        <textarea
                    type="text"
                    className="form-control mb-5"
                    name="choiceoption"
                    value = {quefield}
                    onChange={(e) => setQuefield(e.target.value)}
                    rows="1"
                    placeholder='Enter Your Question'

                 >
                </textarea>
          {optfields.map((optfield, index) => (
            // <Fragment key={`${optfield}~${index}`}>
              
              <div className="d-flex flex-row " >
              <div className="form-group col-sm-6" >
                {/* <input
                  type="text"
                  className="form-control"
                  id="optfield"
                  name="choiceoption"
                  value={optfield}
                  onChange={(e) => handleChoiceChange(index, e)}
                /> */}
                <textarea
                    type="text"
                    className="form-control mb-2"
                    name="choiceoption"
                    value = {optfield}
                    onChange={(e) => handleChoiceChange(e,index)}
                    rows="1"
                 >
                </textarea>
              </div>

              <div className="form-group d-flex flex-row col-sm-2 justify-content-end">
                <button
                  className="btn btn-link text-dark"
                  type="button"
                  disabled={index === 1}
                  onClick={() => handleRemoveFields(index)}
                >
                  <i class="ri-close-circle-line"></i>
                </button>
                <button
                  className="btn btn-link text-dark"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  <i class="ri-add-circle-line"></i>
                </button>
              </div>
            </div>
            // </Fragment>
          ))}
        </div>
        <button
            className="btn btn-primary mr-2 mt-3"
            type="submit"
          >
            Save
          </button>
      </form>
        

        </Modal.Body>
      </Modal>


    </div>
  )

}
