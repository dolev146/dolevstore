import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('StepOne') StepOne;

  constructor(public rs: RegisterService, private snackBar: MatSnackBar, private r: Router) { }

  registerForm: FormGroup
  isComplited: boolean = false;
  isFirstStepValid: boolean = false;
  isPasswordsMatch: boolean = false;
  isIDTaken: boolean = false;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      customer_id: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      passwordconfirm: new FormControl('', [Validators.required]),
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
    })



  }




  onRegister() {
    this.rs.submitRegister(this.registerForm.value).subscribe((res) => {
      this.snackBar.open(`registered successfully!`, 'dismiss', { duration: 4000 })
      this.r.navigateByUrl("/home")
    }
      ,
      err => {
        console.log(err)
        this.snackBar.open(`${err.error.msg}`, 'dismiss', { duration: 4000 })
      }
    )
  }

  PasswordsMatchFunction(password, passwordconfirm) {
    if (password.value == passwordconfirm.value) {
      this.isPasswordsMatch = false
    }
    else {
      this.isPasswordsMatch = true
    }
  }

  FirstStepValidfunction() {
    if (this.registerForm.controls['customer_id'].valid
      && this.registerForm.controls['email'].valid
      && this.registerForm.controls['password'].valid
      && this.registerForm.controls['passwordconfirm'].valid) {
      this.isFirstStepValid = true
    } else {
      this.isFirstStepValid = false
    }
  }



  isStepFilled() {
    this.PasswordsMatchFunction(this.registerForm.controls['password'], this.registerForm.controls['passwordconfirm'])
    this.FirstStepValidfunction()
    if (!this.isPasswordsMatch && this.isFirstStepValid && !this.isIDTaken) {
      this.isComplited = true
      this.StepOne.complited = true
    } else {
      this.isComplited = false
      this.StepOne.complited = false
    }
  }


  IDinputChange() {
    this.isStepFilled();
    let customer_id = { "customer_id": this.registerForm.controls['customer_id'].value }
    this.rs.CheckID(customer_id).subscribe((res: any) => {
      this.isIDTaken = res['error']
    },
      err => {
        this.isIDTaken = err.error['error']
      }
    )
  }



}
