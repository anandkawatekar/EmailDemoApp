import { Component, OnInit } from '@angular/core';
import { Utils } from '../shared/utils';
import { MailMessage } from '../../models/mail-message.model';
import { MailService } from '../shared/mail.service';
import { LoginResponse } from 'src/app/models/login-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MailAttachment } from 'src/app/models/mail-attachment.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-read-mail',
  templateUrl: './read-mail.component.html',
  styleUrls: ['./read-mail.component.css']
})
export class ReadMailComponent implements OnInit {

  public id = 0;
  public mailMessage: MailMessage;
  constructor(
    private location: Location,private route: ActivatedRoute,private router: Router,
    private mailService: MailService,private utils: Utils,private toastr: ToastrService
    ) {
      //this.loadMail();
      }

  ngOnInit() {
    this.mailMessage = new MailMessage();
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.loadMail(this.id);

        if(this.location.path().indexOf('inbox') > -1){

        }

      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  loadMail(mailId:number): void {
    this.mailService.GetMail(mailId)
    .subscribe(
      data => {
            this.mailMessage = data;
            this.seReadStatus();
      },
      err => {
        this.toastr.error(err.message);
        this.location.back();
      }
    );
  }

  seReadStatus()
  {
    if(this.mailMessage.EmailStatus=="RECEIVED" && this.mailMessage.IsRead==0)
    {
      this.mailService.MarkAsRead(this.id).subscribe();
    }
  }

  forwardMail()
  {
     const composeMessage = new MailMessage();
     composeMessage.Subject = 'Fr:' + this.mailMessage.Subject;

      composeMessage.ToEmail = '';
      composeMessage.IsAttachmentPresent = this.mailMessage.IsAttachmentPresent;


      this.mailMessage.AttachmentsList.forEach( x=>{
       let  atch: MailAttachment = new MailAttachment();
        atch.MailId = -1;
        atch.AttachmentId = x.AttachmentId;
        atch.Attachment = x.Attachment;
        composeMessage.AttachmentsList.push(atch);
      });

      composeMessage.AttachmentsList = this.mailMessage.AttachmentsList;

       //format messaage prefix
       composeMessage.Message = `
-----Forwarded Message-----
From: ${this.mailMessage.FromEmail}
Date: ${this.mailMessage.MailDate}
To: ${this.mailMessage.ToEmail}
  ${this.mailMessage.Message}`;

     this.mailService.refMailMessage = composeMessage;
     this.router.navigate(['/compose']);

  }


  replyMail()
  {
     const composeMessage = new MailMessage();
     composeMessage.Subject = 'Re:' + this.mailMessage.Subject;
     if(this.mailMessage.EmailStatus=="RECEIVED")
        composeMessage.ToEmail = this.mailMessage.FromEmail;
     else
        composeMessage.ToEmail = this.mailMessage.ToEmail;

       //format messaage prefix
     composeMessage.Message = `

---On ${this.mailMessage.MailDate}, ${this.mailMessage.FromEmail} Wrote:
  ${this.mailMessage.Message}`;

     this.mailService.refMailMessage = composeMessage;
     this.router.navigate(['/compose']);

  }


  onDownloadAttachment(attachmentId:number)
  {
    var filePath = environment.MailApiUrl+'/FileUpload/'+attachmentId;
    window.open(filePath);

  }

  onBack()
  {
    this.location.back();
  }

}
