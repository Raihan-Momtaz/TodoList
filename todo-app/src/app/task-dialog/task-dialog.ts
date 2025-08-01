import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
   styleUrls: ['./task-dialog.scss'], 
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule],
  template: `

  <div class="dialog-container">
    <h3 mat-dialog-title>Add a new task</h3>

    <mat-dialog-content class="dialog-content">
      <input [(ngModel)]="taskTitle" placeholder="Enter task details here..." class="task-input" (keydown.enter)="onSave()"  />
    </mat-dialog-content>

    <mat-dialog-actions class="dialog-actions">
      <button mat-button color="primary" (click)="onSave()">Add Task</button>
      <button mat-button (click)="onCancel()">Cancel</button>
    </mat-dialog-actions>

  </div>

  `,

})
export class TaskDialog {
  taskTitle: string = '';

  constructor(
    public dialogRef: MatDialogRef<TaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  //function to handle cancel button to close without saving any data
  onCancel(): void {
    this.dialogRef.close(); 
  }

  //function to handle save button to save task data
  onSave(): void {
    if (!this.taskTitle.trim()) return; 
    this.dialogRef.close(this.taskTitle); 
  }
}
