import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService} from '../security/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
    ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      password: ['', Validators.required]
        });

       // reset login status
       this.authenticationService.logout();
       // get return url from route parameters or default to '/'
       this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


   get f() { return this.loginForm.controls; }


   onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.authenticationService.authenticate(this.f.username.value, this.f.password.value)
        .subscribe(
            data => {
              localStorage.setItem('currentUser', JSON.stringify(data));
              this.authenticationService.login();
              this.router.navigate(['/inbox']);
            }
          );
}
}
