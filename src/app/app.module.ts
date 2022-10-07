import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentEditComponent } from './pages/comment-edit/comment-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { TaskEditComponent } from './pages/task-edit/task-edit.component';
import { TaskComponent } from './pages/task/task.component';
import { CommentService } from './services/comment.service';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskComponent,
    TaskEditComponent,
    CommentEditComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UserService,
    TaskService,
    CommentService,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
