import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthWebService } from 'src/app/shared/web-services/auth-web.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm = this.fb.group({
    FirstName: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', Validators.required],
    Password: ['', Validators.required],
    DateOfBirth: ['', Validators.required],
    TypeId: ['3', Validators.required],
  });

  constructor(private fb: FormBuilder, private authWebService : AuthWebService, private router : Router)
  {
    
  }
  ngOnInit(): void {
    
  }
  hide = true;

  register(): void{    
    this.authWebService.register(this.registrationForm.value).subscribe((data) => {
      window.alert("Uspesna registracija. Molimo Vas ulogujte se");
      this.router.navigate(['']);
    });
  }

}