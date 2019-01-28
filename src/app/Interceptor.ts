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
        'http://localhost/api/get_coleges_names',
        'http://localhost/api/get_selected_coleges_names',
        'http://localhost/api/verify_rollno',
        'http://localhost/api/send_otp',
    ]
    constructor(private _loadingBar: SlimLoadingBarService, private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.url);
        if (this.urls_except.includes(req.url) || req.url.match(/2factor.in/g)) {
            return next.handle(req);
        } else if (localStorage.getItem('u_d') === null) {
            this.router.navigateByUrl('/login');
        } else {
            this._loadingBar.start();
            document.getElementById('loading').style.display = "block";
            let request = req.clone({
                setHeaders: { token_val: JSON.parse(localStorage.getItem('u_d')).token_val, token_name: JSON.parse(localStorage.getItem('u_d')).username }
            });
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