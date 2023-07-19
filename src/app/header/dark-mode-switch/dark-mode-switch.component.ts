import {Component} from "@angular/core";
import {Observable, async} from "rxjs";
import {DarkModeService} from "angular-dark-mode";

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: 'dark-mode-switch.component.html',
  styleUrls: ['dark-mode-switch.component.css']
})
export class DarkModeToggle {
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  constructor(private darkModeService: DarkModeService) {}

  onToggle(): void {
    this.darkModeService.toggle();
  }
}
