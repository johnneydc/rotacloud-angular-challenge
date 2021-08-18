import {Component, OnInit} from '@angular/core';
import {RolesService} from './roles.service';
import {Observable} from 'rxjs';
import {Role} from './role';
import {map} from 'rxjs/operators';
import {UsersService} from '../users/users.service';

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
    this.roles$ = this.rolesService.getRoles();
  }

  updateRole(role: Role): void {
    this.rolesService.updateRole(role);
  }

  getUserNames(role: Role): Observable<string[]> {
    return this.usersService.getUsersWithRole(role)
      .pipe(map(users => {
        return users.map(user => user.name)
          .sort((userNameA, userNameB) => userNameA.localeCompare(userNameB));
      }));
  }
}
