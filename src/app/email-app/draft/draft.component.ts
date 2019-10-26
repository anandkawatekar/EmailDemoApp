import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/utils';
import { MailMessage } from '../../models/mail-message.model';
import { MailService } from '../shared/mail.service';
import { LoginResponse } from 'src/app/models/login-response.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css'],
})
export class DraftComponent implements OnInit {

  public messagesList: MailMessage[] =[];
  constructor(private mailService: MailService,private router: Router,private utils: Utils,private toastr: ToastrService) { }

  ngOnInit() {
      this.loadDraftMails();
    }

    loadDraftMails(): void {
      const currentUser = <LoginResponse>JSON.parse(localStorage.getItem('currentUser'));

      this.mailService.GetDraftMails(currentUser.EmailId)
      .subscribe(
        data => {
              this.messagesList =data;
        }
      );
    }

    onTrash(id: number) {
          if (confirm('Are you sure to delete this record ?') === true) {
            this.mailService.DoTrash(id)
                  .subscribe(
                      data => {
                        this.loadDraftMails();
                        this.toastr.success('Mail moved to trash folder successfully');
                      }
                  );
          }
        }

      onRead(email: MailMessage){
        this.router.navigate(['/draft/'+email.MailId]);
      }

}
