import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';
import {Observable} from 'rxjs';
import {User} from './user';
import {Role} from '../roles/role';
import {RolesService} from '../roles/roles.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService
  ) { }

  ngOnInit() {
    this.users$ = this.usersService.getUsers()
      .pipe(map(this.sortByName()));
  }

  updateUser(user: User) {
    this.usersService.updateUser(user);
  }

  getRoles(user: User): Observable<Role[]> {
    return this.rolesService.getRolesForUser(user)
      .pipe(map(roles => this.sortRoleNames(roles)));
  }

  private sortRoleNames(roles: Role[]) {
    return roles.sort((roleA, roleB) => roleA.name.localeCompare(roleB.name));
  }

  private sortByName() {
    return users => users.sort((userA, userB) => userA.name.localeCompare(userB.name));
  }
}
