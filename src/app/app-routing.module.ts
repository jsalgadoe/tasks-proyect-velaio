import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    title: 'listar tareas',
    loadComponent: () => import('../app/tasks/list-task/list-task.component'),
  },
  {
    path: 'create',
    title: 'crear tareas',
    loadComponent: () => import('./tasks/create-task/create-task.component'),
  },

  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
