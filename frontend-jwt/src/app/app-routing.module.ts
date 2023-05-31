import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfterLoginService } from './core/services/login/after-login.service';
import { BeforeLoginService } from './core/services/login/before-login.service';
//Imports lógica del Usuario
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { ProfileComponent } from './public/profile/profile.component';
//Imports vistas públicas de la aplicación
import { IndexComponent } from './public/index/index.component';
import { InfoComponent } from './public/info/info.component';
//Imports lógica de cursos
import { IndexPathwayComponent } from './private/pathway/index-pathway/index-pathway.component';
import { ShowPathwayComponent } from './private/pathway/show-pathway/show-pathway.component';
import { StorePathwayComponent } from './private/pathway/store-pathway/store-pathway.component';
import { EditPathwayComponent } from './private/pathway/edit-pathway/edit-pathway.component';
import { ShowCourseComponent } from './private/course/show-course/show-course.component';
import { StoreCourseComponent } from './private/course/store-course/store-course.component';
import { EditCourseComponent } from './private/course/edit-course/edit-course.component';
import { ShowClassComponent } from './private/class/show-class/show-class.component';
import { StoreClassComponent } from './private/class/store-class/store-class.component';
import { EditClassComponent } from './private/class/edit-class/edit-class.component';
import { CompleteCourseComponent } from './private/course/complete-course/complete-course.component';

const routes: Routes = [
  //Enrutado lógica del Usuario
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService]
  },
  //Enrutado vistas públicas de la aplicación
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  //Enrutando lógica de cursos
  {
    path: 'pathway',
    component: IndexPathwayComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'pathway/:id',
    component: ShowPathwayComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'pathway/store/:id',
    component: StorePathwayComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'pathway/update/:id',
    component: EditPathwayComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'course/:id',
    component: ShowCourseComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'course/store/:id',
    component: StoreCourseComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'course/update/:id',
    component: EditCourseComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'class/:id_doc/:id_course',
    component: ShowClassComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'class/store',
    component: StoreClassComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'class/update/:id/:id',
    component: EditClassComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'complete-course/:id_course',
    component: CompleteCourseComponent,
    canActivate: [AfterLoginService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
