import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userRoles: any[] = [];

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    // this.loadUserRoles();
  }
  registerAdmin(){
    this.router.navigate(['/register-admin'])
  }

 
}