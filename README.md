# ToDoApp

This project was built using the following technologies:
- Angular 13
- [Angular Material UI Component Library](https://material.angular.io/)
- [NGXS state management library for Angular](https://www.ngxs.io/)

## Basic data flow
- There is no real backend, so all data is saved in `toDoData` localStorage object
- Session token is saved in `toDoToken` localStorage object
- `FakeBackend` service is responsible for getting and updating data in localStorage
- `TodoState` NGXS store is responsible for all actions (`AddTodo`, `DeleteTodo`, `ToggleTodo`, `SetTodoList`) with the to-do items in the app
- `AuthState` NGXS store is responsible for all actions (`Login`, `Logout`, `Register`) with the user-relate data in the app

## Basic user flow
- There are 2 main views that users can access - `register\login` and `main`
- If the user is not authorised `/main` page is not available and the user will be redirected to the `/login` page
- `Login` view has several validations:
  - Check if input in the email field is in a valid email format
  - Check if input in the password field is not empty
  - On the login button click check if the user exists
- If any validations in `Login` view fails user will see an appropriate error message, otherwise user will be redirected to the `/main` page
- `Register` view has several validations as well:
  - Check if input in the name field is not empy
  - Check if input in the email field is in a valid email format
  - Check if input in the password field is longer than 5 characters
  - On the register button click check if the user exists
- If any validations in `Register` view fails user will see an appropriate error message, otherwise user will be redirected to the `/main` page
- `Main` view allows users to see, search, sort and modify to-do items based on their status
  - For new users both `Active` and `Completed` lists of items are empty.
  - By typing item name in `Add Item` input and pressing add button next to it user can create a new to-do item, which will be added to the Active Items list
  - By selecting a checkbox in the item row user can toggle item status
  - By pressing a delete button in the item row user can delete an item
  - By typing in the `Search` field user can filter items
  - By selecting `Active` or `Completed` users can see a different list of items by the status
  - If there is more than 10 items in a list - a paginator will appear under the list
  - Users can sort items by name and date by clicking on the column headers
- When a user is not authorized, `Welcome, Stranger` message is shown in the header and `Logout` button is hidden
- After the authorization message in a header is changed to `Welcome, {username}` and `Logout` button is shown.  

## Live demo
Live demo is available  here - https://ivan-yuschenko.github.io/to-do-app-angular/

## Running development server locally
### Prerequisites:
- Node.js (I used the latestt LTS version v16.13.1)
- NPM (I used v8.3.0)

Download this project repo, navigate in terminal to the project folder and run `ng serve`  for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
