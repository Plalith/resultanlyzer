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

const routes: Routes = [
    { path: 'index', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path:'signupcollege', component:NewcollegeComponent},
    { path:'signupStudent', component:NewstudentComponent},
    { path: 'studentdashboard', component: StudentdashboardComponent , children: 
        [
            {path: 'sdashboard', component:SdashboardComponent},
            {path: 'checkresult', component:CheckresultComponent},
            {path: 'backlogs', component:BacklogsComponent},
            {path: 'feedback', component:FeedbackComponent},
            {path: 'shoppingzone', component:ShoppingzoneComponent},
            {path: 'editprofile', component:EditprofileComponent},
        ]
    },
    { path: 'collegedashboard', component: CollegedashboardComponent , children:
        [
            {path: 'cdashboard', component:CdashboardComponent},
            {path: 'studentresult', component:StudentresultComponent},
            {path: 'resultanalyze', component:ResultanalyzeComponent},
            {path: 'uploadresult', component:UploadresultComponent},
            {path: 'resultlist', component:ResultlistComponent, children:[ {path: 'viewresult', component:ViewresultlComponent}]},
            {path: 'addstudents', component:AddstudentsComponent},
            {path: 'feedback', component:AdminfeedbackComponent},
            {path: 'fdreports', component:FeedbackreportsComponent},
            {path: 'invoice', component:InvoiceComponent},
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
    exports: [RouterModule]
})
export class AppRoutingModule {}