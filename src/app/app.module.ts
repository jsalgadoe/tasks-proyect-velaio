import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './ui/components/navBar/navBar.component';
import ListTaskComponent from './tasks/list-task/list-task.component';
import CreateTaskComponent from './tasks/create-task/create-task.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //* Standalone components
    CreateTaskComponent,
    ListTaskComponent,
    NavBarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
