export class Email {
  public MailId: number;
  public FromEmail: string;
  public ToEmail: string;
  public Subject: string;
  public Message: string;
  public EmailStatus: string;
  public InboxStatus: string;
  public CreatedDate: string;


  constructor(fromEmail: string ,toEmail: string, subject: string, message: string, emailStatus: string, inboxStatus: string, createdDate: string) {
      this.FromEmail = fromEmail;
      this.ToEmail = toEmail;
      this.Subject = subject;
      this.Message = message;
      this.EmailStatus = emailStatus;
      this.InboxStatus = inboxStatus;
      this.CreatedDate = createdDate;
  }
}
