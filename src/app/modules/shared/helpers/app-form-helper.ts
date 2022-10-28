import { FormGroup } from '@angular/forms';

export class AppFormHelper {
  private static instance : AppFormHelper;

  private constructor() {}

  static getInstance() : AppFormHelper {
    if (!AppFormHelper.instance) {
      AppFormHelper.instance = new AppFormHelper();
    }
    return AppFormHelper.instance;
  }

  getErrorCountHeaderMessage(form : FormGroup<any>) : string {
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