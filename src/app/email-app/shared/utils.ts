import { Injectable } from '@angular/core';
import { MailMessage } from 'src/app/models/mail-message.model';
import { DomSanitizer } from "@angular/platform-browser";
import { Sanitizer, SecurityContext } from '@angular/core';

@Injectable({providedIn: 'root',})
export class Utils {

  constructor( private sanitizer: Sanitizer) {
  }

  public trimEmailFrom(senderName) {
    if(senderName.length>30)
      return "From: " + senderName.substr(0, 30) + "...";
    else if(senderName.length==0)
      return "[No Email Id]";
    else
      return senderName;
  }

  public trimEmailTo(receiverName) {
    if(receiverName.length>30)
      return "To: " + receiverName.substr(0, 30) + "...";
    else if(receiverName.length==0)
      return "[No Mail Id]";
    else
    return "To: " + receiverName;
  }

  public trimEmailSubject(subject) {
    if(subject.length>72)
      return subject.substr(0, 72) + "...";
    else if(subject.length==0)
      return "[No Subject]";
    else
    return subject;
  }

  public getFullName(firstName, lastName) {
      return firstName+" "+lastName;
  }

  transformToHTML(value:string): any
  {
     return value.replace(new RegExp('\n', 'g'), "<br />")
  }

  prepareForwardMail(mailMessage:MailMessage)
  {
     const fwdMailMessage = new MailMessage();
     fwdMailMessage.Subject = 'Fr:' + mailMessage.Subject;
     fwdMailMessage.Message = mailMessage.Message;

  }
}
