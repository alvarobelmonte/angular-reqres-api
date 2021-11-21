import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(
    private usersService: UsersService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {
    if (this.usersService.isAuthenticated()) {
      this.router.navigateByUrl('/users');
    }
  }

  ngOnInit(): void {}

  login(e: Event) {
    e.preventDefault();
    if (!this.email) {
      this._snackBar.open('You must enter an email', '', { duration: 3500 });
      return;
    }
    if (!this.password) {
      this._snackBar.open('You must enter a password', '', { duration: 3500 });
      return;
    }
    const user = { email: this.email, password: this.password };
    this.usersService.login(user).subscribe(
      (data) => {
        this.usersService.setToken(data.token);
        this.router.navigateByUrl('/users');
      },
      (error) => {
        if (error.status === 400) {
          this._snackBar.open("The user doesn't exist", '', {
            duration: 3500,
          });
        }
      }
    );
  }
}
