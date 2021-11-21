import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/User';
import { UserData } from 'src/app/models/UserData';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[];
  userData: UserData;
  loading: boolean = false;
  pageEvent: PageEvent;

  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    this.loading = true;
    this.usersService.getUsers(1).subscribe(
      (data) => {
        this.users = data.data;
        this.userData = {
          page: data.page,
          per_page: data.per_page,
          total: data.total,
          total_pages: data.total_pages,
        };
      },
      (err) => console.error('Observer got an error: ' + err),
      () => (this.loading = false)
    );
  }
  onPageChange(e: PageEvent) {
    const page = e.pageIndex + 1;
    this.loading = true;
    this.usersService.getUsers(page).subscribe(
      (data) => {
        this.users = data.data;
        this.userData = {
          page: data.page,
          per_page: data.per_page,
          total: data.total,
          total_pages: data.total_pages,
        };
      },
      (err) => console.error('Observer got an error: ' + err),
      () => (this.loading = false)
    );
  }
}
