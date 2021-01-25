import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SortingContainerComponent } from './components/sorting-container/sorting-container.component';

const routes: Routes = [
  { path: 'sorting', component: SortingContainerComponent },
  { path: '',   redirectTo: '/sorting', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
