import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit, OnDestroy {
  users: Array<User> = [];
  subscription: Subscription | undefined;
  options: Array<any> = []
  private _jsonURL = 'assets/dropdown_Test.json';
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit() {
    let jsonPromise = fetch(this._jsonURL).then(res => res.json());
    jsonPromise.then(json => {
      this.options = json;
    }).catch((error)=>{
      console.log(error)
    })
    this.subscription = this.authSrv.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    )
    this.users = this.authSrv.getUsers();
  }
  onEditClicked(user:number) {
    this.router.navigate([user],{ relativeTo: this.route})
  }
  onDeleteClicked(user: number) {
    this.authSrv.deleteUser(user);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
