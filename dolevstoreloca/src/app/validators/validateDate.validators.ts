import { AbstractControl, FormControl } from "@angular/forms";



export function validateDate(control: AbstractControl) {
    return (control: FormControl) => {
        const time = control.value.getTime();
        return this.holidayList.find(x => x == time) ? { error: 'this date is full of orders' } : null
    }
}