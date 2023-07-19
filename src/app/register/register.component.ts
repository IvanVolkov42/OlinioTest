import {Component, OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string = '';
  options: Array<any> = []
  private _jsonURL = 'assets/dropdown_Test.json';
  constructor(
    private authSrv: AuthService,
    private router: Router,
  ) {
  }
  ngOnInit() {
    let jsonPromise = fetch(this._jsonURL).then(res => res.json());
    jsonPromise.then(json => {
        this.options = json;
      }).catch((error)=>{
        console.log(error)
    })
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const firstName = form.value.firstName;
      const lastName = form.value.lastName;
      const userName = form.value.userName;
      const email = form.value.email;
      const password = form.value.password;
      const phone = form.value.phone;
      const country = form.value.country;
      this.authSrv.signUp(firstName, lastName, userName ,email , password, phone, country);
      alert("User successfully added")
      this.router.navigate(['/grid']);
    } else {
      const controls = form.controls;
      const invalid = [];
      for (let name in controls) {
        if (controls[name].invalid) {
          invalid.push(name)
        }
      }
      this.error = 'You need to fill: ' + invalid.join(', ')
    }
  }

}
