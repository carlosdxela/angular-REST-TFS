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
    this.httpService.getPDBProjects()
    .subscribe(wiqlResponse => {
      this.wiqlResponse = wiqlResponse;
      console.log("queryType: "+this.wiqlResponse.queryType + "\n" + "queryResultType: "+this.wiqlResponse.queryResultType);
      console.log("Number of items in query: " + this.wiqlResponse.workItems.length);
    });
  }

}
