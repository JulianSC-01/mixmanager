import { FormGroup } from '@angular/forms';

export class FormUtility {
  static getHeaderErrorMessage(form : FormGroup) : string {
    let count : number = 0;
    
    for (const field in form.controls) {
      if (form.get(field).invalid)
        count++;
    }
    
    if (count == 1)
      return "Please correct the error on this page.";
    if (count > 1)
      return "Please correct the " + count + " errors on this page.";
    
    return null;
  }
}