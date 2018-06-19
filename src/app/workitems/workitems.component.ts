import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

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
    this.workitemIds="190702,190703,473011,652579,652582,652584";
    this.workitemFields="System.Id,Microsoft.GPE.ProjectInformation.GPETFSLocation,System.Title,Microsoft.GPE.ProjectInformation.Schedule.RTX,Microsoft.GPE.ProjectInformation.Schedule.Shelf";
    this.workitemFieldsList=this.workitemFields.split(",");
    this.httpService.getWorkitems(this.workitemIds,this.workitemFields)
    .subscribe(workItems => {
      console.log(workItems);
      console.log("count: "+workItems["count"]);
      this.witFields = workItems["value"];
      var myfields;
      let fieldvals=[];
      for (let field of this.witFields)
      {
        //console.log("id: "+field.id);
        myfields = this.workitemFields.split(",");
        for(let info of myfields)
        {
          fieldvals.push(field.fields[info]);
          console.log("fields: " info + " = "+ field.fields[info]);
        }
        console.log("fields: SystemId:" + field.fields["System.Id"]);
      }
      this.witFields.push(fieldvals);
    });
  }

}
