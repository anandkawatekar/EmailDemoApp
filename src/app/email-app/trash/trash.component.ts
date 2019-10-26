import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/utils';
import { MailMessage } from '../../models/mail-message.model';
import { MailService } from '../shared/mail.service';
import { LoginResponse } from 'src/app/models/login-response.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  public messagesList: MailMessage[] = [];
  constructor(private mailService: MailService,private router: Router,private utils: Utils,private toastr: ToastrService) { }

  ngOnInit() {
      this.loadTrashMails();
    }

    loadTrashMails(): void {
      const currentUser = <LoginResponse>JSON.parse(localStorage.getItem('currentUser'));

      this.mailService.GetTrashMails(currentUser.EmailId)
      .subscribe(
        data => {
              this.messagesList =data;
        }
      );
    }

    onDelete(id: number) {
          if (confirm('Are you sure to delete this record ?') === true) {
            this.mailService.DeleteMail(id)
                  .subscribe(
                      data => {
                          this.loadTrashMails();
                         this.toastr.success('Mail deleted successfully.');
                      }
                  );
          }
        }

      onRead(email: MailMessage){
        this.router.navigate(['/trash/'+email.MailId]);
      }

}
