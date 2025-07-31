import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TodoItem {
  taskId: number;
  taskTitle: string;
  isTaskCompleted: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:5001/api/todo';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

addTodo(title: string): Observable<TodoItem> {
  const newTodo = {
    taskTitle: title,
    isTaskCompleted: false // or whatever default you want
  };
  return this.http.post<TodoItem>(this.apiUrl, newTodo);
}



  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
