import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private usersService: UsersService, public router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.usersService.deleteToken();
    this.router.navigateByUrl('/');
  }
}
