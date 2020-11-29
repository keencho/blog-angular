import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import {PostArchivesComponent} from './components/post/archives/archives.component';
import {WriteComponent} from './components/post/write/write.component';
import {ViewComponent} from './components/post/view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'post/archives', component: PostArchivesComponent },
  { path: 'post/write', component: WriteComponent},
  { path: 'post/view/:path', component: ViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
