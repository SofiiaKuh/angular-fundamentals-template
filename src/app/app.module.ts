import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './shared/components/button/button.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { CoursesModule } from './features/courses/courses.module';

//import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';



library.add(faXmark);

@NgModule({
  declarations: [AppComponent, CourseInfoComponent],
  imports: [
    BrowserModule,
    SharedModule,
      FontAwesomeModule,
//      RouterModule,
      CoursesModule,
      AppRoutingModule 
  ],
  providers: [AuthorizedGuard, NotAuthorizedGuard, CoursesService, CoursesStoreService],
    bootstrap: [AppComponent],
    exports: [ButtonComponent, ModalComponent, FontAwesomeModule],
})
export class AppModule {}
