import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { TodoState } from './stores/todo/todo.state';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthState } from './stores/user/auth.state';
import { FakeBackend } from './services/fake-backend.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoTableComponent,
    LogInComponent,
    RegisterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([TodoState, AuthState], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    })
  ],
  providers: [AuthGuard, FakeBackend],
  bootstrap: [AppComponent]
})
export class AppModule { }
