import { FormControl, FormGroup } from '@angular/forms';

export class AppFormHelper {
  private static instance : AppFormHelper;

  private constructor() {}

  static getInstance() : AppFormHelper {
    if (!AppFormHelper.instance) {
      AppFormHelper.instance = new AppFormHelper();
    }
    return AppFormHelper.instance;
  }

  getErrorCount(form : FormGroup<any>) : number {
    let count : number = 0;
    
    for (const field in form.controls) {
      let control = form.get(field);

      if (control instanceof FormGroup) {
        count += this.getErrorCount(control);
      } else if (control instanceof FormControl) {
        if (control.invalid)
          count++;
      }
    }
    
    return count;
  }

  getErrorCountHeaderMessage(form : FormGroup<any>) : string {
    let count : number = 
      this.getErrorCount(form);
    
    if (count == 1)
      return "Please correct the error on this page.";
    if (count > 1)
      return "Please correct the " + count + " errors on this page.";
    
    return null;
  }
}