import { NgModule } from '@angular/core';
// form module er jaigai reactive form lagaise. and import o korse
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreatePostComponent } from './post-create/create-post/create-post.component';
import { PostCreateComponent } from './post-create/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

//material
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './post-create/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PostListComponent } from './post-create/post-list/post-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// paginator
import {MatPaginatorModule} from '@angular/material/paginator';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/auth-intercepter';


@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,
     multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
