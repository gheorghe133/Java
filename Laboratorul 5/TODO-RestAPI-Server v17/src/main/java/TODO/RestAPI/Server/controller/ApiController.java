package TODO.RestAPI.Server.controller;

import TODO.RestAPI.Server.entity.Category;
import TODO.RestAPI.Server.entity.Task;
import TODO.RestAPI.Server.entity.User;
import TODO.RestAPI.Server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class ApiController {

    @Autowired
    private UserService userService;

    // User Endpoints

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId).orElse(null);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User updatedUser) {
        return userService.updateUser(userId, updatedUser);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }

    // Task Endpoints for a specific User

    @GetMapping("/{userId}/tasks")
    public List<Task> getAllTasksForUser(@PathVariable Long userId) {
        return userService.getAllTasksForUser(userId);
    }

    @GetMapping("/{userId}/tasks/{taskId}")
    public Task getTaskByIdForUser(@PathVariable Long userId, @PathVariable Long taskId) {
        return userService.getTaskByIdForUser(userId, taskId).orElse(null);
    }

    @PostMapping("/{userId}/tasks")
    public Task createTaskForUser(@PathVariable Long userId, @RequestBody Task task) {
        return userService.createTaskForUser(userId, task);
    }

    @PutMapping("/{userId}/tasks/{taskId}")
    public Task updateTaskForUser(@PathVariable Long userId, @PathVariable Long taskId, @RequestBody Task updatedTask) {
        return userService.updateTaskForUser(userId, taskId, updatedTask);
    }

    @DeleteMapping("/{userId}/tasks/{taskId}")
    public void deleteTaskForUser(@PathVariable Long userId, @PathVariable Long taskId) {
        userService.deleteTaskForUser(userId, taskId);
    }

    // Category Endpoints for a specific User

    @GetMapping("/{userId}/categories")
    public List<Category> getAllCategoriesForUser(@PathVariable Long userId) {
        return userService.getAllCategoriesForUser(userId);
    }

    @GetMapping("/{userId}/categories/{categoryId}")
    public Category getCategoryByIdForUser(@PathVariable Long userId, @PathVariable Long categoryId) {
        return userService.getCategoryByIdForUser(userId, categoryId).orElse(null);
    }

    @PostMapping("/{userId}/categories")
    public Category createCategoryForUser(@PathVariable Long userId, @RequestBody Category category) {
        return userService.createCategoryForUser(userId, category);
    }

    @PutMapping("/{userId}/categories/{categoryId}")
    public Category updateCategoryForUser(@PathVariable Long userId, @PathVariable Long categoryId, @RequestBody Category updatedCategory) {
        return userService.updateCategoryForUser(userId, categoryId, updatedCategory);
    }

    @DeleteMapping("/{userId}/categories/{categoryId}")
    public void deleteCategoryForUser(@PathVariable Long userId, @PathVariable Long categoryId) {
        userService.deleteCategoryForUser(userId, categoryId);
    }
}

