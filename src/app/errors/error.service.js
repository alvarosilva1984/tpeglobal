import {EventEmitter} from "@angular/core";
import {Error} from "./error.model";

export class ErrorService {
  constructor() {
    this.errorOccurred = new EventEmitter(true);
  }

  handleError(error) {
    const errorData = new Error(error.title, error.error.message);
    this.errorOccurred.emit(errorData);
  }
}
