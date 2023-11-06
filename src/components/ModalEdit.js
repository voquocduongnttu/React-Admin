import { useEffect, useState } from 'react';
import {Button,Modal} from 'react-bootstrap';
import { putUpdateUser } from '../services/UserService';

export default function ModalEdit(props) {
    const {show,handleClose,dataUserEdit,handlEditUserFromModal} = props;
    const [name,setName] = useState("");
    const [job,setJob] = useState("");

    const handleditUser = async()=>{
        let res = await putUpdateUser(name,job);
        if(res && res.updadAt){
            handlEditUserFromModal({
                first_name:name,
                id:dataUserEdit.id
            })
        }
    
    }
    useEffect(()=>{
        if(show){
            setName(dataUserEdit.first_name)
        }
    },[dataUserEdit])
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                <div className="form-group">
                    <label className='form-label'>Name</label>
                    <input type="text" className="form-control" value={name}
                    onChange={(event) => setName(event.target.value)} />
                   
                </div>
                <div className="form-group">
                    <label className='form-label'>Job</label>
                    <input type="text" className="form-control" value={job}
                    onChange={(event) => setJob(event.target.value)} />
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> handleditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
