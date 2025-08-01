import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
   styleUrls: ['./task-dialog.scss'], // ✅ Add this
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule],
  template: `
  <div class="dialog-container">
    <h2 mat-dialog-title>Add Task</h2>

    <mat-dialog-content class="dialog-content">
      <input [(ngModel)]="taskTitle" placeholder="Enter task details here..." class="task-input" />
    </mat-dialog-content>

    <mat-dialog-actions class="dialog-actions">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="primary" (click)="onSave()">Save</button>
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

  onCancel(): void {
    this.dialogRef.close(); // Close without saving
  }

  onSave(): void {
    if (!this.taskTitle.trim()) return; // Avoid empty task
    this.dialogRef.close(this.taskTitle); // Return the task title
  }
}
