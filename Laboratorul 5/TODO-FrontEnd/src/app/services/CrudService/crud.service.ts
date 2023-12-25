import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

// interfaces
import { User } from 'src/app/models/User/user';
import { Task } from 'src/app/models/Task/task';

//RxJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl: string;

  constructor(private HttpClient: HttpClient) {
    this.apiUrl = 'http://localhost:8080/api/users'
  }

  // GET Requests
  public getAllUsers(): Observable<any> {
    return this.HttpClient.get(`${this.apiUrl}`)
  }

  public getUserByID(userId: number): Observable<any> {
    return this.HttpClient.get(`${this.apiUrl}/${userId}`)
  }

  public getAllUserTasks(userId: number): Observable<any> {
    return this.HttpClient.get(`${this.apiUrl}/${userId}/tasks`)
  }

  public getUserTaskByID(userId: number, taskId: number): Observable<any> {
    return this.HttpClient.get(`${this.apiUrl}/${userId}/tasks/${taskId}`)
  }

  // POST Requests
  public createUser(user: User): Observable<any> {
    return this.HttpClient.post(`${this.apiUrl}`, user)
  }

  public createUserTask(userId: number, task: Task): Observable<any> {
    return this.HttpClient.post(`${this.apiUrl}/${userId}/tasks`, task)
  }

  // PUT Requests
  public updateUser(userId: number, user: any): Observable<any> {
    return this.HttpClient.put(`${this.apiUrl}/${userId}`, user)
  }

  public updateUserTask(userId: number, taskId: number, task: Task): Observable<any> {
    return this.HttpClient.put(`${this.apiUrl}/${userId}/tasks/${taskId}`, task)
  }

  // DELETE Requests
  public deleteUserByID(userId: number): Observable<any> {
    return this.HttpClient.delete(`${this.apiUrl}/${userId}`)
  }

  public deleteUserTaskByID(userId: number, taskId: number): Observable<any> {
    return this.HttpClient.delete(`${this.apiUrl}/${userId}/tasks/${taskId}`)
  }
}
