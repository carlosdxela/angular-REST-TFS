import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {TfsRespWiql} from '../tfs-resp-classes/tfs-resp-wiql';

@Component({
  selector: 'app-workitems',
  templateUrl: './workitems.component.html',
  styleUrls: ['./workitems.component.css'],
  providers: [HttpService]
})
export class WorkitemsComponent implements OnInit {

  workitemIds:string;
  workitemFields:string;
  workitemFieldsList:string[];
  witFields=[];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.workitemIds="190702,190703,473011,652579,652582,652584,652606,652607,771799,771831,794554,809708,829762,829763,843456,858978,861473,862185";
    this.workitemFields="System.Id,Microsoft.GPE.ProjectInformation.Platform,Microsoft.GPE.ProjectInformation.GPETFSLocation,System.Title,Microsoft.GPE.ProjectInformation.Schedule.RTX,Microsoft.GPE.ProjectInformation.Schedule.Shelf";
    this.workitemFieldsList=this.workitemFields.split(",");
    this.getProjectsList();
    //this.getworkItems();
  }

  private getProjectsList(){
    let ret=[];
    let query:string;
    query="SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = 'GPE_Games'  AND  [System.WorkItemType] = 'Project'  AND  [Microsoft.GPE.ProjectInformation.Status] = 'Production'  AND  [Microsoft.GPE.LocFinished] <> True ORDER BY [System.Id]";
    let values:TfsRespWiql;
    this.httpService.getPDBProjects(query)
    .subscribe(response=>{
      values = response;
      //console.log("getProjectsList:values " + values);
      for(let id of values.workItems){
        //console.log(id["id"]);
        ret.push(id["id"]);
      }
      this.workitemIds = ret.join();
      this.getworkItems();
    });

  }

  private getworkItems():void{
    let witvalues;
    this.httpService.getWorkitems(this.workitemIds,this.workitemFields)
    .subscribe(workItems => {
      //console.log(workItems);
      //console.log("count: "+workItems["count"]);
      witvalues = workItems["value"];

      var myfields;
      let fieldvals=[];
      //this.witFields=[];
      for (let field of witvalues)
      {
        fieldvals=[];
        myfields = this.workitemFields.split(",");
        for(let info of myfields)
        {
          //if (field.fields.hasOwnProperty(info))
          {
            fieldvals.push(field.fields[info]);
          }
        }
        this.witFields.push(fieldvals);
      }
    });
  }

}
