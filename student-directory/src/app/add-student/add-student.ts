import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface NewStudent {
  name: string;
  score: number;
}

@Component({
  imports: [FormsModule],
  selector: 'app-add-student',
  styleUrl: './add-student.css',
  templateUrl: './add-student.html',
  standalone: true,
})
export class AddStudent {
  studentName = '';
  studentScore: number | null = null;

  @Output() studentAdded = new EventEmitter<NewStudent>();

  onSubmit() {
    if (this.studentName.trim() && this.studentScore !== null) {
      this.studentAdded.emit({
        name: this.studentName.trim(),
        score: this.studentScore,
      });
    }
  }
}
