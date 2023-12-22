import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

// interfaces
import { User } from 'src/app/models/User/user';
import { Task } from 'src/app/models/Task/task';
import { Category } from 'src/app/models/Category/category';
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

  public getAllUserCategories(userId: number): Observable<any> {
    return this.HttpClient.get(`${this.apiUrl}/${userId}/categories`)
  }

  public getUserCategoryByID(userId: number, categoryId: number): Observable<any> {
    return this.HttpClient.get(`${this.apiUrl}/${userId}/categories/${categoryId}`)
  }

  // POST Requests
  public createUser(user: User): Observable<any> {
    return this.HttpClient.post(`${this.apiUrl}`, user)
  }

  public createUserTask(userId: number, task: Task): Observable<any> {
    return this.HttpClient.post(`${this.apiUrl}/${userId}/tasks`, task)
  }

  public createUserCategory(userId: number, category: Category): Observable<any> {
    return this.HttpClient.post(`${this.apiUrl}/${userId}/categories`, category)
  }

  // PUT Requests
  public updateUser(userId: number, user: any): Observable<any> {
    return this.HttpClient.put(`${this.apiUrl}/${userId}`, user)
  }

  public updateUserTask(userId: number, taskId: number, task: Task): Observable<any> {
    return this.HttpClient.put(`${this.apiUrl}/${userId}/tasks/${taskId}`, task)
  }

  public updateUserCategory(userId: number, categoryId: number, category: Category): Observable<any> {
    return this.HttpClient.put(`${this.apiUrl}/${userId}/categories/${categoryId}`, category)
  }

  // DELETE Requests
  public deleteUserByID(userId: number): Observable<any> {
    return this.HttpClient.delete(`${this.apiUrl}/${userId}`)
  }

  public deleteUserTaskByID(userId: number, taskId: number): Observable<any> {
    return this.HttpClient.delete(`${this.apiUrl}/${userId}/tasks/${taskId}`)
  }

  public deleteUserCategoryByID(userId: number, categoryId: number): Observable<any> {
    return this.HttpClient.delete(`${this.apiUrl}/${userId}/categories/${categoryId}`)
  }
}
