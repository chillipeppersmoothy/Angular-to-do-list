/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  baseUrl: string;
  constructor(private http:HttpClient) { 
    this.baseUrl = 'http://localhost:3000/tasks';
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  deleteTask(task: Task): Observable<Task> {
    const serviceUrl = `${this.baseUrl}/${task.id}`;
    return this.http.delete<Task>(serviceUrl);
  }

  editTask(task: Task): Observable<Task> {
    const serviceUrl = `${this.baseUrl}/${task.id}`;
    return this.http.patch<Task>(serviceUrl, task);
  }
}
