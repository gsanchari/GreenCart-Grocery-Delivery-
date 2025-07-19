import React from 'react';
import '../stylesheet/Login.css';
import { useAppContext } from '../context/AppContext';

const Login = () => {
    
    const {setShowUserLogin, setUser, axios, navigate} = useAppContext();

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event)=>{
        try {
            event.preventDefault();

            const {data} = await axios.post(`/api/user/${state}`, {name, email, password});

            if(data.success){
                navigate('/');
                setUser(data.user);
                setShowUserLogin(false);
            }else{
                toast.error(data.message);
            }
    
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div onClick={()=> setShowUserLogin(false) } className='login-container'>
            <form onSubmit={onSubmitHandler} onClick={(e)=> e.stopPropagation() } className="login-form">
                <p className="login-title">
                    <span className="highlight">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                {state === "register" && (
                    <div className="form-group">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="form-input" type="text" required />
                    </div>
                )}
                <div className="form-group">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="form-input" type="email" required />
                </div>
                <div className="form-group">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="form-input" type="password" required />
                </div>
                {state === "register" ? (
                    <p>
                        Already have account? <span onClick={() => setState("login")} className="toggle-link">click here</span>
                    </p>
                ) : (
                    <p>
                        Create an account? <span onClick={() => setState("register")} className="toggle-link">click here</span>
                    </p>
                )}
                <button className="submit-btn">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
