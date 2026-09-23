import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

export interface StudentRecord {
  id: string;
  name: string;
  score: number;
  isFav: boolean;
  courseId?: string;
  courseName?: string;
}

export interface StudentRequest {
  name: string;
  score: number;
  courseId?: string;
}

@Injectable({ providedIn: 'root' })
export class Student {
    private http = inject(HttpClient);
    //private apiUrl = 'https://jsonplaceholder.typicode.com/users';
    private apiUrl = 'http://localhost:5202/api/Students';

    getStudents(filters?: { courseId?: string; search?: string; minScore?: number; maxScore?: number; sortBy?: string; sortDirection?: string }): Observable<StudentRecord[]> {
        let params = new HttpParams();
        Object.entries(filters ?? {}).forEach(([key, value]) => {
          if (value !== undefined && value !== '') params = params.set(key, value);
        });
        return this.http.get<StudentRecord[]>(this.apiUrl, { params });
    }

    getStudentById(id: string): Observable<StudentRecord> {
        return this.http.get<StudentRecord>(`${this.apiUrl}/${id}`);
    }

    createStudent(student: StudentRequest): Observable<StudentRecord> {
      return this.http.post<StudentRecord>(this.apiUrl, student);
    }

    updateFavorite(id: string, isFav: boolean): Observable<StudentRecord> {
      return this.http.patch<StudentRecord>(`${this.apiUrl}/${id}/favorite`, { isFav });
    }

    deleteStudent(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}