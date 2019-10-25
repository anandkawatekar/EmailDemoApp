import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FileUploadService } from '../shared/file-upload.service';
import { FileToUpload } from '../shared/file-to-upload.model';
import { MailAttachment } from 'src/app/models/mail-attachment.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  show = false;

  @Output()
  onFileUploadSuccess: EventEmitter<any> = new EventEmitter();

  fileToUpload: any = null;
  messages: string = '';
  MAX_SIZE: number = 1048576;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
    this.uploadService.loaderState
    .subscribe(state => {
        this.show = state;
    });
  }

  onFileChange(event) {
    this.fileToUpload = null;
    if (event.target.files) {
        this.fileToUpload = event.target.files[0];
      }
  }

  uploadFile(): void {
    if(this.fileToUpload==null)
    {
      alert("Please select file to upload");
    }
    this.readAndUploadFile();
  }

  cancleUpload()
  {
    this.show=false;
  }

  private readAndUploadFile() {
    let file = new FileToUpload();

    file.FileName = this.fileToUpload.name;
    file.FileSize = this.fileToUpload.size;
    file.FileType = this.fileToUpload.type;

    let reader = new FileReader();

    reader.onload = () => {
      file.FileAsBase64 = reader.result.toString();

      // POST to server
      this.uploadService.uploadFile(file)
        .subscribe(resp =>
          {
            const mailAttach = new MailAttachment();
            mailAttach.AttachmentId = resp;
            mailAttach.Attachment = file.FileName;
            mailAttach.MailId =this.uploadService.uploadKey;
            this.messages = "Upload complete";
            this.show=false;
            this.onFileUploadSuccess.emit(mailAttach);
           },
           err =>
           {
            alert("Failed to upload file., try again");
           }
          );
    }

    // Read the file
    reader.readAsDataURL(this.fileToUpload);
  }

}
