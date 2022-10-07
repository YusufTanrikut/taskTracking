import { NgModule } from "@angular/core";
import { UserModel } from "../models/user.model";
import { restApiService } from "./restApiService";

@NgModule({})

export class UserService {
    constructor(private _restApiService: restApiService) {}

    public getUsers(): UserModel[] {
        let result: UserModel[] = [];

        this._restApiService.getUsers()
            .subscribe(data => {
                if(data.success == true){
                    for (const d of (data.data as any)) {
                        result.push({
                            id: d.id,
                            name: d.name,
                            surname: d.surname,
                            title: d.title,
                        });
                    }
                }
            });

        return result;
    }

    public setUsers(users: UserModel[]): void {
        localStorage.setItem('users', JSON.stringify(users));
    }

    public setUser(user: UserModel): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    public addUser(user: UserModel): void {
        const users = this.getUsers();
        
        user.id = users.length + 1;
        users.push(user);

        this.setUsers(users);
    }

    public loginUser(user: UserModel): void {
        this.addUser(user);
        this.setUser(user);
    }

    public getActiveUser(): UserModel {
        const user = localStorage.getItem('user');
        if (user != null)
            return JSON.parse(user);

        return {} as UserModel;
    }
}