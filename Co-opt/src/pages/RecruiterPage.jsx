import React, {useState, useEffect} from 'react'
import NavBar from "../components/ui/NavBar"
import "./RecruiterPage.css"

const RecruiterPage = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const [candidates, setCandidates] = useState([])
    const [newJob, setNewJob]=useState({
        title:"", company:"Your Company", location:"", type:"Full-time" 
    })

    // Fetch candidates from the backend
    useEffect(() => {
        fetch("http://localhost:8080/api/candidates")
        .then(response=>response.json())
        .then(data=>setCandidates(data))
        .catch(error=>console.error("Error fetcvhing candidates : ",error))
    }, [])

    // Handle job posting
    const handlePostJob = async () => {
        try {
            const response = await fetch ("http://localhost:8080/api/jobs", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newJob)
            })

            if(response.ok){
                alert("Job posted successfully!")
                setNewJob({ title: "", company: "Your Company", location: "", type: "Full-time"})
            } else {
                alert("Error posting job!")
            }
        }
        catch(error){
            console.error("Error posting job :", error);
        }
    }

    return(
        <div className="recruiter-page">
            <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <div className="container">
                {/* Candidate Search Section */}
                <h1 className="section-title">Find the Right Candidates</h1>
                <input 
                    type="text" 
                    placeholder="Search for candidates..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />

                <div className="candidate-list">
                    {candidates
                        .filter(candidate => 
                            candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            candidate.skills.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(candidate => (
                            <div key={candidate.id} className="candidate-card">
                                <h3>{candidate.name}</h3>
                                <p>Skills: {candidate.skills}</p>
                                <p>Experience: {candidate.experience} years</p>
                            </div>
                    ))}
                </div>

                {/* Job Posting Section */}
                <h1 className="section-title">Post a New Job</h1>
                <div className="post-job-form">
                    <input 
                        type="text" 
                        placeholder="Job Title" 
                        value={newJob.title} 
                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    />
                    <input 
                        type="text" 
                        placeholder="Location" 
                        value={newJob.location} 
                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    />
                    <select 
                        value={newJob.type} 
                        onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                    >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Remote">Remote</option>
                    </select>
                    <button onClick={handlePostJob}>Post Job</button>
                </div>
                

            </div>
        </div>
    )
   
}

export default RecruiterPage