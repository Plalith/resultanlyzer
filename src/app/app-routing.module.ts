import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { StudentdashboardComponent } from './layout/studentdashboard/studentdashboard.component';
import { SdashboardComponent } from './layout/studentdashboard/sdashboard/sdashboard.component';
import { CheckresultComponent } from './layout/studentdashboard/checkresult/checkresult.component';
import { BacklogsComponent } from './layout/studentdashboard/backlogs/backlogs.component';
import { FeedbackComponent } from './layout/studentdashboard/feedback/feedback.component';
import { ShoppingzoneComponent } from './layout/studentdashboard/shoppingzone/shoppingzone.component';
import { EditprofileComponent } from './layout/studentdashboard/editprofile/editprofile.component';
import { CollegedashboardComponent } from './layout/collegedashboard/collegedashboard.component';
import { CdashboardComponent } from './layout/collegedashboard/cdashboard/cdashboard.component';
import { StudentresultComponent } from './layout/collegedashboard/studentresult/studentresult.component';
import { ResultanalyzeComponent } from './layout/collegedashboard/resultanalyze/resultanalyze.component';
import { UploadresultComponent } from './layout/collegedashboard/uploadresult/uploadresult.component';
import { ResultlistComponent } from './layout/collegedashboard/resultlist/resultlist.component';
import { AddstudentsComponent } from './layout/collegedashboard/addstudents/addstudents.component';
import { AdminfeedbackComponent } from './layout/collegedashboard/adminfeedback/adminfeedback.component';
import { ViewresultlComponent } from './layout/collegedashboard/resultlist/viewresultl/viewresultl.component';
import { FeedbackreportsComponent } from './layout/collegedashboard/adminfeedback/feedbackreports/feedbackreports.component';
import { InvoiceComponent } from './layout/collegedashboard/invoice/invoice.component';
import { NewcollegeComponent } from './layout/login/newcollege/newcollege.component';
import { NewstudentComponent } from './layout/login/newstudent/newstudent.component';
import { StudentsComponent } from './layout/collegedashboard/students/students.component';
import { RoutcheckGuard } from './routcheck.guard';
import { EditclgprofileComponent } from './layout/collegedashboard/editclgprofile/editclgprofile.component';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'index', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path:'signupcollege', component:NewcollegeComponent},
    { path:'signupStudent', component:NewstudentComponent},
    { path: 'studentdashboard', component: StudentdashboardComponent, canActivate: [RoutcheckGuard], children: 
        [
            {path: 'sdashboard', component:SdashboardComponent, canActivate: [RoutcheckGuard]},
            {path: 'checkresult', component:CheckresultComponent, canActivate: [RoutcheckGuard]},
            {path: 'backlogs', component:BacklogsComponent, canActivate: [RoutcheckGuard]},
            {path: 'feedback', component:FeedbackComponent, canActivate: [RoutcheckGuard]},
            {path: 'shoppingzone', component:ShoppingzoneComponent, canActivate: [RoutcheckGuard]},
            {path: 'editprofile', component:EditprofileComponent, canActivate: [RoutcheckGuard]},
        ]
    },
    { path: 'collegedashboard', component: CollegedashboardComponent ,canActivate: [RoutcheckGuard], children:
        [
            {path: 'cdashboard', component:CdashboardComponent, canActivate: [RoutcheckGuard]},
            {path: 'studentresult', component:StudentresultComponent, canActivate: [RoutcheckGuard]},
            {path: 'resultanalyze', component:ResultanalyzeComponent, canActivate: [RoutcheckGuard]},
            {path: 'uploadresult', component:UploadresultComponent, canActivate: [RoutcheckGuard]},
            {path: 'resultlist', component:ResultlistComponent, canActivate: [RoutcheckGuard]},
            {path: 'addstudents', component:AddstudentsComponent, canActivate: [RoutcheckGuard]},
            {path:'students', component:StudentsComponent, canActivate: [RoutcheckGuard]},
            {path: 'feedback', component:AdminfeedbackComponent, canActivate: [RoutcheckGuard]},
            {path: 'fdreports', component:FeedbackreportsComponent, canActivate: [RoutcheckGuard]},
            {path: 'invoice', component:InvoiceComponent, canActivate: [RoutcheckGuard]},
            {path: 'editprofile', component:EditclgprofileComponent, canActivate: [RoutcheckGuard]},
        ]
    }
    // { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    // { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    // { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    // { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    // { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [RoutcheckGuard]
})
export class AppRoutingModule {}