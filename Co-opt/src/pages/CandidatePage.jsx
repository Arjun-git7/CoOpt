import React, { useState, useEffect } from "react"
import "./CandidatePage.css"
import NavBar from "../components/ui/NavBar"

const CandidatePage = () => {
    // const [searchTerm, setSearchTerm] = useState("")
    // const [filter, setFilter] = useState("All")


    // const [workMode, setWorkMode] = useState([])
    // const [experience, setExperience] = useState([])

    
    // const jobs = [
    //     { id: 1, title: "Software Engineer", company: "Google", location: "California", type: "Full-time" },
    //     { id: 2, title: "Data Scientist", company: "Facebook", location: "New York", type: "Remote" },
    //     { id: 3, title: "Product Manager", company: "Amazon", location: "Seattle", type: "Hybrid" },
    //     { id: 4, title: "UX Designer", company: "Apple", location: "Texas", type: "Full-time" },
    //     { id: 5, title: "DevOps Engineer", company: "Microsoft", location: "Washington", type: "Remote" }
    // ]

   
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [workMode, setWorkMode] = useState([])
    const [experience, setExperience] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

     // Fetch jobs from Rest API on load
     useEffect(() => {
      fetch("http://localhost:8880/api/jobs").then((res)=>{
        if(!res.ok) throw new Error("Failed to fetch jobs")
          return res.json()
      }).then((data)=>{
        setJobs(data)
        setLoading(false)
      }).catch((err)=>{
        console.error("Error fetching jobs :",err)
        setError("Could not load job listing ")
        setLoading(false)
      })
    },[])


    const filteredJobs = jobs.filter(job => {
        // Check workMode filter
    const matchesWorkMode = workMode.length === 0 || workMode.includes(job.type);
    // Check experience filter
    const matchesExperience = experience.length === 0 || experience.includes(job.experience);
    // Check search term
    // const matchesSearch =
    //    // (filter === "All" || job.type === filter) &&
    //     job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     job.location.toLowerCase().includes(searchTerm.toLowerCase())
        
    return matchesWorkMode && matchesExperience //&& matchesSearch
    })

    // Handle checkbox for work mode
  const handleWorkModeChange = (value) => {
    setWorkMode(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value)
      }
      return [...prev, value]
    })
  }

  // Handle checkbox for experience
  const handleExperienceChange = (value) => {
    setExperience(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value)
      }
      return [...prev, value];
    })
  }

    return (
        <div className="candidate-page">
        <NavBar />

            {/* Main content container */}
            <div className="content-container">
                {/* Left Sidebar Filters */}
                <aside className="filters-section">
                    <h2>Filters</h2>
           
            {/* <h1 className="header">Find Your Dream Job</h1>
            
            <div className="search-filter">
                <input 
                    type="text" 
                    placeholder="Search for jobs..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
                    <option value="All">All</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
            </div>
            
            <div className="job-list">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job.id} className="job-card">
                            <h2>{job.title}</h2>
                            <p><strong>{job.company}</strong> - {job.location}</p>
                            <span className="job-type">{job.type}</span>
                        </div>
                    ))
                ) : (
                    <p className="no-jobs">No jobs found.</p>
                )}
            </div>
        </div> */}



        {/* Work Mode */}
        <div className="filter-group">
            <h3>Work Mode</h3>
            <label>
              <input
                type="checkbox"
                checked={workMode.includes("Remote")}
                onChange={() => handleWorkModeChange("Remote")}
              />
              Remote
            </label>
            <label>
              <input
                type="checkbox"
                checked={workMode.includes("Hybrid")}
                onChange={() => handleWorkModeChange("Hybrid")}
              />
              Hybrid
            </label>
            <label>
              <input
                type="checkbox"
                checked={workMode.includes("On-site")}
                onChange={() => handleWorkModeChange("On-site")}
              />
              On-site
            </label>
          </div>

          {/* Experience */}
          <div className="filter-group">
            <h3>Experience</h3>
            <label>
              <input
                type="checkbox"
                checked={experience.includes("0-1 yrs")}
                onChange={() => handleExperienceChange("0-1 yrs")}
              />
              0-1 yrs
            </label>
            <label>
              <input
                type="checkbox"
                checked={experience.includes("1-3 yrs")}
                onChange={() => handleExperienceChange("1-3 yrs")}
              />
              1-3 yrs
            </label>
            <label>
              <input
                type="checkbox"
                checked={experience.includes("3-5 yrs")}
                onChange={() => handleExperienceChange("3-5 yrs")}
              />
              3-5 yrs
            </label>
            <label>
              <input
                type="checkbox"
                checked={experience.includes("5+ yrs")}
                onChange={() => handleExperienceChange("5+ yrs")}
              />
              5+ yrs
            </label>
          </div>
        </aside>

        {/* Main Job Listing Section */}
        <section className="jobs-section">
          <h2 className="page-title">Find Your Dream Job</h2>
          <div className="jobs-header">
            <span>{filteredJobs.length} jobs found</span>
          </div>

          <div className="job-list">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-info">
                    <h3 className="job-title">{job.title}</h3>
                    <p className="company-location">
                      <strong>{job.company}</strong> - {job.location}
                    </p>
                    <p className="job-meta">
                      Type: {job.type} | Experience: {job.experience}
                    </p>
                  </div>
                  <div className="apply-section">
                    <button className="apply-btn">Apply</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-jobs">No jobs found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
    )
}

export default CandidatePage
