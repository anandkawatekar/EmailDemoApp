import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Utils } from '../shared/utils';
import { MailMessage } from '../../models/mail-message.model';
import { MailService } from '../shared/mail.service';
import { MailResponse } from 'src/app/models/mail-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { LoginResponse } from 'src/app/models/login-response.model';
import { FileUploadService } from 'src/app/file-upload/shared/file-upload.service';
import { MailAttachment } from 'src/app/models/mail-attachment.model';
import { UserAccount } from 'src/app/models/user-account.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  mailMessageForm:FormGroup;
  submitted = false;
  @ViewChild('ToEmail') myToMail: ElementRef;
  @ViewChild('Message') myMessage: ElementRef;
  issaved = false;
  public mailMsg:MailMessage;
  public mailResp: MailResponse;

  constructor(
      private frmBuilder: FormBuilder,private location: Location,private route: ActivatedRoute,
      private router: Router,private mailService: MailService,private fileuploadService: FileUploadService,
      private utils: Utils,private toastr: ToastrService) {
  }

  ngOnInit() {
    this.mailMsg = new MailMessage();

    if(this.location.path().indexOf('compose') > 0){

      if(this.mailService.refMailMessage)
      {
        this.mailMsg = this.mailService.refMailMessage;
        this.mailService.refMailMessage= null;
      }
    }
    else if(this.location.path().indexOf('draft') > 0)
    {
      this.route.params.subscribe(
        (params: Params) => {
          const id = +params['id'];
          if(id>0)
          {
            this.loadMail(id);
          }
        }
      );
    }

    this.buildFormControlsFromModel();
    this.setValidation();
  }

buildFormControlsFromModel()
{
  this.mailMessageForm = this.frmBuilder.group(this.mailMsg);
  //this.mailMessageForm.setControl("FromUser",this.frmBuilder.group(this.mailMsg.FromUser));
  this.mailMessageForm.setControl("ToUsersList",this.frmBuilder.array([]));
  this.mailMessageForm.setControl("AttachmentsList",this.frmBuilder.array([]));

  this.mailMsg.ToUsersList.forEach( x=>{
    this.patchToUserList(x)
  });

  this.mailMsg.AttachmentsList.forEach( x=>{
    this.patchAttachment(x)
  });

}

patchAttachment(obj:MailAttachment)
{
  let ctrl = this.mailMessageForm.get('AttachmentsList') as FormArray;
  ctrl.push(this.frmBuilder.group(obj));
}

patchToUserList(obj:UserAccount)
{

  const ctrl = this.mailMessageForm.controls.ToUsersList as FormArray;
  ctrl.push(this.frmBuilder.group(obj));
}

detachAttachment(index)
{
  const ctrl = <FormArray>this.mailMessageForm.get('AttachmentsList');
  ctrl.removeAt(index);
}

detaToUserList(index)
{
  const ctrl = <FormArray>this.mailMessageForm.get('ToUsersList');
  ctrl.removeAt(index);
}


get f() { return this.mailMessageForm.controls; }

setValidation()
{
  //this.f.ToEmail.setValidators([Validators.required,Validators.pattern("[^ @]*@[^ @]*")]);
}

clearControls(){
  const requestData: MailMessage = Object.assign({}, this.mailMessageForm.value);
  if(requestData.MailId>0)
  {
     this.mailService.DoTrash(requestData.MailId)
    .subscribe(
        data => {
           this.toastr.success('Mail moved to trash folder.');
        }
    );
  }

  this.mailMessageForm.reset(new MailMessage());
  this.buildFormControlsFromModel();
  this.setValidation();
  this.location.back();
  //this.router.navigate(['/inbox']);
}

onBack()
{
  this.location.back();
}

onSubmit()
{
  this.submitted = true;
  // stop here if form is invalid
  if (this.mailMessageForm.invalid) {
      return;
  }
  const requestData: MailMessage = Object.assign({}, this.mailMessageForm.value);
  //result.AttachmentsList = Object.assign({}, result.AttachmentLis);

  this.setFromEmailId(requestData);

  this.mailService.SendMail(requestData)
      .subscribe(
        data => {
              this.mailResp =data;
              this.clearControls();
              this.toastr.success('Mail sent successfully.');
        }
      );

}

onToMailChange() {
  let oldValue = this.f.ToEmail.value;
  setTimeout(() => {
      if (oldValue == this.f.ToEmail.value) {
          if (this.f.ToEmail.value) {  //check blank value
             this.saveDraft();
          }
      }
  }, 3000);
}

onSubjectChange() {
  let oldValue = this.f.Subject.value;
  setTimeout(() => {
      if (oldValue == this.f.Subject.value) {
             this.saveDraft();
      }
  }, 3000);
}

onMessageChange() {
  let oldValue = this.f.Message.value;
  setTimeout(() => {
      if (oldValue == this.f.Message.value) {
             this.saveDraft();
      }
  }, 3000);
}

saveDraft()
{
  const requestData: MailMessage = Object.assign({}, this.mailMessageForm.value);
  this.setFromEmailId(requestData);
  this.mailService.SaveDraft(requestData.MailId,requestData)
      .subscribe(
        data => {
              this.mailMsg = data;
              this.buildFormControlsFromModel();
              this.setValidation();
              //this.f.MailId.setValue(data);
        }
      );

}


loadMail(mailId:number): void {
  this.mailService.GetMail(mailId)
  .subscribe(
    data => {
      this.mailMsg = data;
      this.buildFormControlsFromModel();
      this.setValidation();
      this.myToMail.nativeElement.focus();

    },
    err => {
      this.toastr.error(err.message);
      this.location.back();
    }
  );
}

  setFromEmailId(reqMail:MailMessage)
  {
    const currentUser = <LoginResponse>JSON.parse(localStorage.getItem('currentUser'));
    reqMail.FromEmail = currentUser.EmailId;
  }

  uploadFile()
  {
    if(this.f.MailId.value==0)
    {
      this.saveDraft();
    }
    this.fileuploadService.uploadKey = this.f.MailId.value;
    this.fileuploadService.show();
  }

  onFileUploadComplete(attachment:MailAttachment): void {
    attachment.MailId =  this.f.MailId.value;

    this.mailMsg.AttachmentsList.push(attachment);
    this.patchAttachment(attachment);
  }

  onRemoveAttachment(id:number,idx:number)
  {
    this.fileuploadService.deleteFile(id)
  .subscribe(
    data => {
      this.detachAttachment(idx);
      this.toastr.success('Attachment removed.');
    }
  );
  }

}
