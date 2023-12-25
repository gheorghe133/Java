package TODO.RestAPI.Server.controller;

import TODO.RestAPI.Server.entity.Task;
import TODO.RestAPI.Server.entity.User;
import TODO.RestAPI.Server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class ApiController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(this::enrichUserWithTotalTasks)
                .collect(Collectors.toList());
    }

    private User enrichUserWithTotalTasks(User user) {
        user.setTotalTasks(user.getTasks().size());
        return user;
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
}

