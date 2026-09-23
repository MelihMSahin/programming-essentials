import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentCard } from '../student-card/student-card';
import { AddStudent } from '../add-student/add-student';
import { Student, StudentRecord, StudentRequest } from '../student';
import { Course, CourseService } from '../course';
import { RouterLink } from '@angular/router';


@Component({
  imports: [FormsModule, StudentCard, AddStudent, RouterLink],
  selector: 'app-student-list',
  standalone: true,
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList {
  students: StudentRecord[] = [];
  courses: Course[] = [];

  showDetails = false;
  showAddStudent = false;
  searchTerm = '';
  showOnlyFavorites = false;
  selectedCourseId = '';
  sortBy = 'name';
  sortDirection = 'asc';
  minScore: number | undefined;
  maxScore: number | undefined;

  private cdr = inject(ChangeDetectorRef);
  loading:boolean = false;
  errorMessage:String = "";

  constructor(private studentService: Student, private courseService: CourseService) {
    this.courseService.getCourses().subscribe({ next: (data) => this.courses = data });
    this.studentService.getStudents().subscribe({
      next: (data) => { 
        this.students = data; 
        this.loading = false; 
        this.cdr.markForCheck();},
      error: () => { 
        this.errorMessage = "Could not load students."; 
        this.cdr.markForCheck(); }
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  addStudent(student: StudentRequest) {
    this.studentService.createStudent(student).subscribe({
      next: (createdStudent) => {
        this.students = [...this.students, createdStudent];
        this.showAddStudent = false;
      },
      error: (error) => {
        this.errorMessage = 'Could not add student.';
        console.error(error);
      }
    });
  }

  toggleFavoriteFilter() {
    this.showOnlyFavorites = !this.showOnlyFavorites;
  }

  toggleFavorite(id: string) {
    const student = this.students.find(item => item.id === id);
    if (!student) return;

    this.studentService.updateFavorite(id, !student.isFav).subscribe({
      next: (updatedStudent) => {
        this.students = this.students.map(item => item.id === id ? updatedStudent : item);
      },
      error: (error) => {
        this.errorMessage = 'Could not update favourite.';
        console.error(error);
      }
    });
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.students = this.students.filter(
          student => student.id !== id
        );
      },
      error: (error) => {
        this.errorMessage = 'Could not delete student.';
        console.error(error);
      }
    });
  }

  get filteredStudents() {
    const search = this.searchTerm.toLowerCase();

    return this.students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(search);
      const matchesCourse = !this.selectedCourseId || student.courseId === this.selectedCourseId;
      const matchesScore = (this.minScore === undefined || student.score >= this.minScore)
        && (this.maxScore === undefined || student.score <= this.maxScore);
      const matchesFavorite =
        !this.showOnlyFavorites || student.isFav;

      return matchesSearch && matchesCourse && matchesScore && matchesFavorite;
    }).sort((left, right) => {
      const leftValue = this.sortBy === 'score' ? left.score : this.sortBy === 'course' ? (left.courseName ?? '') : left.name;
      const rightValue = this.sortBy === 'score' ? right.score : this.sortBy === 'course' ? (right.courseName ?? '') : right.name;
      const comparison = typeof leftValue === 'number' ? leftValue - (rightValue as number) : String(leftValue).localeCompare(String(rightValue));
      return this.sortDirection === 'desc' ? -comparison : comparison;
    });
  }
}
 