import { useState } from "react";
import { loginApi } from "../services/UserService";
import { toast } from 'react-toastify';


const Login = () =>{
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const handleLogin = async () =>{
        alert("me")
        if(!email || !password ){
        toast.error("Email/Password is required!");
    
        return;
        }
        
       let res = await loginApi(email, password);
       console.log('>>>check :',res)
       if (res && res.token){
        localStorage.setItem("token",res.token)
       } else{

        if(res && res.status === 400){
            toast.error(res.data.error);
        }
       }
       
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
        >Login</button>
        
         <div className="back">
       <i className="fa-solid fa-angles-left"></i> Go back
    </div>
    
    </div>
   
    
    
    </>)
}
export default Login;