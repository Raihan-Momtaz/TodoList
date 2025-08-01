import { Component } from '@angular/core';
import { TodoService, TodoItem } from '../../services/todo';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';    
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';       
import { MatButtonModule } from '@angular/material/button';  
import { TaskDialog } from '../../task-dialog/task-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-list',
  standalone: true,
   imports: [CommonModule, FormsModule, MatTableModule, MatIconModule, MatButtonModule, MatDialogModule], 
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
})

export class TodoList {
  todos: TodoItem[] = [];
  newTitle = '';
   displayedColumns: string[] = ['taskTitle', 'createdAt', 'action'];


  constructor(private todoService: TodoService,
    private dialog: MatDialog 
  ) {
    this.loadTodos();
  }

  //function to list all items in a list
loadTodos() {
  this.todoService.getTodos().subscribe(data => {
    // Sort ascending: oldest first
    data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    console.log('Todos loaded and sorted (ascending):', data);
    this.todos = data;
  });
}



   //function to delete an item in a list
  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }

onAdd() {
  const dialogRef = this.dialog.open(TaskDialog, { data: {} });

  dialogRef.afterClosed().subscribe(result => {
    if (!result || !result.title || !result.title.trim()) return;

    const newTodo = {
      taskTitle: result.title.trim(),
      createdAt: result.dateTime,
      isTaskCompleted: false
    };
 
    this.todoService.addTodo(newTodo).subscribe(() => {
      this.loadTodos();
    });
  });
}












}
