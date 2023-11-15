import { useEffect, useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Login = () =>{
    const { loginContext } = useContext(UserContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);

 
    const hanldeGoBack = () => {
        navigate('/');
    }

    const handleLogin = async () =>{
        alert("me")
        if(!email || !password ){
        toast.error("Email/Password is required!");
    
        return;
        }
        setLoadingAPI(true);
       let res = await loginApi(email, password);
       console.log('>>>check :',res)
       if (res && res.token){
        loginContext(email, res.token);
        navigate("/");
       } else{

        if(res && res.status === 400){
            toast.error(res.data.error);
        }
       }
       setLoadingAPI(false);
    }
    
    return(<>
    <div className="login-container col-sm-4 col-12" >
        <div className="title">Log In</div>
        <div className="text" >Email or username</div>
        
        <input 
        type="text" 
        placeholder="Email or username..."
        value={email}
        onChange={(event) => setEmail(event.target.value)}

        />
    <div className="input-2">
        <input 
        type={isShowPassword === true ? "text" :"password"} 
        placeholder="Password..." 
        value={[password]}
        onChange={(event) => setPassword(event.target.value)}

        />
        <i className={isShowPassword === true ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
            onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>  
</div>
<button className={email && password ? "active": ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
        >
        {loadingAPI && <i className="fa-solid fa-sync fa-spin"></i>}
        &nbsp;Login
        </button>
        
         <div className="back">
       <i className="fa-solid fa-angles-left"></i> 
       
       <span onClick={() => hanldeGoBack()}>&nbsp;Go back</span>
    </div>
    
    </div>
   
    
    
    </>)
}
export default Login;