import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router:Router
  ) { }

  register(f) {
    this.authService.registerUser(f.value)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
        }
       );
  }

  ngOnInit() {
  }

}
