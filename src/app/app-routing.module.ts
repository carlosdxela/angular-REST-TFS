import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from './projects/projects.component';
import {WiqlComponent} from './wiql/wiql.component';
import {WorkitemsComponent} from './workitems/workitems.component';
import {CommonModule} from '@angular/common';

const routes: Routes =[
  { path: '', component: ProjectsComponent},
  { path:'projects', component:ProjectsComponent},
  { path:'wiql', component:WiqlComponent},
  { path:'workitems', component:WorkitemsComponent}
];

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
