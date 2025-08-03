import { Component } from '@angular/core';
import { TodoService, TodoItem } from '../../services/todo';
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';    
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';       
import { MatButtonModule } from '@angular/material/button';  
import { TaskDialog } from '../../task-dialog/task-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem,} from '@angular/cdk/drag-drop';
import { TaskStatus } from '../../models/task-status.enum';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  standalone: true,
   imports: [
  CommonModule,
  FormsModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  DragDropModule  
],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
})

export class TodoList {
  todos: TodoItem[] = [];
  newTitle = '';
  displayedColumns: string[] = ['taskTitle', 'createdAt','priority','status','type', 'action'];
  TaskStatus = TaskStatus; 
  backlogTodos: TodoItem[] = [];
  inProgressTodos: TodoItem[] = [];
  completedTodos: TodoItem[] = [];

  constructor(private todoService: TodoService, private dialog: MatDialog) {
    this.loadTodos();
  }
  
  alldueTodos: TodoItem[] = [];
  overdueTodos: TodoItem[] = [];
  personalTodos: TodoItem[] = [];
  workTodos: TodoItem[] = [];

  ngOnInit() {
    this.loadTodos();
  }
  //function to load all todo lists
  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {

      this.todos =todos;
      
      const now = new Date();

      this.overdueTodos = todos.filter(todo => {
        const due = new Date(todo.createdAt);
        return  due < now;
      });

      this.alldueTodos = todos.filter(todo => {
        const due = new Date(todo.createdAt);
        return  due >= now;
      });

      // Filter todos by properties for each column
      this.backlogTodos = todos.filter(todo => todo.status === TaskStatus.BACKLOG);
      this.inProgressTodos = todos.filter(todo => todo.status === TaskStatus.IN_PROGRESS);
      this.completedTodos = todos.filter(todo => todo.status === TaskStatus.COMPLETED);
      this.personalTodos = this.alldueTodos.filter(todo => todo.type === 'Personal');
      this.workTodos = this.alldueTodos.filter(todo => todo.type === 'Work');

    });
  }
  
  //function to delete an item in a list
  deleteTodo(id: number) {
  this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
  //function for adding an item in a list
  onAdd() {
    const dialogRef = this.dialog.open(TaskDialog, { data: {} });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.title || !result.title.trim()) return;

      const newTodo = {
        taskTitle: result.title.trim(),
        createdAt: result.dateTime,
        isTaskCompleted: false,
        priority: result.priority,
        type: result.type,
        status:result.status,  
      };
        console.log('Adding new todo:', newTodo);  // <-- Add this line
      this.todoService.addTodo(newTodo).subscribe(() => {
        this.loadTodos();
      });
    });
  }
  //function for drag and droping of task status 
  drop(event: CdkDragDrop<TodoItem[]>, targetStatus: TaskStatus) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedItem = event.previousContainer.data[event.previousIndex];
      movedItem.status = targetStatus;
      movedItem.isTaskCompleted = (targetStatus === TaskStatus.COMPLETED);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.todoService.updateTodo(movedItem).subscribe({
        next: () => this.loadTodos(),
        error: err => {
          console.error('Failed to update todo:', err);
          this.loadTodos(); 
        }
      });
    }
  }
  //function to change color of task status in table
  getPriorityClass(priority: string): string {
    if (!priority) return '';
    const cleanPriority = priority.trim().toLowerCase();
    switch (cleanPriority) {
      case 'high':
        return 'priority-badge high';
      case 'medium':
        return 'priority-badge medium';
      case 'low':
        return 'priority-badge low';
      default:
        return '';
    }
  }
  //function to change color of task status for dragged tasks
  getTaskPriorityClass(priority: string): string {
    if (!priority) return '';
    const cleanPriority = priority.trim().toLowerCase();
    switch (cleanPriority) {
      case 'high': return 'high-priority';
      case 'medium': return 'medium-priority';
      case 'low': return 'low-priority';
      default: return '';
    }
  }
}
