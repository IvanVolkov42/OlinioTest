import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../shared/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  subscription: Subscription;
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
}
