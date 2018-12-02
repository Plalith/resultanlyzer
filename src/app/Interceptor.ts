import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest,  HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse ,HttpResponse} from "@angular/common/http";
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do'; 
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private _loadingBar: SlimLoadingBarService) {}
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
            this._loadingBar.start();
            document.getElementById('loading').style.display="block";
            let request = req.clone({
                headers: new HttpHeaders().append('Content-Type', 'application/json')
            });
            return next.handle(request)        
            .do(
                (event:any)=> {
                    if (event instanceof HttpResponse) {
                        // stop our loader here
                        this._loadingBar.complete();
                        document.getElementById('loading').style.display="none";
                        
                    }
                },
                (error:any)=>{
                    if(error instanceof HttpErrorResponse) {
                        if(error.status == 501 ) {
                            console.log("this is error")
                            this._loadingBar.complete();
                        document.getElementById('loading').style.display="none";

                        }
                        console.log("this is error");
                        this._loadingBar.complete();
                        document.getElementById('loading').style.display="none";

                    }
                }
            )
    }
}