import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface StudentRecord {
  id: string;
  name: string;
  score: number;
}

export interface StudentRequest {
  name: string;
  score: number;
}

@Injectable({ providedIn: 'root' })
export class Student {
    private http = inject(HttpClient);
    //private apiUrl = 'https://jsonplaceholder.typicode.com/users';
    private apiUrl = 'http://localhost:5202/api/Students';

    getStudents(): Observable<StudentRecord[]> {
        return this.http.get<StudentRecord[]>(this.apiUrl);
    }

    getStudentById(id: string): Observable<StudentRecord> {
        return this.http.get<StudentRecord>(`${this.apiUrl}/${id}`);
    }

    createStudent(student: StudentRequest): Observable<StudentRecord> {
      return this.http.post<StudentRecord>(this.apiUrl, student);
    }

    deleteStudent(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}