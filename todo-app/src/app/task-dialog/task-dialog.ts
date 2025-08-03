import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TaskStatus } from '../models/task-status.enum'; // Update path as needed

import {provideNativeDateAdapter} from '@angular/material/core';
@Component({
  selector: 'app-task-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  
  styleUrls: ['./task-dialog.scss'],
  templateUrl: './task-dialog.html', // <-- use this instead of `template:`
  
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,       // ✅ add this
    MatOptionModule        // ✅ and this
  ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDialog {
  taskTitle: string = '';
  selectedDate: Date | null = null;
  selectedTime: string = ''; // HH:mm
  priority: string = 'Medium'; // default
  type: string = 'Personal';
  status: string = 'Backlog';


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
    if (!this.taskTitle.trim() || !this.selectedDate || !this.selectedTime) return;

    // Combine date and time into a single ISO string
    const [hours, minutes] = this.selectedTime.split(':').map(Number);
    const dateTime = new Date(this.selectedDate);
    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);

    this.dialogRef.close({
      title: this.taskTitle,
      dateTime: dateTime.toISOString(),// <-- Add this line for dueDate
      priority: this.priority,
      type: this.type, 
      status:this.status,
    });
  }
}
