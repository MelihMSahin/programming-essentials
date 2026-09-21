import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

export interface NewStudent {
  name: string;
  score: number;
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

  onSubmit() {
    if (this.addStudentForm.invalid) {
      this.addStudentForm.markAllAsTouched();
      return;
    }

    const { name, score } = this.addStudentForm.getRawValue();
    this.studentAdded.emit({
      name: name.trim(),
      score: Number(score),
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
  });
}
