import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { userRequest } from "src/app/models/user-request.model";
import { UserModel } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: 'user',
    templateUrl: './user.component.html'
})

export class userComponent implements OnInit {
    userRequest: userRequest = {
        name: '',
        surname: '',
        title: '',
    };

    isError = false;

    errorText = '';

    constructor(
        private router: Router,
        private userService: UserService
    ) {}
    
    ngOnInit(): void {}

    create(): void {
        const user: UserModel = {
            id: 0,
            surname: "",
            name: this.userRequest.name,
            title: ""
        };

        this.userService.addUser(user);

        this.router.navigate(['tabs']);
    }
}