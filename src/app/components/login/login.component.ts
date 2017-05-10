import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public disabled = false;


  public error = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  login(f) {
    this.disabled = true;
    this.error = false;
    this.authService.authenticateUser(f.value)
      .subscribe(
        data => {
          let x = localStorage.setItem('user', JSON.stringify(data));
          this.router.navigate(['/']);
        },
        error => {
          this.disabled = false;
          this.alertService.error(error);
          this.error = true;
        }
       );
  }

}
