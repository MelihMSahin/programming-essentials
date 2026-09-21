import { Component, Inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { StudentCard } from './student-card/student-card';
import { FormsModule } from '@angular/forms';
import { Student} from './student';
import { StudentList } from './student-list/student-list';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
}
