import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentCard } from '../student-card/student-card';
import { AddStudent } from '../add-student/add-student';
import { Student, StudentRecord, StudentRequest } from '../student';


@Component({
  imports: [FormsModule, StudentCard, AddStudent],
  selector: 'app-student-list',
  standalone: true,
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList {
  students: StudentRecord[] = [];
  favoriteIds: string[] = [];

  showDetails = false;
  showAddStudent = false;
  searchTerm = '';
  showOnlyFavorites = false;

  private cdr = inject(ChangeDetectorRef);
  loading:boolean = false;
  errorMessage:String = "";

  constructor(private studentService: Student) {
    this.studentService.getStudents().subscribe({
      next: (data) => { 
        this.students = data; 
        this.loading = false; 
        this.cdr.markForCheck();},
      error: () => { 
        this.errorMessage = "Could not load students."; 
        this.cdr.markForCheck();}
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
    if (this.favoriteIds.includes(id)) {
      this.favoriteIds = this.favoriteIds.filter(
        favoriteId => favoriteId !== id
      );
    } else {
      this.favoriteIds = [...this.favoriteIds, id];
    }
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
      const matchesFavorite =
        !this.showOnlyFavorites || this.favoriteIds.includes(student.id);

      return matchesSearch && matchesFavorite;
    });
  }
}
 