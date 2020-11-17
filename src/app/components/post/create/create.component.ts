import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  authenticationFailure(isGoToMain: boolean): void {
    alert('권한이 없습니다.');
    if (isGoToMain) {
      this.router.navigateByUrl('/main');
    }
  }

  ngOnInit(): void {
    if (!this.authService.chkTokenExists()) {
      this.authenticationFailure(true);
      return;
    }

    this.authService.authentication()
        .subscribe(r => {
          if (!r.success) {
            this.authenticationFailure(true);
          }
        });
  }

}
