import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { RegistrationFormComponent } from './shared/components/registration-form/registration-form.component';
import { CourseListComponent } from './features/courses/courses-list/courses-list.component';
import { CourseFormComponent } from './shared/components/course-form/course-form.component';
import { CourseInfoComponent } from './features/course-info/course-info.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';


export const routes: Routes = [
    { path: 'login', component: LoginFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: 'registration', component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: 'courses', component: CourseListComponent, canLoad: [AuthorizedGuard] },
    { path: 'courses/add', component: CourseFormComponent, canLoad: [AdminGuard] },
    { path: 'courses/:id', component: CourseInfoComponent, canLoad: [AuthorizedGuard] },
    { path: 'courses/edit/:id', component: CourseFormComponent, canLoad: [AdminGuard] },
    { path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: '**', redirectTo: 'courses' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
