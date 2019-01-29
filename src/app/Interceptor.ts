import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do';
import { SlimLoadingBarService } from "ng2-slim-loading-bar";
import { Promise } from "es6-promise";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    urls_except: any = [
        'http://localhost/api/login_college_users',
        'http://localhost/api/login_student',
        'http://localhost/api/get_coleges_names',
        'http://localhost/api/get_selected_coleges_names',
        'http://localhost/api/verify_rollno',
        'http://localhost/api/send_otp',
        'http://localhost/api/insert_user_student',
        'http://localhost/api/checkduplicaton',
    ]
    constructor(private _loadingBar: SlimLoadingBarService, private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.urls_except.includes(req.url) || req.url.match(/2factor.in/g)) {
            let request = req.clone({
                setHeaders: {  }
            });
            return next.handle(request)
        } else if (localStorage.getItem('u_d') === null) {
            this.router.navigateByUrl('/login');
        } else {
            this._loadingBar.start();
            document.getElementById('loading').style.display = "block";
            if(JSON.parse(localStorage.getItem('u_d')).user_type==='college'){
                var request = req.clone({
                    setHeaders: { token_val: JSON.parse(localStorage.getItem('u_d')).token_val,
                    token_name: JSON.parse(localStorage.getItem('u_d')).username }
                });
            } else if(JSON.parse(localStorage.getItem('u_d')).user_type==='student') {
                var request = req.clone({
                    setHeaders: { token_val: JSON.parse(localStorage.getItem('u_d')).token_val,
                    token_name: JSON.parse(localStorage.getItem('u_d')).username,
                    token_c_name:JSON.parse(localStorage.getItem('u_d')).c_name }
                });
            } else {
                var request = req.clone({
                    setHeaders: {  }
                });
            }
            return next.handle(request)
                .do(
                    (event: any) => {
                        if (event instanceof HttpResponse) {
                            // stop our loader here
                            this._loadingBar.complete();
                            document.getElementById('loading').style.display = "none";
                        }
                    },
                    (error: any) => {
                        if (error instanceof HttpErrorResponse) {
                            if (error.status == 501) {
                                this.router.navigateByUrl('/login');
                                this._loadingBar.complete();
                                document.getElementById('loading').style.display = "none";
                            }
                            if (error.status == 50) {
                                // this.router.navigateByUrl('/login');
                                this._loadingBar.complete();
                                document.getElementById('loading').style.display = "none";
                            }
                            this.router.navigateByUrl('/login');
                            this._loadingBar.complete();
                            document.getElementById('loading').style.display = "none";
                        }
                    }
                )
        }
    }
}