import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersServicesService } from '../../services/users-services.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit{

  private userServices = inject( UsersServicesService );
  public userId = signal(1);

  public currentUser = signal<User|undefined>(undefined);
  public userWasFound = signal(true);
  public fullName = computed( () => {
    if ( !this.currentUser) return 'User not found';
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  } );

  ngOnInit(): void {
    this.loadUser( this.userId() );
  }

  loadUser( id: number ) {
    if ( id <= 0 ) return;
    this.userId.set(id);

    this.currentUser.set(undefined);

    this.userServices.getUserById( id )
    .subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      error: () => {
        this.userWasFound.set(false);
        this.currentUser.set(undefined);
      }
    });
  }

}
