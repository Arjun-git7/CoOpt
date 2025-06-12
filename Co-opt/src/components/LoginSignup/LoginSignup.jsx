import React , { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginSignup.css'

export default function LoginSignup({open , onClose , userType, children}) {
    const [action,setAction] = useState("Sign Up")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    // Determine message based on user type
    const message = userType === "recruiter" ? "Welcome, Recruiter! Find top talent for your company." 
                                             : "Welcome, Candidate! Find jobs that match your skills."

    // Dummy credentials
    const dummyCredentials = {
        candidate: { email: "abc@gmail.com", password: "c123" },
        recruiter: { email: "def@gmail.com", password: "r123" }
    }

    // Handle login/signup button click
    const handleAuth = () => {
        if (action==="Login")
            {
                const validCredentials = dummyCredentials[userType]
                if (validCredentials && email === validCredentials.email && password === validCredentials.password) {
                    console.log("Login successful, navigating to", userType === "recruiter" ? "/recruiterPage" : "/candidatePage")
                    navigate(userType === "recruiter" ? "/recruiterPage" : "/candidatePage")
                    //navigate(userType === "recruiter" ? "/recruiterPage" : "/candidatePage")
                } 
                else {
                    setError("Invalid email or password. Please try again.")
                }
            }
        }

    if (!open) return null  // Don't render if modal is closed

    return( 
        <div className="modalBackground">
        <div className='container'>
            <div className="closeButton">
                <button onClick={() => onClose()}> X </button>
            </div>
            <div className ="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <p className="text-center text-gray-600 mb-4">{message}</p>
            <div className="inputs">
                {action==="Login"? null : ( 
                    <div className="input">
                    <input type ="text" placeholder="Name"/>
                </div>)}
                

                <div className="input">
                    <input type ="email" placeholder="Email Id" value={email} 
                            onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="input">
                    <input type ="password" placeholder="Password" value={password} 
                            onChange={(e) => setPassword(e.target.value)}/>
                </div>

            </div>

            {action==="Sign Up"? null : ( <div className="forgot-password">Lost Password? <span>Click Here!</span></div>)}
           
            <div className="submit-container">
                <div className={action==="Login"?"submit gray" :"submit"} onClick={()=>{
                    setAction("Sign Up")}}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray" :"submit"} onClick={()=>{
                    if (action==="Login"){
                        handleAuth()
                    }
                    else{
                    setAction("Login")
                }
                }}>Login</div>
            </div>
            {children}
        </div>
    </div>
    )
}