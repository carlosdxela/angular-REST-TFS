import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import {TfsRespProjects} from './tfs-resp-classes/tfs-resp-projects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit{
  title = 'Http connect with TFS';
  projects : TfsRespProjects;

  constructor(private httpService: HttpService){};

  ngOnInit():void{
    this.httpService.getProjectsfromTFS()
    .subscribe(projects => this.projects = projects);
  }
}
