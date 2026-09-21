import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { StudentDetail } from './student-detail/student-detail';

export const routes: Routes = [
  { path: '', component: StudentList },
  { path: 'student/:id', component: StudentDetail },
];