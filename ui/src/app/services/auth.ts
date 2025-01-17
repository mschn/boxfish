import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ServerService } from './server.service';

let pending = false;

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const login = inject(ServerService).login();
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 403 && !pending) {
        pending = true;
        login.mutate(undefined, {
          onError: (err) => {
            console.error(err);
          },
          onSettled: () => (pending = false),
        });
      }
      throw error;
    }),
  );
}
