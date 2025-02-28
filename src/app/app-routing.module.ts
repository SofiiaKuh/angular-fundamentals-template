import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { RegistrationFormComponent } from './shared/components/registration-form/registration-form.component';
import { CourseListComponent } from './features/courses/courses-list/courses-list.component';
import { CourseFormComponent } from './shared/components/course-form/course-form.component';
import { CourseInfoComponent } from './features/course-info/course-info.component';

export const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'registration', component: RegistrationFormComponent },
    { path: 'courses', component: CourseListComponent },
    { path: 'courses/add', component: CourseFormComponent },
    { path: 'courses/:id', component: CourseInfoComponent },
    { path: 'courses/edit/:id', component: CourseFormComponent },
    { path: '', redirectTo: 'courses', pathMatch: 'full' },
    { path: '**', redirectTo: 'courses' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
