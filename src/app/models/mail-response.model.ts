export class MailResponse {
  ResultSattus:boolean;
  Mails:MailStatus[];
}

export class MailStatus {
  EmailId:string;
  MailId:number;
  IsSentSuccessful:boolean;
}
