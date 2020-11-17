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

  tags: string;
  path: string;
  summary: string;
  thumbnail: string;

  createPost(): void {
    console.log(this.summary.replace(/(?:\r\n|\r|\n)/g, '<br>'));
  }

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
        .subscribe(
            res => {
              if (!res.success) {
                this.authenticationFailure(true);
              }
            },
            error => {
              if (error) {
                this.authenticationFailure(true);
              }
            }
        );
  }

}
