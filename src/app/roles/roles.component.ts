import {Component, OnInit} from '@angular/core';
import {RolesService} from './roles.service';
import {Observable} from 'rxjs';
import {Role} from './role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles$: Observable<Role[]>;

  constructor(
    private readonly rolesService: RolesService
  ) { }

  ngOnInit() {
    this.roles$ = this.rolesService.getRoles();
  }

  updateRole(role: Role): void {
    this.rolesService.updateRole(role);
  }
}
