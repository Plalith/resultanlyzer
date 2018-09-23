import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { StudentdashboardComponent } from './layout/studentdashboard/studentdashboard.component';
import { StudentmenuComponent } from './layout/studentdashboard/studentmenu/studentmenu.component';
import { SdashboardComponent } from './layout/studentdashboard/sdashboard/sdashboard.component';
import { CheckresultComponent } from './layout/studentdashboard/checkresult/checkresult.component';
import { BacklogsComponent } from './layout/studentdashboard/backlogs/backlogs.component';
import { FeedbackComponent } from './layout/studentdashboard/feedback/feedback.component';
import { ShoppingzoneComponent } from './layout/studentdashboard/shoppingzone/shoppingzone.component';
import { EditprofileComponent } from './layout/studentdashboard/editprofile/editprofile.component';
import { CollegedashboardComponent } from './layout/collegedashboard/collegedashboard.component';
import { CollegemenuComponent } from './layout/collegedashboard/collegemenu/collegemenu.component';
import { CdashboardComponent } from './layout/collegedashboard/cdashboard/cdashboard.component';
import { StudentresultComponent } from './layout/collegedashboard/studentresult/studentresult.component';
import { ResultanalyzeComponent } from './layout/collegedashboard/resultanalyze/resultanalyze.component';
import { UploadresultComponent } from './layout/collegedashboard/uploadresult/uploadresult.component';
import { ResultlistComponent } from './layout/collegedashboard/resultlist/resultlist.component';
import { AddstudentsComponent } from './layout/collegedashboard/addstudents/addstudents.component';
import { AdminfeedbackComponent } from './layout/collegedashboard/adminfeedback/adminfeedback.component';
import { ViewresultlComponent } from './layout/collegedashboard/resultlist/viewresultl/viewresultl.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    StudentdashboardComponent,
    StudentmenuComponent,
    SdashboardComponent,
    CheckresultComponent,
    BacklogsComponent,
    FeedbackComponent,
    ShoppingzoneComponent,
    EditprofileComponent,
    CollegedashboardComponent,
    CollegemenuComponent,
    CdashboardComponent,
    StudentresultComponent,
    ResultanalyzeComponent,
    UploadresultComponent,
    ResultlistComponent,
    AddstudentsComponent,
    AdminfeedbackComponent,
    ViewresultlComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
