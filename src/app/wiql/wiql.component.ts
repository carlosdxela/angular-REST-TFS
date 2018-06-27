import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {TfsRespWiql} from '../tfs-resp-classes/tfs-resp-wiql';
@Component({
  selector: 'app-wiql',
  templateUrl: './wiql.component.html',
  styleUrls: ['./wiql.component.css'],
  providers: [HttpService]
})
export class WiqlComponent implements OnInit {

  wiqlResponse: TfsRespWiql;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    let query:string;
    query="SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = 'GPE_Games'  AND  [System.WorkItemType] = 'Project'  AND  [Microsoft.GPE.ProjectInformation.Status] = 'Production'  AND  [Microsoft.GPE.LocFinished] <> True ORDER BY [System.Id]";
    this.httpService.getPDBProjects(query)
    .subscribe(wiqlResponse => {
      this.wiqlResponse = wiqlResponse;
      console.log("queryType: "+this.wiqlResponse.queryType + "\n" + "queryResultType: "+this.wiqlResponse.queryResultType);
      console.log("Number of items in query: " + this.wiqlResponse.workItems.length);
    });
  }

}
