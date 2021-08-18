import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Role} from './role';
import {concatMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private roles: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>(null);

  private readonly ROLES_URL = 'https://custom.rotacloud.com/angular-challenge/roles.json';

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getRoles(): Observable<Role[]> {
    return this.roles.asObservable()
      .pipe(concatMap(this.loadDataFromHttpIfNotExisting()));
  }

  private loadDataFromHttpIfNotExisting() {
    return (roles: Role[]) => {
      if (roles != null) {
        return of(roles);
      }

      return this.httpClient.get<Role[]>(this.ROLES_URL)
        .pipe(tap(fetchedRoles => this.roles.next(fetchedRoles)));
    };
  }

  public updateRole(updatedRole: Role): void {
      const roles = this.roles.value.slice();
      const indexOfRoleToUpdate = roles.findIndex(role => role.id === updatedRole.id);

      roles[indexOfRoleToUpdate] = updatedRole;

      this.roles.next(roles);
  }
}
