
import ModalAddNew from './ModalAddNew';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalEdit from './ModalEdit';
import ModalConfirm from './ModalConfirm';
import './TableUsers.scss'
import { CSVLink } from "react-csv";
import _, { debounce } from "lodash"
import Papa from "papaparse" 
import { toast } from 'react-toastify';

const TableUsers = (props) =>{
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers,setTotalUsers] = useState(0);
    const [totalPages,setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUserEdit,setDataUserEdit] = useState();

    const [isShowModalDelete,setIsShowModalDelete] = useState(false);
    const [dataUserDelete,setDataUserDelete] = useState({});

    const [sortBy,setSortBy] = useState("asc");
    const [sortField ,setSortField] = useState("id");
    const [ketword, steKeyword] = useState("");

    const[dataExport,setDataExport] = useState([]);



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
   const handleSort =(sortBy,sortField)=>{
      setSortBy(sortBy)
      setSortField(sortField)
      let cloneListUsers = _.cloneDeep(listUsers)
        cloneListUsers =_.orderBy(cloneListUsers,[sortField],[sortBy])
        setListUsers(cloneListUsers);
    }
    const handleSearch =debounce( (event)=>{
        
        let term = event.target.value;
        if(term){
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
            setListUsers(cloneListUsers);  
        }else{
            getUsers(1);
        }
    },500)

    const getUsersExport = (event,done)=>{
        let result =[];
        if(listUsers && listUsers.length >0){
            result.push(["id","email","first_name","last_name"]);
            listUsers.map((item,index) => {
                let arr =[];
                arr[0] = item.id;
                arr[1] =item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr)
            })
            setDataExport(result);
            done();
        }
    }
   
    const handleImportCSV = (event) =>{
        if (event.target && event.target.files && event.target.files[0]){
            let file = event.target.files[0];
            
            if(file.type !== "text/csv"){
                toast.error("Only accept csv files...")
                return;
            }
            //Parse local CSV file
                Papa.parse(file, { 
                    // header:true,
                    complete: function(results) {
                        
                        let rawCSV = results.data;
                        if(rawCSV.length > 0){
                            if (rawCSV[0] && rawCSV[0].length === 3){
                                if(rawCSV[0][0] !== "email" 
                                || rawCSV[0][1] !=="first_name"
                                || rawCSV[0][2] !== "last_name" 
                                )  { 
                                    toast.error("Wrong format Header CSV file!")
                                    } else {
                                    let result = [];

                                    rawCSV.map((item,index) => {
                                        if(index > 0 && item.length === 3){
                                            let obj ={};
                                            obj.email = item[0]
                                            obj.first_name = item[1]
                                            obj.last_name = item[2]
                                            result.push(obj);
                                        }
                                    })
                                setListUsers(result)
                                console.log("Check ",result)
                            }
                        }else{
                            toast.error("Wrong format CSV file!")
                        }
                        }else
                            toast.error("Not found data on CSV file!")
                    }
                 });
                }
        }
    
    return(
        <>
        <div className='my-3 add-new d-sm-flex'>
            <span><b>List Users:</b></span>
            <div className='group-btns mt-sm-0 mt-2'>
            <label htmlFor='test' className='btn btn-warning'>
            <i className="fa-solid fa-file-import"></i> Import</label>
            <input id="test" type='file' hidden 
                onChange={(event) => handleImportCSV(event)}/>
        
            <CSVLink
                filename={"Users.csv"}
                className="btn btn-primary"
                data={dataExport}
                asyncOnClick={true}
                onClick={getUsersExport}
                >
                <i className="fa-solid fa-download"></i> Export</CSVLink>
          <button className='btn btn-success' 
          onClick={() => setIsShowModalAddNew(true)}>
          <i className="fa-solid fa-circle-plus"></i> Add new user</button>
          </div>

        </div>
        <div className=' col-12 col-sm-4 my-3' >
            <input className='form-control form-search'
                placeholder='Search user by email ...'
                onChange={(event) => handleSearch(event)}
            />
        </div>
        <div className='customize-table'>
            <Table striped bordered hover >
                    <thead>
                        <tr>
                        <th>
                        <div className='sort-header'>
                            <span>ID</span>
                            <span>
                                <i className="fa-solid fa-arrow-down-long"
                                onClick={()=>
                                    handleSort("desc","id")
                                }></i>
                                <i className="fa-solid fa-arrow-up-long"
                                onClick={()=> handleSort("asc","id")}></i>
                            </span>
                        </div>
                        
                        </th>
                        <th className='sort-header'>Email</th>
                        <th>
                        <div className='sort-header'>
                            <span>First name</span>
                            <span>
                                <i className="fa-solid fa-arrow-down-long"
                                onClick={()=>
                                    handleSort("desc","first_name")
                                }></i>
                                <i className="fa-solid fa-arrow-up-long"
                                onClick={()=> handleSort("asc","first_name")}></i>
                            </span>
                        </div></th>
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
        </div>
   
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