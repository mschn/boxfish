import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ServerService } from './server.service';
import { inject } from '@angular/core';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const login = inject(ServerService).login();
  return next(req).pipe(
    catchError((error, caught) => {
      if (error.status === 403) {
        login.mutate(undefined, {
          onError: (err) => {
            console.error(err);
          },
        });
      }
      throw error;
    }),
  );
}
