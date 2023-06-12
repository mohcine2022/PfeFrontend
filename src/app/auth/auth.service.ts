import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  login(user: any): Observable<any> {
    return this.http.post('/api/auth/authenticate', user)
      .pipe(
        tap((response: any) => {
          const token = response.token;
          console.log(token)
          if(token) {
            localStorage.setItem('access_token', token);
            this.router.navigateByUrl('/dashboard')
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    location.reload();
  }

  register(userData: any) {
    return this.http.post("/api/auth/register", userData)
      .pipe(tap((resultData: any) => {
        console.log(resultData);

        if (resultData.message == "OK") {
          this.router.navigateByUrl("/login");
        } else alert("Error");
      }));
  }
}
