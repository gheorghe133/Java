package TODO.RestAPI.Server.repository;

import TODO.RestAPI.Server.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserId(Long userId);

    Optional<Task> findByIdAndUserId(Long taskId, Long userId);
    @Query("SELECT COUNT(t) FROM Task t WHERE t.user.id = :userId")
    int countByUserId(@Param("userId") Long userId);
}
