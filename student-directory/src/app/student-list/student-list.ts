import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentCard } from '../student-card/student-card';
import { Student } from '../student';
import { AddStudent } from '../add-student/add-student';


@Component({
  imports: [FormsModule, StudentCard, AddStudent],
  selector: 'app-student-list',
  standalone: true,
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList {
  students: { id: number; name: string; score: number }[] = [];
  favoriteIds: number[] = [];

  showDetails = false;
  showAddStudent = false;
  editingStudent: { id: number; name: string; score: number } | null = null;
  searchTerm = '';

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

  //explain function
  addStudent(student: { name: string; score: number }) {
    const nextId = Math.max(...this.students.map((existingStudent) => existingStudent.id), 0) + 1;
    this.students = [...this.students, { ...student, id: nextId }];
    this.showAddStudent = false;
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(
      student => student.id !== id
    );
  }

  startEditing(student: { id: number; name: string; score: number }) {
    this.editingStudent = student;
  }

  get filteredStudents() {
    return this.students.filter((student) =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
 