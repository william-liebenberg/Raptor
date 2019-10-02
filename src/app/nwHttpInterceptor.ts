import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import * as Url from "url-parse";

@Injectable()
export class nwHttpInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // get the correlation ID from the querystring parameters by parsing it with https://www.npmjs.com/package/url-parse
        const parsed = new Url(window.location.href, true);
        const correlationId = parsed.query.CorrelationId;
        // const cookieCorrelationId = "i'm a cookie and i feel blue and furry! does that make me a monster?";

        const correlatedRequest = correlationId ?
            req.clone({headers: req.headers.set("X-Correlation-Id", correlationId)})
            :
            req.clone();

        const requestLabel = "Request Duration for: " + req.url;
        console.time(requestLabel);

        return next.handle(correlatedRequest)
            .pipe(
                tap(
                    (event: HttpEvent<any>) => {
                        console.log(correlatedRequest.url);
                    },
                    (err: any) => {
                        if (err instanceof HttpErrorResponse) {
                            if (err.status === 401) {
                                window.location.href = "/nw";
                            }
                        }
                    },
                    () => console.timeEnd(requestLabel)));
    }
}
