import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StudentCard } from '../student-card/student-card';
import { Student } from '../student';


@Component({
  imports: [FormsModule, StudentCard],//, RouterLink, StudentCard],
  selector: 'app-student-list',
  standalone: true,
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList {
  students: { id: number; name: string; score: number }[] = [];
  private cdr = inject(ChangeDetectorRef);

  showDetails = false;
  searchTerm = '';

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

  get filteredStudents() {
    return this.students.filter((student) =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
 