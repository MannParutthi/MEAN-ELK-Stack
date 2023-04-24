import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login-service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: [null],
    password: [null]
  });

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("on submit ==> ", this.loginForm.value);

    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe((response: any) => {
      console.log(response);
      if(response.status === 200) {
        console.log("Login successful");
        this.router.navigate(['/dashboard'], { queryParams : { username: this.loginForm.value.username } });
      }
      else {
        console.log("Login failed");
      }
    }, (error) => {
      console.log(error);
      console.log("Login failed");
    });
  }


  onCreateAccount() {
    this.router.navigate(['/create-account']);
  }

}
