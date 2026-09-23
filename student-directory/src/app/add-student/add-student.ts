import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from '../course';

export interface NewStudent {
  name: string;
  score: number;
  courseId?: string;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-add-student',
  styleUrl: './add-student.css',
  templateUrl: './add-student.html',
  standalone: true,
})
export class AddStudent {
  @Output() studentAdded = new EventEmitter<NewStudent>();
  @Input() courses: Course[] = [];

  onSubmit() {
    if (this.addStudentForm.invalid) {
      this.addStudentForm.markAllAsTouched();
      return;
    }

    const { name, score, courseId } = this.addStudentForm.getRawValue();
    this.studentAdded.emit({
      name: name.trim(),
      score: Number(score),
      courseId: courseId || undefined,
    });
    this.addStudentForm.reset();
  }

  addStudentForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    score: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(0),
        Validators.max(100),
      ],
    }),
    courseId: new FormControl('', { nonNullable: true }),
  });
}
