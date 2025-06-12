package net.backend.CoOpt.model;

import jakarta.persistence.*;

import net.Enums.Constants;

@Entity
@Table(name=Constants.jobdetails)

public class JobEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long jobId;
	private String jobTitle;
	private String company;
	private String location;
	private String type;
	private String experience;

	public JobEntity() {
		super();
		
	}

	public JobEntity(String jobTitle, String company, String location, String type, String experience) {
		super();
		this.jobTitle = jobTitle;
        this.company = company;
        this.location = location;
        this.type = type;
        this.experience = experience;

	}
	
	public Long getJobId() { return jobId; }
    public void setId(Long jobId) { this.jobId = jobId; }
    
    public String getJobTitle() { return jobTitle; }
    public void setTitle(String jobTitle) { this.jobTitle = jobTitle; }
    
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

}
