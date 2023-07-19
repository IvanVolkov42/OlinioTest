import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersChanged = new Subject<User[]>();
  errorSub = new Subject<string>();
  deletedUserId = new Subject<number>();
  errorMessage = 'Please put correct login and password';
  users: User[] = [
    {
      firstName: 'John',
      lastName: 'Black',
      userName: 'JohnB',
      email: 'test@mail.ru',
      password: 'Test2222222@',
      phone: 1234556,
      country: 'AZ'
    },
    {
      firstName: 'Alex',
      lastName: 'White',
      userName: 'ALexW',
      email: 'new@mail.ru',
      password: 'Bassdsdwew@@1',
      phone: 88005553535,
      country: 'RU'
    },
    {
      firstName: 'Jack',
      lastName: 'Green',
      userName: 'GreenJack',
      email: 'jackB@gmail.com',
      password: '222S@21312sadR',
      phone: 77777222,
      country: 'BE'
    },
  ];
  user: User | undefined;
  constructor(
    private router: Router,
  ) {
  }
  signUp(firstName: string,
         lastName: string,
         userName: string,
         email: string,
         password: string,
         phone?: number,
         country?: string,) {
    const user = new User(firstName,lastName,userName,email,password,phone,country);
    this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }

  login(userName: string, password: string) {
    const loggedUserId = this.users.find(user => user.userName === userName && user.password === password
    );
    if (!!loggedUserId) {
      this.router.navigate(['grid']);
    } else {
      this.errorSub.next(this.errorMessage);
    }
  }

  getUsers() {
    return this.users.slice();
  }

  getUser(userId: number | undefined) {
    if (userId) {
      return this.users[userId];
    } else {
      return null;
    }
  }

  updateUser(userId: number | undefined, user: User) {
    if (userId && user) {
      this.users[userId] = user;
      this.usersChanged.next(this.users.slice());
    }
  }
  deleteUser(userId: number, ) {
    this.users.splice(userId, 1);
    this.usersChanged.next(this.users.slice());
    this.deletedUserId.next(userId);
  }
}
