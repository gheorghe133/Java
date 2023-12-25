package TODO.RestAPI.Server.service;

import TODO.RestAPI.Server.entity.User;
import TODO.RestAPI.Server.entity.Task;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import TODO.RestAPI.Server.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> user.setTotalTasks(user.getTasks().size()));
        return users;
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        if (userRepository.existsById(id)) {
            User existingUser = userRepository.findById(id).orElse(null);
            if (existingUser != null) {
                existingUser.setUsername(updatedUser.getUsername());
                existingUser.setEmail(updatedUser.getEmail());

                if (updatedUser.getTasks() != null) {
                    existingUser.setTasks(updatedUser.getTasks());
                }

                return userRepository.save(existingUser);
            }
        }
        return null;
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<Task> getAllTasksForUser(Long userId) {
        return getUserById(userId)
                .map(User::getTasks)
                .orElse(null);
    }

    public Optional<Task> getTaskByIdForUser(Long userId, Long taskId) {
        return getAllTasksForUser(userId).stream()
                .filter(task -> task.getId().equals(taskId))
                .findFirst();
    }

    public Task createTaskForUser(Long userId, Task task) {
        getUserById(userId).ifPresent(user -> {
            task.setUser(user);
            user.getTasks().add(task);
            userRepository.save(user);
        });
        return task;
    }

    public Task updateTaskForUser(Long userId, Long taskId, Task updatedTask) {
        getTaskByIdForUser(userId, taskId).ifPresent(task -> {
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            userRepository.save(task.getUser());
        });
        return updatedTask;
    }

    @Transactional
    public void deleteTaskForUser(Long userId, Long taskId) {
        getTaskByIdForUser(userId, taskId).ifPresent(task -> {
            task.getUser().getTasks().remove(task);
            userRepository.save(task.getUser());
        });
    }
}