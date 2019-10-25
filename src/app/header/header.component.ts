import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../security/authentication.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginUser = this.authService.loginUser;
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
