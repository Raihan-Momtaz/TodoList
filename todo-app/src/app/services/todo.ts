import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TodoItem {
  taskId: number;
  taskTitle: string;
  isTaskCompleted: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  //backend http hosted on port 5001
  private apiUrl = 'http://localhost:5001/api/todo';

  constructor(private http: HttpClient) {}

  //function to retrieve TODO list
  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  //function to add an item in TODO list
  addTodo(todo: { taskTitle: string; createdAt: string; isTaskCompleted?: boolean }): Observable<TodoItem> {
    // Set default isTaskCompleted to false if not provided
    const newTodo = {
      taskTitle: todo.taskTitle,
      createdAt: todo.createdAt,
      isTaskCompleted: todo.isTaskCompleted ?? false
    };
    return this.http.post<TodoItem>(this.apiUrl, newTodo);
  }


  //function to delete an item in TODO list
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
