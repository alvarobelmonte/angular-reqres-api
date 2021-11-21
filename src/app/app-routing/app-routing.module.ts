import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { UserPageComponent } from '../pages/user-page/user-page.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'users',
    component: UserPageComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
