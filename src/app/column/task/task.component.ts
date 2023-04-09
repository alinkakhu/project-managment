import { Component, Input} from '@angular/core';
import { Task } from 'src/app/shared/interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
@Input() task!:Task
}
