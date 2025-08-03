import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskStatus } from '../models/task-status.enum';  // adjust path accordingly

export interface TodoItem {
  taskId: number;
  taskTitle: string;
  isTaskCompleted: boolean;
  createdAt: string;
  priority: string;
  type:string;
  status: TaskStatus; //status: string;  // Add this
  dueDate: string;  // <-- add this

  
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
  addTodo(todo: { taskTitle: string; createdAt: string; isTaskCompleted?: boolean; priority: string; type:string; status: TaskStatus;  }): Observable<TodoItem> {
    // Set default isTaskCompleted to false if not provided
    const newTodo = {
      taskTitle: todo.taskTitle,
      createdAt: todo.createdAt,
      isTaskCompleted: todo.isTaskCompleted ?? false,
      priority:todo.priority,
      type:todo.type,
      status:todo.status

    };
    return this.http.post<TodoItem>(this.apiUrl, newTodo);
  }


  //function to delete an item in TODO list
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateTodo(todo: TodoItem): Observable<TodoItem> {
    // Adjust URL based on your API
    return this.http.put<TodoItem>(`${this.apiUrl}/${todo.taskId}`, todo);

  }


}
