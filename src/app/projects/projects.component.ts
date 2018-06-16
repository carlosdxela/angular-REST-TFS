import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {TfsRespProjects} from '../tfs-resp-classes/tfs-resp-projects';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [HttpService]
})
export class ProjectsComponent implements OnInit {

  projects : TfsRespProjects;

  constructor(private httpService: HttpService){};

  ngOnInit():void{
    this.httpService.getProjectsfromTFS()
    .subscribe(projects => {
      this.projects = projects;
      console.log("# of projects "+this.projects.count);
    });
  }

}
