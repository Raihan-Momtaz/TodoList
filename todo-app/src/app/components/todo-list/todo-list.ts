import { Component } from '@angular/core';
import { TodoService, TodoItem } from '../../services/todo';
import { CommonModule } from '@angular/common';  // For *ngFor
import { FormsModule } from '@angular/forms';    // For ngModel
import { MatTableModule } from '@angular/material/table'; // ✅ Import Angular Material table
@Component({
  selector: 'app-todo-list',
  standalone: true,
   imports: [CommonModule, FormsModule, MatTableModule],  // ✅ Add MatTableModule
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
})
export class TodoList {
  todos: TodoItem[] = [];
  newTitle = '';
   displayedColumns: string[] = ['taskTitle', 'action'];  // ✅ Needed for table

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => (this.todos = data));
  }

  addTodo() {
    if (!this.newTitle.trim()) return;
    this.todoService.addTodo(this.newTitle).subscribe(() => {
      this.newTitle = '';
      this.loadTodos();
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}
