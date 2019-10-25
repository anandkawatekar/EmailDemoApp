import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MailMessage } from '../../models/mail-message.model';
import { UserAccount } from '../../models/user-account.model';
import { MailAttachment } from '../../models/mail-attachment.model';
import { MailResponse } from '../../models/mail-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  apiUrl = `${environment.MailApiUrl}/Mails`;

  refMailMessage:MailMessage= null;

  constructor(private http: HttpClient) { }

  GetInboxMails(eMailId: string) : Observable<MailMessage[]> {
    let params = new HttpParams();
    params = params.append("eMailId", eMailId);
    return this.http.get<MailMessage[]>(`${this.apiUrl}/Inbox`, { params });
  }

  GetSentMails(eMailId: string) : Observable<MailMessage[]> {
    let params = new HttpParams();
    params = params.append("eMailId", eMailId);
    return this.http.get<MailMessage[]>(`${this.apiUrl}/Sent`, { params });
  }

  GetDraftMails(eMailId: string) : Observable<MailMessage[]> {
    let params = new HttpParams();
    params = params.append("eMailId", eMailId);
    return this.http.get<MailMessage[]>(`${this.apiUrl}/Draft`, { params });
  }

  GetTrashMails(eMailId: string) : Observable<MailMessage[]> {
    let params = new HttpParams();
    params = params.append("eMailId", eMailId);
    return this.http.get<MailMessage[]>(`${this.apiUrl}/Trash`, { params });
  }

  GetMail(id: number) : Observable<MailMessage> {
    return this.http.get<MailMessage>(`${this.apiUrl}/${id}`);
  }

  SendMail(objMail: MailMessage) : Observable<MailResponse>{
    const body = JSON.stringify(objMail);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Agent' }),
      ResponseType: 'json'
    };
    return this.http.post<MailResponse>(this.apiUrl, body,httpOptions);
  }

  SaveDraft(id:number, objMail: MailMessage) : Observable<number>{
    const body = JSON.stringify(objMail);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Agent' }),
      ResponseType: 'json'
    };
    return this.http.post<number>(`${this.apiUrl}/${id}`, body,httpOptions);
  }

  DoTrash(id:number) : Observable<boolean>{
    return this.http.delete<boolean>(`${this.apiUrl}/DoTrash/${id}`);
  }

  DeleteMail(id:number) : Observable<boolean>{
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  MarkAsRead(id:number) : Observable<boolean>{
    return this.http.put<boolean>(`${this.apiUrl}/SetReadStatus/${id}`,'');
  }



}
