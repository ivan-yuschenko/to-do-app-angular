import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUserList } from './../interfaces/IUserList.interface';
import { IUserState } from './../interfaces/IUserState.interface';
import { IToDoItem} from './../interfaces/IToDoItem.interface';

let localData = JSON.parse(localStorage.getItem('toDoData') || '[]');
let token = localStorage.getItem('toDoToken') || '';

@Injectable()

export class FakeBackend {

    isUserRegistered(token: string): boolean {
        if (localData.find((x: IUserList) => x.token === token)) {
            return true;
        } else {
            return false;
        }
    }

    getToken(): string {
        return token;
    }

    setToken(token: string) {
        localStorage.setItem('toDoToken', token);
    }

    findUser(token: string): IUserList {
        return localData.find((x: IUserList) => x.token === token);
    }

    getUser(token: string): Observable<IUserList> {
        return of (this.findUser(token));
    }

    login(email: string, password: string): Observable<IUserState> {
        const user = localData.find((x: IUserList) => x.email === email && x.password === password);
        return of(
            {name: user?.name, token: user?.token}
        );
    }

    loginWithToken(token: string): Observable<IUserState> {
        const user = localData.find((x: IUserList) => x.token === token);
        return of(
            {name: user?.name, token: user?.token}
        );
    }

    register(name: string, email: string, password: string, token: string): Observable<IUserState> {
        let userObject = {
            name:  name,
            email: email,
            password: password,
            token: token,
            todoList: []
        }
        localData.push(userObject);
        localStorage.setItem('toDoData', JSON.stringify(localData));
        return of(
            {name: userObject?.name, token: userObject?.token}
        );
    }

    createTodo(token: string, item: IToDoItem): Observable<IToDoItem> {
        let user = this.findUser(token);
        user.todoList.push(item);
        localStorage.setItem('toDoData', JSON.stringify(localData));
        return of (item);
    }

    deleteTodo(token: string, item: IToDoItem): Observable<IToDoItem> {
        let user = this.findUser(token);
        user.todoList.splice(user.todoList.findIndex((x) => {
            return x.id === item.id;
        }), 1);
        localStorage.setItem('toDoData', JSON.stringify(localData));
        return of (item);
    }

    toggleTodo(token: string, item: IToDoItem): Observable<IToDoItem> {
        let user = this.findUser(token);
        const objIndex = user.todoList.findIndex((obj => obj.id === item.id));
        let objTemp = Object.assign({}, user.todoList[objIndex]);
        objTemp.completed = !item.completed;
        user.todoList[objIndex] = objTemp;
        localStorage.setItem('toDoData', JSON.stringify(localData));
        return of (objTemp);
    }
}