import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/utils';
import { MailMessage } from '../../models/mail-message.model';
import { MailService } from '../shared/mail.service';
import { LoginResponse } from 'src/app/models/login-response.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public messagesList: MailMessage[]=[];
  constructor(private mailService: MailService,private router: Router,private utils: Utils,private toastr: ToastrService) { }

  ngOnInit() {
      this.loadInboxMails();
    }

    loadInboxMails(): void {
      const currentUser = <LoginResponse>JSON.parse(localStorage.getItem('currentUser'));

      this.mailService.GetInboxMails(currentUser.EmailId)
      .subscribe(
        data => {
              this.messagesList =data;
        }
      );
    }

    onRead(email: MailMessage){
      this.router.navigate(['/inbox/'+email.MailId]);
    }

    onTrash(id: number) {
          if (confirm('Are you sure to delete this record ?') === true) {
            this.mailService.DoTrash(id)
                  .subscribe(
                      data => {
                        this.loadInboxMails();
                        this.toastr.success('Mail moved to trash folder successfully.');
                      }
                  );
          }
        }

}
