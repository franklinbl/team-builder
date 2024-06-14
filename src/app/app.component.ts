import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  userName = new FormControl('', Validators.required);
  userList: any[] = [];
  // userList: any[] = [
  //   'franklin',
  //   'mata',
  //   'ale',
  //   'donato',
  //   'diego',
  //   'ricardo',
  //   'daniela',
  // ];
  teams: any[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  addUser(): void {
    const userExist = this.userList.find((x) => x === this.userName.value);
    if (userExist !== this.userName.value) {
      this.userList.push(this.userName.value);
      this.userName.reset();
    }
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  generateRandomPairs(array: any[]): void {
    const shuffledArray = this.shuffleArray([...array]);
    const pairs: any[][] = [];

    for (let i = 0; i < shuffledArray.length; i += 2) {
      if (i + 1 < shuffledArray.length) {
        pairs.push([shuffledArray[i], shuffledArray[i + 1]]);
      } else {
        pairs.push([shuffledArray[i]]); // Si es el último elemento impar, lo dejamos solo
      }
    }
    this.teams = pairs;
  }

  deleteUser(userIndex: number) {
    this.userList.splice(userIndex, 1);
  }
}
