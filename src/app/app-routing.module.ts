import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import {PostListComponent} from './components/post/list/list.component';
import {WriteComponent} from './components/post/write/write.component';
import {ViewComponent} from './components/post/view/view.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'post/list', component: PostListComponent },
  { path: 'post/write', component: WriteComponent},
  { path: 'post/view/:path', component: ViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
