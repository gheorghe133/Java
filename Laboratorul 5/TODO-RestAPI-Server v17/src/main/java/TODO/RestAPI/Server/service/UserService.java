package TODO.RestAPI.Server.service;

import TODO.RestAPI.Server.entity.User;
import TODO.RestAPI.Server.entity.Task;
import TODO.RestAPI.Server.repository.UserRepository;
import TODO.RestAPI.Server.repository.TaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    @Autowired
    public UserService(UserRepository userRepository, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> user.setTotalTasks(calculateTotalTasks(user.getId())));
        return users;
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setUsername(updatedUser.getUsername());
                    existingUser.setEmail(updatedUser.getEmail());
                    return userRepository.save(existingUser);
                })
                .orElse(null);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<Task> getAllTasksForUser(Long userId) {
        return taskRepository.findByUserId(userId);
    }

    public Optional<Task> getTaskByIdForUser(Long userId, Long taskId) {
        return taskRepository.findByIdAndUserId(taskId, userId);
    }

    public Task createTaskForUser(Long userId, Task task) {
        return userRepository.findById(userId)
                .map(user -> {
                    task.setUser(user);
                    taskRepository.save(task);
                    return task;
                })
                .orElse(null);
    }

    public Task updateTaskForUser(Long userId, Long taskId, Task updatedTask) {
        return taskRepository.findByIdAndUserId(taskId, userId)
                .map(task -> {
                    task.setId(taskId);
                    task.setTitle(updatedTask.getTitle());
                    task.setDescription(updatedTask.getDescription());
                    taskRepository.save(task);
                    return updatedTask;
                })
                .orElse(null);
    }

    @Transactional
    public void deleteTaskForUser(Long userId, Long taskId) {
        taskRepository.findByIdAndUserId(taskId, userId)
                .ifPresent(taskRepository::delete);
    }

    private int calculateTotalTasks(Long userId) {
        return taskRepository.countByUserId(userId);
    }
}