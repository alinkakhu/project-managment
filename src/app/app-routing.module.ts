import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { BoardModule } from './boards/board.module';
import { LoginGuard } from './login/login.guard';
const routes: Routes = [
  { path: '', redirectTo: '/welcome-page', pathMatch: 'full' },
  { path: 'welcome-page', component: WelcomePageComponent },
  { path: 'login', component: LoginComponent, canActivate:[LoginGuard] },
  { path: 'register', component: RegistrationComponent, canActivate:[LoginGuard]},
  { path: 'edit', component: EditProfileComponent},
  {
    path: 'boards',
 loadChildren: () => import('./boards/board.module').then((m) => m.BoardModule),
  },
  { path: '**', redirectTo: '/welcome-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }