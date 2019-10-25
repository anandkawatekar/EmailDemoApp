import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../models/login-response.model';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loginUser = new BehaviorSubject<LoginResponse>(null);

  constructor(private http: HttpClient) { this.logout(); }

  public resp:LoginResponse;

  authenticate(username: string, password: string) : Observable<LoginResponse> {

    return this.http.post<LoginResponse>(`${environment.MailApiUrl}/login`, { EmailId: username, Password: password });
}


login()
{
  const currentUser = <LoginResponse>JSON.parse(localStorage.getItem('currentUser'));
  this.loginUser.next(currentUser);
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loginUser.next(null);
}
}
