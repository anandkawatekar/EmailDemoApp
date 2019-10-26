import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { isUndefined } from 'util';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

  constructor(private toastr: ToastrService) { }

  handleError(err: any): void {

      if (err instanceof HttpErrorResponse) {
        if(err.status===0)
          this.toastr.error('Server Error: Service not available.');
        else if(err.status===401)
          this.toastr.error('Invalid User, Try with valid Email Id and Password.');
        else
          this.toastr.error('Error: ' + err.status + ': ' + err.message);
      }
      else if(err instanceof Error)
      {
        console.log('An error occurred: ' + err.message + err.stack);
      }


    }
}
