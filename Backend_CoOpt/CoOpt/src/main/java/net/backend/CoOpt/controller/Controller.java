package net.backend.CoOpt.controller;

import net.backend.CoOpt.model.JobEntity;
import net.backend.CoOpt.repository.JobEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins="*")
public class Controller {
	
	@Autowired
	private JobEntityRepository jobEntityRepository;
	
	@GetMapping
	public List<JobEntity> getAllJobs(){
		return jobEntityRepository.findAll();
	}
	
	@PostMapping
	public JobEntity createJob(@RequestBody JobEntity jobEntity) {
		return jobEntityRepository.save(jobEntity);
	}

}
