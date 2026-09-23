import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course, CourseService } from '../course';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-course-list',
  standalone: true,
  styleUrl: './course-list.css',
  templateUrl: './course-list.html',
})
export class CourseList {
  courses: Course[] = [];
  courseName = '';
  errorMessage = '';

  private cdr = inject(ChangeDetectorRef);

  constructor(private courseService: CourseService) {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Could not load courses.';
        this.cdr.markForCheck();
      },
    });
  }

  addCourse() {
    const name = this.courseName.trim();
    if (!name) return;

    this.courseService.createCourse({ name }).subscribe({
      next: (course) => {
        this.courses = [...this.courses, course].sort((left, right) => left.name.localeCompare(right.name));
        this.courseName = '';
      },
      error: () => this.errorMessage = 'Could not add course.',
    });
  }

  deleteCourse(id: string) {
    this.courseService.deleteCourse(id).subscribe({
      next: () => this.courses = this.courses.filter(course => course.id !== id),
      error: () => this.errorMessage = 'Could not delete course.',
    });
  }
}
