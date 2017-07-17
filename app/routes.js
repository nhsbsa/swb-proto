var express = require('express');
var router = express.Router();

// Route index page
router.get('/', function (req, res) {
  res.render('index');
})

var benificiary = {
  firstname : "Molly",
  lastname : "Smith",
  thirdParty : false,
  dobDay : "0",
  dobMonth : "0",
  dobYear : "0"
};

//create applicant
var applicantMaster = require('./applicant.js');
var applicant = applicantMaster.createApplicant();
applicant.firstName = "Jane";
applicant.lastName = "Doe";
applicant.fullName = "Jane Doe";
applicant.dobDay = null;
applicant.dobMonth = null;
applicant.dobYear = null;
applicant.hasNhsno = null;
applicant.nhsno = null;
applicant.postCode = null;
applicant.hasMobile = false;
applicant.hasEmail = false;
applicant.hasTelephone = false;
applicant.mobile = null;
applicant.contactPref = 'post';
applicant.contactValue = '3 street, Town, NE1 246';
applicant.email = null;
applicant.address = null;




router.get(/dob/, function (req, res) {
  res.render('apply/you/dob', {
    thirdparty : benificiary.thirdParty,
    firstname : benificiary.firstname
  });
});

router.get(/beneficiary-handler/, function (req, res) {
  console.log(req.query.whofor);
  if(req.query.whofor == "yes") {
    benificiary.thirdParty = true;
  } else {
    benificiary.thirdParty = false;
  }
  res.redirect('registration-third-party');
});

router.get(/registration-third-party/, function (req, res) {
  console.log(benificiary.thirdParty);
  res.render('apply/you/registration-third-party', {
    thirdparty : benificiary.thirdParty
  });
});

router.get(/name-handler/, function (req, res) {
  benificiary.firstname = req.query.firstname;
  console.log(req.query.firstname);
  res.redirect('dob');
});

router.get(/birth-handler/, function (req, res) {
  benificiary.dobDay = req.query.dobday;
  benificiary.dobMonth = req.query.dobmonth;
  benificiary.dobYear = req.query.dobyear;
  console.log("DOB = " + benificiary.dobDay + " " + benificiary.dobMonth + " " + benificiary.dobYear);
  res.redirect('partner');
});

router.get(/partner/, function (req, res) {
  res.render('apply/you/partner', {
    thirdparty : benificiary.thirdParty,
    firstname : benificiary.firstname
  });
});

    router.get(/p2-handler/, function (req, res) {
    // if (req.query.partner === 'yes') {
    //     applicant.partner = true;
      if (benificiary.thirdParty == true) {
        res.render('apply/you/post-address', {
          thirdparty : benificiary.thirdParty,
          firstname : benificiary.firstname
        });
    // } else if (req.query.partner === 'no') {
    //     applicant.partner = false;
      } else {
        res.redirect('post-address');
      }
    //   setPartnerText(applicant.partner);
    //   res.render('lis/' + sprint + '/ko', {
    //     'partnerortext' : partnerOrText,
    //     'iwe' : iWe
    //   });
    // });
    });

// address handler
        router.get(/address-c-handler/, function (req, res) {
      if (benificiary.thirdParty == true) {
        res.render('apply/you/contact-prefs-third-party', {
          thirdparty : benificiary.thirdParty,
          firstname : benificiary.firstname
        });
      } else {
        res.redirect('contact-prefs');
      }
    });

// contact preferences
    router.get(/contactTP-handler/, function (req, res) {
      if (req.query.thirdpartycontact === 'applicant-contact') {
        res.render('apply/you/contact-prefs-bob', {
          thirdparty : benificiary.thirdParty,
          firstname : benificiary.firstname
        });
      } else {
        res.redirect('contact-prefs-someone-else');
      }
    });


//Contact handler
router.get(/contact-handler/, function (req, res) {
  if (req.query.text == 'true') {
    applicant.hasMobile = true;
    console.log("applicant.hasMobile = true");
  } else {
    applicant.hasMobile = false;
    console.log("applicant.hasMobile = false");
  }
  if (req.query.email == 'true') {
    applicant.hasEmail = true;
    console.log("applicant.hasEmail = true");
  } else {
    applicant.hasEmail = false;
    console.log("applicant.hasEmail = false");
  }
    if (req.query.telephone == 'true') {
    applicant.hasTelephone = true;
    console.log("applicant.hasTelephone = true");
  } else {
    applicant.hasTelephone = false;
    console.log("applicant.hasTelephone = false");
  }
  if (applicant.hasMobile) {
    res.redirect('mobile-number');
  } else if (applicant.hasEmail) {
    res.redirect('email-address');
  } else if (applicant.hasTelephone) {
    res.redirect('telephone-number');
    } else {
        res.redirect('children-under-20');
      }
});
    
//Mobile capture
router.get(/mobile-c-handler/, function (req, res) {
  applicant.mobile = req.query.mobile;
  if (applicant.hasEmail) {
    res.redirect('email-address');
      } else if (applicant.age <= 24) {
        res.redirect('children-under-20');
      } else {
        res.redirect('non-dependants');
      }
});

//Email capture
router.get(/email-c-handler/, function (req, res) {
  if (applicant.age <= 24) {
        res.redirect('children-under-20');
      } else {
        res.redirect('non-dependants');
      }
});

//telephone capture
router.get(/telephone-c-handler/, function (req, res) {
  applicant.telephone = req.query.telephone;
  console.log(applicant.telephone);
  res.redirect('post-address');
});


    // NON-DEPENDANT
    router.get(/non-dephandler/, function (req, res) {
      if (req.query.authority === 'yes') {
        res.redirect('../about-you');
      } else {
        res.redirect('../saving-ch');
      }
    });


// add your routes here

//import the person constructor
// var person = require("./person.js");

module.exports = router;


