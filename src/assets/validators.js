export function isMoreThanOneChar(value) {
    if (!value) return true;
    return value.length > 1 ;
  }


  export function queryparams() {
    if (!/^[a-zA-Z\s]*$/.test(this.form.query)) {
      return false;
    } else return true;
  }