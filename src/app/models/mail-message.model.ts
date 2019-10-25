import { UserAccount } from '../models/user-account.model';
import { MailAttachment } from '../models/mail-attachment.model';

export class MailMessage {
  MailId:number = 0
  MailDate: string = ''
  FromEmail: string = ''
  ToEmail: string = ''
  Subject: string = ''
  Message: string = ''
  IsAttachmentPresent: boolean = false
  EmailStatus: string = ''
  MailFolder: string = ''
  IsRead: number = 0

  FromUser: UserAccount = new UserAccount();
  ToUsersList: UserAccount[] = [];
  AttachmentsList: MailAttachment[] =[];
}
