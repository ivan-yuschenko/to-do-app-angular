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

## Basic user flow
- There are 2 main views that user can access - `register\login` and `main`
- If usere is not authorised `/main` page is not available and user will be redirected to the `/login` page
- `Login` view has several validations:
  - Check if input in email field is in a valid email format
  - Check if input in password field is not empy
  - On login button click check if user exists
- If any validations in `Login` view fails user will see appropriate error massage, othewise user will be redirected to the `/main` page
- `Register` view has several validations as well:
  - Check if input in name field is not empy
  - Check if input in email field is in a valid email format
  - Check if input in password field is longer than 5 characters
  - On register button click check if user exists
- If any validations in `Register` view fails user will see appropriate error massage, othewise user will be redirected to the `/main` page
- `Main` view allows user to see, search, sort and modify to-do items based on their status
  - For new user both `Active` and `Completed` lists of items are empty.
  - By typing item name in `Add Item` input and pressing add button next to it user can create new to do item, which will be added to the Active Items list
  - By selecting checkbox in item row user can toggle item status
  - By pressing delete button in item row user can delete item
  - By typing in `Search` field user can filter items
  - By selecting `Active` or `Completed` user can see different list of items by the status
  - If there is more then 10 items in a list - paginator will appear under the list
  - User can sort items by name and date by clicking on the column headers
- When user is not authorized, `Welcome, Stranger` message is shown in header and `Logout` button is hidden
- After autorization message in a header is changed to `Welcome, {username}` and `Logout` button is shown.  

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
