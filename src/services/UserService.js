import axios from "./customize-axios"

const fetchAllUser = (page)=>{
    return axios.get(`https://reqres.in/api/users?page=${page}`);
}
const postCreatUser =(name,job) =>{
    return axios.post("/api/users",{name,job})
}
const putUpdateUser = (name, job) => {
    return axios.put("/api/users", { name, job });
}
export {fetchAllUser,postCreatUser,putUpdateUser};