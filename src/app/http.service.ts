import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {TfsRespProjects} from './tfs-resp-classes/tfs-resp-projects';
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
    return this.http.get<TfsRespProjects>(projectsURL,{headers:this.headers})
    // .subscribe(data=>{
    //   //need to do something more with the data
    //   console.log(data);
    //   console.log("Found "+data.count + " projects.");
    //   //return data;
    //
    // }, (err:HttpErrorResponse)=>{
    //   if (err.error instanceof Error){
    //     console.log('Client-side error occurred.', err);
    //   } else{
    //     console.log('Server-side error occurred.\n',err);
    //   }
    // }
    // )
    .pipe(
      tap(projects => console.log('get projects')),
      catchError(this.handleError('getProjectsfromTFS',[]))
    )
  }

  public getPDBProjects():void{
    let pdbprojectsURL = this.apiURL + "wit/wiql?api-version=2.0";

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
