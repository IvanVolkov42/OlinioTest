import {Component, DoCheck, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {User} from "../../shared/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-grid-user-edit',
  templateUrl: './grid-user-edit.component.html'
})
export class GridUserEditComponent implements OnInit, OnDestroy, DoCheck {
  users: Array<User> = [];
  options: Array<any> = []
  id: number | undefined;
  editMode = false;
  userForm: FormGroup | undefined;
  subscription: Subscription | undefined;
  private _jsonURL = 'assets/dropdown_Test.json';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authSrv: AuthService
  ) {
  }
  ngOnInit() {
    let jsonPromise = fetch(this._jsonURL).then(res => res.json());
    jsonPromise.then(json => {
      this.options = json;
    }).catch((error)=>{
      console.log(error)
    })
    this.route.params.subscribe(
      (params) => {
        this.id = params['name'];
        this.editMode = params['name'] !=null;
        this.initForm();
      }
    );
  }

  ngDoCheck() {
    this.authSrv.deletedUserId.subscribe((id) => {
      if( this.id == id) {
        this.router.navigate(['grid'])
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private initForm() {
    let userName = '';
    let firstName = '';
    let lastName = '';
    let email = '';
    let password = '';
    let phone = null;
    let country: string | undefined = ''
    if (this.editMode) {
      const user = this.authSrv.getUser(this.id);
      if (user) {
        userName = user.userName;
        firstName = user.firstName;
        lastName = user.lastName;
        email = user.email;
        password = user.password;
        phone = user.phone;
        country = user.country;
      }
    }
    this.userForm = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName, Validators.required),
      'userName': new FormControl(userName, Validators.required),
      'email': new FormControl(email, Validators.required),
      'password': new FormControl(password, Validators.required),
      'phone': new FormControl(phone),
      'country': new FormControl(country),
    });
  }
  onSubmit() {
    if (this.userForm) {
      const user = new User (
        this.userForm.get('firstName')?.value,
        this.userForm.get('lastName')?.value,
        this.userForm.get('userName')?.value,
        this.userForm.get('email')?.value,
        this.userForm.get('password')?.value,
        this.userForm.get('phone')?.value,
        this.userForm.get('country')?.value
      )
      this.authSrv.updateUser(this.id, user );
    }
  }
}
