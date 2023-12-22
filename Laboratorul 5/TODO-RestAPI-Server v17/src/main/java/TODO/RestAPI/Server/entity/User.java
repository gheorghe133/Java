package TODO.RestAPI.Server.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Task> tasks;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Category> categories;

    @Transient
    @JsonProperty("numberOfTasks")
    private int numberOfTasks;

    public void updateNumberOfTasks() {
        if (tasks != null) {
            this.numberOfTasks = tasks.size();
        } else {
            this.numberOfTasks = 0;
        }
    }
}
