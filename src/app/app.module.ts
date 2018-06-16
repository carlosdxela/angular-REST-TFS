import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';

//import {ProjectsComponent} from './projects/projects.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { WiqlComponent } from './wiql/wiql.component';
import { WorkitemsComponent } from './workitems/workitems.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WiqlComponent,
    WorkitemsComponent,
  //  ProjectsComponent
  ],
  imports: [

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
