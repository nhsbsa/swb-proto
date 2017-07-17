//applicant.js
function Applicant (
  firstName,
  lastName,
  fullName,
  dobDay,
  dobMonth,
  dobYear,
  hasNhsno,
  nhsno,
  postCode,
  hasMobile,
  hasEmail,
  hasTelephone,
  mobile,
  contactPref,
  contactValue,
  email,
  address,
  age
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = fullName;
    this.dobDay = dobDay;
    this.dobMonth = dobMonth;
    this.dobYear = dobYear;
    this.hasNhsno = hasNhsno;
    this.nhsno = nhsno;
    this.postCode = postCode;
    this.hasMobile = hasMobile;
    this.hasEmail = hasEmail;
    this.hasTelephone = hasTelephone;
    this.mobile = mobile;
    this.contactPref = contactPref;
    this.contactValue = contactValue;
    this.email = email;
    this.address = address;
    this.age = age;
};

Applicant.prototype.setFullName = function () {
  this.fullName = this.firstName + " " + this.lastName;
};

Applicant.prototype.checkAge = function () {
 if (this.age > 15) {
   return true;
 }
};

Applicant.prototype.check = function () {
  if (this.firstname === 'Bill' && this.lastname === 'Smith' && this.postcode === 'NE1 234') {
    return true;
  }
};

function createApplicant() {
  return new Applicant();
};

module.exports.createApplicant = createApplicant;