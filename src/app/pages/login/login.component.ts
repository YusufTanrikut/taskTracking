import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginRequest } from "src/app/models/login-request.model";
import { UserModel } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    loginRequest: LoginRequest = {
        name: ''
    };

    isError = false;

    errorText = '';

    constructor(
        private router: Router,
        private userService: UserService
    ) {}
    
    ngOnInit(): void {}

    login(): void {
        const user: UserModel = {
            id: 0,
            surname: "",
            name: this.loginRequest.name,
            title: ""
        };

        this.userService.loginUser(user);

        this.router.navigate(['tabs']);
    }
}