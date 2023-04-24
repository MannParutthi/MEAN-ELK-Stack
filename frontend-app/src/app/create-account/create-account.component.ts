import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAccountService } from '../services/create-account-service/create-account-service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createAccountFormGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private createAccountService: CreateAccountService, private router: Router) { }

  ngOnInit(): void {
    this.createAccountFormGroup = this.formBuilder.group({
      firstName: [null, []],
      lastName: [null, []],
      username: [null, []],
      password: [null, []],
      confirmPassword: [null, []]
    });
  }

  onCreateAccount(): void {
    console.log("create account ==> ", this.createAccountFormGroup.value);
    if(this.createAccountFormGroup.value.password !== this.createAccountFormGroup.value.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    else if(this.createAccountFormGroup.valid) {
      let payload = this.getCreateAccountPayload(this.createAccountFormGroup.value);
      this.createAccountService.createAccount(payload).subscribe((response: any) => {
        console.log(response);
        if(response.status === 200) {
          console.log("Account created successfully");
        }
        else {
          console.log("Account creation failed");
        }
      });
    }
    else {
      console.log("Please fill in all the fields");
    }
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  getCreateAccountPayload(formGroupValue: any) {
    return {
      firstName: formGroupValue.firstName,
      lastName: formGroupValue.lastName,
      username: formGroupValue.username,
      password: formGroupValue.password
    }
  }

}
