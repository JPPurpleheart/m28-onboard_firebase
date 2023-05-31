import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { ProfileComponent } from './public/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './public/index/index.component';
import { InfoComponent } from './public/info/info.component';
import { IndexPathwayComponent } from './private/pathway/index-pathway/index-pathway.component';
import { ShowPathwayComponent } from './private/pathway/show-pathway/show-pathway.component';
import { ShowCourseComponent } from './private/course/show-course/show-course.component';
import { ShowClassComponent } from './private/class/show-class/show-class.component';
import { StorePathwayComponent } from './private/pathway/store-pathway/store-pathway.component';
import { EditPathwayComponent } from './private/pathway/edit-pathway/edit-pathway.component';
import { StoreCourseComponent } from './private/course/store-course/store-course.component';
import { EditCourseComponent } from './private/course/edit-course/edit-course.component';
import { EditClassComponent } from './private/class/edit-class/edit-class.component';
import { StoreClassComponent } from './private/class/store-class/store-class.component';
import { CompleteCourseComponent } from './private/course/complete-course/complete-course.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    IndexComponent,
    InfoComponent,
    IndexPathwayComponent,
    ShowPathwayComponent,
    ShowCourseComponent,
    ShowClassComponent,
    StorePathwayComponent,
    EditPathwayComponent,
    StoreCourseComponent,
    EditCourseComponent,
    EditClassComponent,
    StoreClassComponent,
    CompleteCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    LoginComponent,
    // IndexPathwayComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
