import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';
import { TodosService } from '../../services/todos.service';

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

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private todosService: TodosService,
    private router: Router
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

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
    console.log("logged out! see you soon bro^^");
  }

}
