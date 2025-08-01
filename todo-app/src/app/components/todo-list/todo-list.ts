import { Component } from '@angular/core';
import { TodoService, TodoItem } from '../../services/todo';
import { CommonModule } from '@angular/common';  // For *ngFor
import { FormsModule } from '@angular/forms';    // For ngModel
import { MatTableModule } from '@angular/material/table'; // ✅ Import Angular Material table
import { MatIconModule } from '@angular/material/icon';       // ✅ Import this
import { MatButtonModule } from '@angular/material/button';  
import { TaskDialog } from '../../task-dialog/task-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // ✅ Import this
@Component({
  selector: 'app-todo-list',
  standalone: true,
   imports: [CommonModule, FormsModule, MatTableModule, MatIconModule, MatButtonModule, MatDialogModule,  TaskDialog ],  // ✅ Add MatTableModule
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
})
export class TodoList {
  todos: TodoItem[] = [];
  newTitle = '';
   displayedColumns: string[] = ['taskTitle', 'action'];  // ✅ Needed for table

  constructor(private todoService: TodoService,
    private dialog: MatDialog // ✅ Inject MatDialog
  ) {
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


onAdd() {
    const dialogRef = this.dialog.open(TaskDialog, {
      width: '90%',
      data: {} // You can pass default data if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.trim()) return;
      this.todoService.addTodo(result).subscribe(() => {
        this.loadTodos(); // Same behavior as original addTodo()
      });
    });
  }












}
