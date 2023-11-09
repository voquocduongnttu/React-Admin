
import ModalAddNew from './ModalAddNew';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalEdit from './ModalEdit';
import ModalConfirm from './ModalConfirm';
import _ from "lodash"
const TableUsers = (props) =>{
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers,setTotalUsers] = useState(0);
    const [totalPages,setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUserEdit,setDataUserEdit] = useState();

    const [isShowModalDelete,setIsShowModalDelete] = useState(false);
    const [dataUserDelete,setDataUserDelete] = useState({});


    const handleClose = () =>{
        setIsShowModalAddNew(false);
        setIsShowModalEditUser(false);
        setIsShowModalDelete(false);
  }
    const handleUpdateTable = (user)=>{
        setListUsers([user, ...listUsers])
    } 
    const handlEditUserFromModal=(user)=>{
        let cloneListUsers = [...listUsers];
        let index = listUsers.findIndex(item => item.id === user.id)
        cloneListUsers[index].first_name = user.first_name;
        console.log(user)
    }
    useEffect(()=>{
        getUsers(1);
    },[])
    const getUsers = async (page)=>{
        let res = await fetchAllUser(page);
        if (res && res && res.data){
            setTotalUsers(res.total)
            setListUsers(res.data)
            setTotalPages(res.total_pages);
        }
    }
    const handlePageClick = (event) =>{
        
        getUsers(+event.selected + 1);
    }
   const handleEditUser=(user)=>{
    setDataUserEdit(user);
    setIsShowModalEditUser(true);
   }
   const handleDeleteUser = (user)=>{
    setIsShowModalDelete(true);
    setDataUserDelete(user);
   }
   const handlDeleteUserFromModal = (user) =>{
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
    setListUsers(cloneListUsers);
   }
    return(
        <>
        <div className='my-3 add-new'>
          <span><b>List Users:</b></span>
          <button className='btn btn-success' 
          onClick={() => setIsShowModalAddNew(true)}>Add new user</button>
        </div>
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {listUsers && listUsers.length > 0 && 
        listUsers.map((item, index)=>{
            return(
                <tr key={`users-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>
                        <button className='btn btn-warning mx-3'
                        onClick={()=> handleEditUser(item)}
                        >Edit</button>
                        <button 
                        onClick={()=> handleDeleteUser(item)}
                        className='btn btn-danger'>Delete</button>

                    </td>
                </tr>
            )
        })}
           
        </tbody>
    </Table>
     <ReactPaginate
       nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< "
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
       <ModalAddNew 
        show ={isShowModalAddNew}
        handleClose = {handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEdit  
        show={isShowModalEditUser}
        dataUserEdit={dataUserEdit}
        handleClose = {handleClose}
        handlEditUserFromModal={handlEditUserFromModal}
      />
      <ModalConfirm
        show = {isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete= {dataUserDelete}
        handlDeleteUserFromModal = {handlDeleteUserFromModal}
      />
        </>
    )
}

export default TableUsers;