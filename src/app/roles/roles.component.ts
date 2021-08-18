import {Component, OnInit} from '@angular/core';
import {RolesService} from './roles.service';
import {Observable} from 'rxjs';
import {Role} from './role';
import {map} from 'rxjs/operators';
import {UsersService} from '../users/users.service';
import {User} from '../users/user';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles$: Observable<Role[]>;

  constructor(
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService
  ) { }

  ngOnInit() {
    this.roles$ = this.rolesService.getRoles()
      .pipe(map(roles => this.sortByName(roles)));
  }

  updateRole(role: Role): void {
    this.rolesService.updateRole(role);
  }

  getUserNames(role: Role): Observable<string[]> {
    return this.usersService.getUsersWithRole(role)
      .pipe(map(users => this.sortUserNames(users)));
  }

  private sortByName(roles: Role[]) {
    return roles.sort((roleA, roleB) => roleA.name.localeCompare(roleB.name));
  }

  private sortUserNames(users: User[]) {
    return users.map(user => user.name)
      .sort((userNameA, userNameB) => userNameA.localeCompare(userNameB));
  }
}
