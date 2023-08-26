/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  taskObj: Task = new Task();
  taskArray: Task[] = [];
  addTaskValue: string = '';
  changeName: string = 'Add';
  isEditClicked: boolean = false;
  updateID:number = 0;

  constructor(private service: CrudService) {}

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArray = [];
    this.getAllTasks();
    this.isEditClicked?this.changeName="Update":this.changeName="Add";
  }

  onClick(){
    this.isEditClicked? this.updateTask(): this.addTask() ;
   }

  getAllTasks(): void {
    this.service.getAllTasks()
    .subscribe({
      next: (data) => this.taskArray = data,
      error: (err) => alert(err)
    });
  }

  addTask(): void {
    this.taskObj.task_name = this.addTaskValue;

    if(this.addTaskValue === null || this.addTaskValue === '') {
      return alert('Please enter the task');
    }
    
    this.service.addTask(this.taskObj)
    .subscribe({
      next: (data) => this.taskObj = data,
      error: (err) => alert(err),
      complete: () => this.ngOnInit()
    });
    this.addTaskValue = '';
  }

  updateTask(): void {
    this.taskObj = {id:this.updateID,task_name:this.addTaskValue};
    this.service.editTask(this.taskObj)
    .subscribe({
      next: (data) => this.taskObj = data,
      error: (err) => alert(err),
      complete: () => this.ngOnInit()
    });
    this.updateID = 0;
    this.addTaskValue = '';
  }

  editTask(task: Task): void {
    this.addTaskValue = task.task_name;
    this.updateID = task.id;
    this.isEditClicked = true;
    this.ngOnInit();
  }

  deleteTask(task: Task): void {
    this.service.deleteTask(task)
    .subscribe({
      next: (data) => this.taskArray.splice(data.id, 1),
      error: (err) => alert(err),
      complete: () => this.ngOnInit()
    });
  }

  
}
