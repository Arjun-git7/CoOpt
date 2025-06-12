import React , { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/Card.jsx"
import { Button } from "../components/ui/Button.jsx"
import { motion } from "framer-motion"
import LoginSignup from "../components/LoginSignup/LoginSignup.jsx"

const HomePage = () => {
 const navigate = useNavigate()
 //const [isModalOpen, setIsModalOpen] = useState(false)
 const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);
 const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);


  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
       <motion.h1 
         className="text-3xl font-bold mb-6 text-center"
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 1 }}
         transition={{ duration: 0.6 }}
      >
        Welcome to Co-Opt
       </motion.h1>
      
      {/* Candidate Section */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="w-80 shadow-lg p-6 rounded-2xl bg-white hover:shadow-xl transition">
           <CardContent className="flex flex-col items-center">
             <h2 className="text-xl font-semibold mb-4">I am a Candidate</h2>
             <p className="text-gray-600 text-center mb-4">Find jobs, upload your resume, and get AI-powered job matches.</p>
             <Button onClick={() => setIsCandidateModalOpen(true)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
             {/* <Button onClick={() => navigate("/candidate/signup")} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"> */}
               Get Started
             </Button>
             {isCandidateModalOpen && <LoginSignup open={isCandidateModalOpen} onClose={() => setIsCandidateModalOpen(false)} userType="candidate"/>}
             {/* <LoginSignup open={isModalOpen} onClose={() => setIsModalOpen(false)}>
             </LoginSignup> */}
           </CardContent>
         </Card>

          {/* Recruiter+ Section */}
         <Card className="w-80 shadow-lg p-6 rounded-2xl bg-white hover:shadow-xl transition">
           <CardContent className="flex flex-col items-center">
             <h2 className="text-xl font-semibold mb-4">I am a Recruiter</h2>
             <p className="text-gray-600 text-center mb-4">Post job listings, review candidates, and find top talent.</p>
             <Button onClick={() => setIsRecruiterModalOpen(true)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
             {/* <Button onClick={() => navigate("/recruiter/signup")} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"> */}
             Get Started
             </Button>
             {isRecruiterModalOpen && <LoginSignup open={isRecruiterModalOpen} onClose={() => setIsRecruiterModalOpen(false)} userType="recruiter"/>}
           </CardContent>
        </Card>
       </div>
     </div>

  )
}

export default HomePage;
