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
import { TaskStatus } from '../models/task-status.enum'; 

import {provideNativeDateAdapter} from '@angular/material/core';
@Component({
  selector: 'app-task-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  
  styleUrls: ['./task-dialog.scss'],
  templateUrl: './task-dialog.html', 
  
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,       
    MatOptionModule        
  ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDialog {
  taskTitle: string = '';
  selectedDate: Date | null = null;
  selectedTime: string = ''; 
  priority: string = 'Medium'; 
  type: string = 'Personal';
  status: string = 'Backlog';
  warningMessage: string = '';


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
    if (!this.taskTitle.trim() || !this.selectedDate || !this.selectedTime || !this.priority || !this.type || !this.status) {
      this.warningMessage = 'Please fill all fields to continue.';
      return;
    }

    this.warningMessage = ''; 

    const [hours, minutes] = this.selectedTime.split(':').map(Number);
    const dateTime = new Date(this.selectedDate);
    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);

    this.dialogRef.close({
      title: this.taskTitle,
      dateTime: dateTime.toISOString(),
      priority: this.priority,
      type: this.type, 
      status: this.status,
    });
  }

}
