package net.backend.CoOpt.repository;

import java.util.List;
import net.backend.CoOpt.model.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobEntityRepository extends JpaRepository<JobEntity , Long> {

	List<JobEntity> findAllByJobId(int jobId);
}
