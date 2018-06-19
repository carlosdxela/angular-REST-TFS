import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import {TfsRespProjects} from './tfs-resp-classes/tfs-resp-projects';
import {TfsRespWiql} from './tfs-resp-classes/tfs-resp-wiql';
import {TfsReqQuery} from './tfs-resp-classes/tfs-req-query';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiURL:string;//= 'https://vstfreshubext.partners.extranet.microsoft.com:8443/tfs/gpe_games/_apis/projects?api-version=2.0';
  //apiURL = 'http://jsonplaceholder.typicode.com/posts';
  private username:string;//= 'v-calop@microsoft.com';
  private password:string;//= 'qwgsegrm2lmx4do7cyj3ywhlzmth32o52dcppetyc5bspjpukira';
  private headers: HttpHeaders;

  constructor(
    private http:HttpClient
  ) {
    this.headers = new HttpHeaders();
    this.apiURL = 'https://vstfreshubext.partners.extranet.microsoft.com:8443/tfs/gpe_games/_apis/';
    this.username = 'v-calop@microsoft.com';
    this.password = 'qwgsegrm2lmx4do7cyj3ywhlzmth32o52dcppetyc5bspjpukira';
    //let headers = new HttpHeaders();
    this.headers = this.headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    this.headers = this.headers.append("Content-Type", "application/json");
    //console.log(headers);
  }


  public getProjectsfromTFS():Observable<TfsRespProjects>{
    //console.log("api URL:"+this.apiURL + " headers: " + this.headers;
    let projectsURL = this.apiURL + "projects?api-version=2.0";
    return this.http.get<TfsRespProjects>(projectsURL,{headers:this.headers});
    // .pipe(
    //   tap(projects => console.log('get projects')),
    //   catchError(this.handleError('getProjectsfromTFS',[]))
    // )
  }

  public getPDBProjects():Observable<TfsRespWiql>{
    let pdbprojectsURL = this.apiURL + "wit/wiql?api-version=2.0";
    let wiqlQuery = new TfsReqQuery();
    wiqlQuery.query ="SELECT [System.Id], [Microsoft.GPE.ProjectInformation.GPETFSLocation], [Microsoft.GPE.ProjectInformation.ReleaseIterationPath], [Microsoft.GPE.ProjectInformation.Platform], [System.Title], [Microsoft.GPE.ProjectInformation.Schedule.RTX], [Microsoft.GPE.ProjectInformation.Schedule.Shelf] FROM WorkItems WHERE [System.TeamProject] = 'GPE_Games'  AND  [System.WorkItemType] = 'Project'  AND  [Microsoft.GPE.ProjectInformation.Status] = 'Production'  AND  [Microsoft.GPE.LocFinished] <> True ORDER BY [System.Id]";
    return this.http.post<TfsRespWiql>(pdbprojectsURL,wiqlQuery,{headers:this.headers});
  }

  public getWorkitems(wiqlids:string,wiqfields:string):Observable<any>{
    let pdbwiqlURL:string;
    pdbwiqlURL = this.apiURL + "wit/workitems?ids=" + wiqlids + "&fields=" + wiqfields + "&api-version=2.0";
    return this.http.get(pdbwiqlURL,{headers:this.headers});
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('HttpService: ' + message);
  }
}
