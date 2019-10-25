import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/utils';
import { MailMessage } from '../../models/mail-message.model';
import { MailService } from '../shared/mail.service';
import { LoginResponse } from 'src/app/models/login-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  public messagesList: MailMessage[];
  constructor(private mailService: MailService,private router: Router,private utils: Utils) { }

  ngOnInit() {
      this.loadTrashMails();
    }

    loadTrashMails(): void {
      const currentUser = <LoginResponse>JSON.parse(localStorage.getItem('currentUser'));

      this.mailService.GetTrashMails(currentUser.EmailId)
      .subscribe(
        data => {
              this.messagesList =data;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            //A client-side or network error occurred.
            alert('An error occurred: ' + err.error.message);
          }
          else {
              alert(err.status+'Server error occured, try again after some time.');
            }
        }
      );
    }

    onDelete(id: number) {
          if (confirm('Are you sure to delete this record ?') === true) {
            this.mailService.DeleteMail(id)
                  .subscribe(
                      data => {
                          this.loadTrashMails();
                          alert("Mail deleted successfully.");
                      },
                      (err: HttpErrorResponse) => {
                            if (err.error instanceof Error) {
                            //A client-side or network error occurred.
                            alert('An error occurred: ' + err.error.message);
                            }
                            else {
                                alert(err.status+'Server error occured, try again after some time.');
                            }
                      }
                  );
          }
        }

      onRead(email: MailMessage){
        this.router.navigate(['/trash/'+email.MailId]);
      }

}
