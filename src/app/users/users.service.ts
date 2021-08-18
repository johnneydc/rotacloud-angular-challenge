import {Injectable} from '@angular/core';
import {Role} from '../roles/role';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from './user';
import {concatMap, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly USERS_URL = 'https://custom.rotacloud.com/angular-challenge/users.json';
  private users = new BehaviorSubject<User[]>(null);

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getUsers(): Observable<User[]> {
    return this.users.asObservable()
      .pipe(concatMap(this.loadFromHttpIfNotExisting()));
  }

  public getUsersWithRole(role: Role): Observable<User[]> {
    return this.getUsers()
      .pipe(map(users => {
        return users.filter(user => {
          if (user.roles != null) {
            return user.roles.includes(role.id);
          } else {
            return false;
          }
        });
      }));
  }

  private loadFromHttpIfNotExisting() {
    return (users: User[]) => {
      if (users != null) {
        return of(users);
      }

      return this.httpClient.get<User[]>(this.USERS_URL)
        .pipe(tap(fetchedUsers => this.users.next(fetchedUsers)));
    };
  }

  updateUser(updatedUser: User): void {
    const updatedUsers = this.users.value.slice();
    const indexOfRoleToUpdate = updatedUsers.findIndex(user => user.id === updatedUser.id);

    updatedUsers[indexOfRoleToUpdate] = updatedUser;

    this.users.next(updatedUsers);
  }
}
