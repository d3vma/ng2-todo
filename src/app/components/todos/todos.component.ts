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
    this.user = this.sharedService.userProfile();

    this.todosService.all().subscribe(
     res => {
       this.tasks = res;
       this.loading = false;
     },
     err => {
       this.error = err;
       this.loading = false;
     }
    );

    this.todosService.doneTasks().subscribe(
     res => {
       this.doneTasks = res;
       this.loading = false;
     },
     err => {
       this.error = err;
       this.loading = false;
     }
    );
  }

  addTask(f) {
    this.hideModal = true;
    this.todosService.addTask(f.value)
      .subscribe(
        data => {
          this.router.navigate(['/']);
          this.hideModal = false;
          f.reset();
        },
        error => {
          this.alertService.error(error);
        }
      );
  }

  updateTask(task){
    task.deleting = true;
    this.doneTasks.push(task);

    this.todosService.updateTask(task.id).subscribe(
      data => this.tasks.splice(this.tasks.indexOf(task), 1),
      err => {
        task.deleting = false;
        this.doneTasks.splice(this.doneTasks.indexOf(task), 1);
      }
    );
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

}
