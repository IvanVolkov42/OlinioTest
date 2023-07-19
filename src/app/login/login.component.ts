import {Component, OnDestroy, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../shared/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  errorMessage: string | undefined;
  constructor(
    private authSrv: AuthService,
  ) {
  }
  ngOnInit() {
    this.subscription = this.authSrv.errorSub.subscribe(
      (error) => {
        this.errorMessage = error;
      }
    )
  }

  onSubmit(form: NgForm) {
    this.authSrv.login(form.value.userName, form.value.password);
  }

  ngOnDestroy() {
    if( this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
