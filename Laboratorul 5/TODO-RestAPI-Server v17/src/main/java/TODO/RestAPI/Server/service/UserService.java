package TODO.RestAPI.Server.service;

import TODO.RestAPI.Server.entity.User;
import TODO.RestAPI.Server.entity.Task;
import TODO.RestAPI.Server.entity.Category;
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
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        // Logica de validare sau alte operații înainte de a salva utilizatorul
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        if (userRepository.existsById(id)) {
            updatedUser.setId(id);
            return userRepository.save(updatedUser);
        } else {
            return null;
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Methods for tasks and categories specific to a user

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
            // Update task properties as needed
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            // Save the updated task
            userRepository.save(task.getUser());
        });
        return updatedTask;
    }

    public void deleteTaskForUser(Long userId, Long taskId) {
        getTaskByIdForUser(userId, taskId).ifPresent(task -> {
            task.getUser().getTasks().remove(task);
            userRepository.save(task.getUser());
        });
    }

    public List<Category> getAllCategoriesForUser(Long userId) {
        return getUserById(userId)
                .map(User::getCategories)
                .orElse(null);
    }

    public Optional<Category> getCategoryByIdForUser(Long userId, Long categoryId) {
        return getAllCategoriesForUser(userId).stream()
                .filter(category -> category.getId().equals(categoryId))
                .findFirst();
    }

    public Category createCategoryForUser(Long userId, Category category) {
        getUserById(userId).ifPresent(user -> {
            category.setUser(user);
            user.getCategories().add(category);
            userRepository.save(user);
        });
        return category;
    }

    public Category updateCategoryForUser(Long userId, Long categoryId, Category updatedCategory) {
        getCategoryByIdForUser(userId, categoryId).ifPresent(category -> {
            // Update category properties as needed
            category.setName(updatedCategory.getName());
            // Save the updated category
            userRepository.save(category.getUser());
        });
        return updatedCategory;
    }

    public void deleteCategoryForUser(Long userId, Long categoryId) {
        getCategoryByIdForUser(userId, categoryId).ifPresent(category -> {
            category.getUser().getCategories().remove(category);
            userRepository.save(category.getUser());
        });
    }
}