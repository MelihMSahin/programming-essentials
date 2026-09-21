import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student';

@Component({
  imports: [],
  selector: 'app-student-detail',
  styleUrl: './student-detail.css',
  templateUrl: './student-detail.html',
  standalone: true,
})
export class StudentDetail {
  private route = inject(ActivatedRoute);
  private studentService = inject(Student);
  private cdr = inject(ChangeDetectorRef);

  student: { id: number; name: string; score: number } | undefined;
  loading = true;
  errorMessage = '';

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentById(id).subscribe({
      next: (data) => {
        this.student = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Could not load that student.';
        this.loading = false;
        console.error(err);
        this.cdr.markForCheck();
      },
    });
  }
}
 
 
