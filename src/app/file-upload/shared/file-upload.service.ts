import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { FileToUpload } from './file-to-upload.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private loaderSubject = new Subject<boolean>();
  loaderState = this.loaderSubject.asObservable();
  uploadKey = 0;

  apiUrl = `${environment.MailApiUrl}/FileUpload`;
  constructor(private http: HttpClient) { }

  uploadFile(file: FileToUpload) : Observable<number> {
    file.FolderName = this.uploadKey.toString();
  const body = JSON.stringify(file);
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Agent' }),
    ResponseType: 'json'
  };
  return this.http.post<number>(this.apiUrl, body,httpOptions);
}

deleteFile(id: number) : Observable<any> {
return this.http.delete<any>(`${this.apiUrl}/${id}`);;
}




show() {
  this.loaderSubject.next(true);
}
hide() {
  this.loaderSubject.next(false);
}

}
