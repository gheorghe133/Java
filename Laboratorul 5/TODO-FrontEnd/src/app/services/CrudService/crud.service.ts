import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// interfaces
import { User } from 'src/app/models/User/user';
import { Task } from 'src/app/models/Task/task';

// RxJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = 'http://localhost:8080/api/users';
  }

  // GET Requests
  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}`);
  }

  public getUserByID(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/${userId}`);
  }

  public getAllUserTasks(userId: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/${userId}/tasks`);
  }

  public getUserTaskByID(userId: number, taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.apiUrl}/${userId}/tasks/${taskId}`);
  }

  // POST Requests
  public createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}`, user);
  }

  public createUserTask(userId: number, task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.apiUrl}/${userId}/tasks`, task);
  }

  // PUT Requests
  public updateUser(userId: number, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/${userId}`, user);
  }

  public updateUserTask(userId: number, taskId: number, task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.apiUrl}/${userId}/tasks/${taskId}`, task);
  }

  // DELETE Requests
  public deleteUserByID(userId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${userId}`);
  }

  public deleteUserTaskByID(userId: number, taskId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${userId}/tasks/${taskId}`);
  }
}
