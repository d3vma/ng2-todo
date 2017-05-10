import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';
import { TodosService } from '../../services/todos.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  public user;

  public error = '';

  public loading = false;

  public tasks = [];

  public doneTasks = [];

  public hideModal = false;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private todosService: TodosService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.loading = true;

    console.log(this.sharedService.token());

    this.user = this.sharedService.userProfile();

    this.todosService.all().subscribe(
     res => {
       this.tasks = res.tasks;
       this.loading = false;
     },
     err => {
       this.error = err;
       console.log("ERR:", err);
       this.loading = false;
     }
    );

    this.todosService.doneTasks().subscribe(
     res => {
       this.doneTasks = res.tasks;
       this.loading = false;
     },
     err => {
       this.error = err;
       console.log("ERR:", err);
       this.loading = false;
     }
    );
  }

  addTask(f) {

    this.hideModal = true;

    this.todosService.addTask(f.value)
      .subscribe(
        data => {
          this.alertService.success('Task added successfully', true);
          this.router.navigate(['/']);
          console.log('Task Added Successfully');
          this.hideModal = false;
        },
        error => {
          this.alertService.error(error);
          console.log('Task adding error', error);
        }
       );
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
    console.log("logged out! see you soon bro^^");
  }

}
