# ToDoApp

This project was build using following technologies:
- Angular 13
- [Angular Material UI Component Library](https://material.angular.io/)
- [NGXS state management library for Angular](https://www.ngxs.io/)
## Basic data flow
- There is no real backend, so all data is saved in `toDoData` localStorage object
- Session token is saved in `toDoToken` localStorage object
- `FakeBackend` service is responsible for getting and updating data in localStorage
- `TodoState` NGXS store is responcible for all actions (`AddTodo`, `DeleteTodo`, `ToggleTodo`, `SetTodoList`) with the to-do items in the app
- `AuthState` NGXS store is responcible for all actions (`Login`, `Logout`, `Register`) with the user related data in the app

## Live demo
Live demo is availbale here - https://ivan-yuschenko.github.io/to-do-app-angular/

## Running development server localy
### Prerequisites:
- Node.js (I used latest LTS version v16.13.1)
- NPM (I used v8.3.0)

Download this project repo, navigate in termianl to the project folder and run `ng serve`  for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
