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
  dobYear : "0",
};


//partner question variable
 var setPartnerText = function (partner) {
    if (applicant.partner === false) {
      partnerBothText = 'you';
      partnerCommaText = 'you';
      partnerOrText = 'you';
      partnerAndText = 'you'
    } else {
      partnerBothText = 'you, your partner or both of you';
      partnerCommaText = 'you, your partner';
      partnerOrText = 'you or your partner';
      partnerAndText = 'you and your partner'
  }
  };


//create applicant

var applicantMaster = require('./applicant.js');
var applicant = applicantMaster.createApplicant();
applicant.firstName = "Jane";
applicant.lastName = "Doe";
applicant.fullName = "Jane Doe";
applicant.age= undefined;
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


var thisYear = 2017;

// PRE APPLICATION SECTION


// Who's it for?
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
  res.render('apply/preapp/registration-third-party', {
    thirdparty : benificiary.thirdParty
  });
});
// live in care home?
    router.get(/preappcare-handler/, function (req, res) {
      if (req.query.carehome === 'yes') {
        res.redirect('sc/authority-assessed');
      } else {
        res.redirect('saving-6k');
      }
    });

// authority assessment?
    router.get(/authority-assessed-handler/, function (req, res) {
      if (req.query.authority === 'yes') {
        res.redirect('lis-application');
      } else {
        res.redirect('../saving-6k');
      }
    });



//release 1 savings handler *note* this will change according to carehome answer in next iteration
    router.get(/savings6k-handler/, function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('kickout_release2-no-answer');
      } else {
        res.redirect('job');
      }
    });



    router.get(/dob/, function (req, res) {
      res.render('apply/preapp/dob', {
        thirdparty : benificiary.thirdParty,
        firstname : benificiary.firstname
      });
    });


router.get(/name-handler/, function (req, res) {
  benificiary.firstname = req.query.firstname;
  console.log(req.query.firstname);
  res.redirect('dob');
});

// not for this iteration
    // router.get(/birth-handler/, function (req, res) {
    //   applicant.age = (thisYear - req.query.dobyear);
    //   console.log(applicant.age);
    //   if (applicant.age <= 15) {
    //     res.render('apply/you/full-exemption-u16', {
    //     });
    //       } else if (benificiary.thirdParty == true) {
    //     res.render('apply/you/post-address', {
    //       thirdparty : benificiary.thirdParty,
    //       firstname : benificiary.firstname
    //     });
    //   } else {
    //     res.redirect('post-address');
    //   }
    // });

    router.get(/birth-handler/, function (req, res) {
      applicant.age = (thisYear - req.query.dobyear);
      console.log(applicant.age);
      if (applicant.age <= 15) {
        res.render('apply/preapp/full-exemption-u16', {
        });
          } else if (benificiary.thirdParty == true) {
        res.render('apply/preapp/partner', {
          thirdparty : benificiary.thirdParty,
          firstname : benificiary.firstname
        });
      } else {
        res.redirect('partner');
      }
    });

router.get(/partner/, function (req, res) {
  res.render('apply/preapp/partner', {
    thirdparty : benificiary.thirdParty,
    firstname : benificiary.firstname
  });
});

    //pension credit
    router.get(/p2-handler/, function (req, res) {
      if (req.query.partner=== 'yes') {
        res.redirect('kickout_release2-no-answer');
      } else {
        res.redirect('non-dependants');
      }
    });

 //         // partner handler v2
 //    router.get(/p2-handler/, function (req, res) {
 //      sprint = req.url.charAt(5);
 //      if (req.query.partner === 'yes') {
 //        applicant.partner = true;
 //        //aboutPartnerStatus = "Started";
 //        //aboutPartnerLink = continueText;
 //      } else if (req.query.partner === 'no') {
 //        applicant.partner = false;
 //        //aboutPartnerStatus = completedText;
 //        //aboutPartnerLink = changeText;
 //      }
 //      setPartnerText(applicant.partner);
 // if (benificiary.thirdParty == true) {
 //        res.render('apply/preapp/kickout_release2-no-answer', {
 //          thirdparty : benificiary.thirdParty,
 //          firstname : benificiary.firstname
 //        });   
 //        } else {
 //            res.render('apply/you/children-under-20', {
 //                'partnerandtext' : partnerAndText,
 //            });
 //        }
 //    });


    //pension credit
    router.get(/pencred-handler/, function (req, res) {
      if (req.query.penscred === 'yes') {
        res.redirect('pensioncred-type');
      } else {
        res.redirect('assets_thresholds');
      }
    });
        //pension credit
    router.get(/pcredtype-handler/, function (req, res) {
      if (req.query.pctype === 'savcred') {
        res.redirect('assets_thresholds');
      } else {
        res.redirect('full-exemption-pencredits');
      }
    });

    //capital amounts
    router.get(/assets-handler/, function (req, res) {
      if (req.query.savings === 'no') {
        res.redirect('');
      } else {
        res.redirect('assets_accounts');
      }
    });

    //capital amounts
    router.get(/capital-handler/, function (req, res) {
      if (req.query.capital === 'yes') {
        res.redirect('');
      } else {
        res.redirect('assets_accounts');
      }
    });

    //capital amounts
    router.get(/postaddress-handler/, function (req, res) {
      if (req.query.postal === 'no') {
        res.redirect('post-address-postal');
      } else {
        res.redirect('/apply/you/contact-prefs');
      }
    });

// address handler
        router.get(/address-c-handler/, function (req, res) {
      if (benificiary.thirdParty == true) {
        res.render('/apply/you/contact-prefs', {
          thirdparty : benificiary.thirdParty,
          firstname : benificiary.firstname,

        });
      } else {
        res.redirect('/apply/you/contact-prefs');
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
    res.redirect('telephone-number');
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
        res.redirect('about-you-summary');
      }
});

//Email capture
router.get(/email-c-handler/, function (req, res) {
  applicant.email = req.query.email;
  console.log(applicant.email);
  res.redirect('about-you-summary');
});



//telephone capture
router.get(/telephone-c-handler/, function (req, res) {
  applicant.telephone = req.query.telephone;
  console.log(applicant.telephone);
  res.redirect('post-address');
});


                
// //Check your answers
// router.get(/check/, function (req, res) {
//   var myDobMonth;
//   if (applicant.dobMonth === null) {
//     myDobMonth = 'May';
//   } else {
//     myDobMonth = dateHelper.monthToText(applicant.dobMonth);
//   }
//   textHelper.setContactText(applicant.mobile, applicant.email);
//   textHelper.setReminderText(applicant.mobile, applicant.email);
//   textHelper.setMethod(applicant.email);
//   res.render('you/about-you-summary', {
//   name : applicant.firstName + ' ' + applicant.lastName,
//   dobday : applicant.dobDay,
//   dobmonth : myDobMonth,
//   dobyear : applicant.dobYear,
//   address : applicant.address,
//   mobilenumber : applicant.mobile,
//   hasemail :  boolToText(applicant.hasEmail),
//   emailaddress : applicant.email,
//   });
// });


    // children
    router.get(/children-handler/, function (req, res) {
      if (req.query.children === 'yes') {
        res.redirect('non-dependants');
      } else {
        res.redirect('non-dependants');
      }
    });


    // home-handler
    router.get(/home-handler/, function (req, res) {
      if (req.query.home === 'own') {
        applicant.homeOwner = true;
        res.redirect('../live/mortgaged/mortgage-question');
      } else if (req.query.home === 'rented') {
        applicant.tennant = true;
        res.redirect('housing-benefit');
      } else if (req.query.home === 'guest') {
        applicant.guest = true;
        res.redirect('live-ko');
      } else if (req.query.home === 'homeless') {
        res.redirect('live-ko');
      } else {
        res.redirect('live-ko');
      }
    });

    // mortgaged-handler
    router.get(/mortgaged-handler/, function (req, res) {
      if (req.query.mortgaged === 'yes') {
        res.redirect('../mortgage-amount');
      } else {
        res.redirect('../services');
      }
    });


    
    // housing ben type handler
        router.get(/hbentype-handler/, function (req, res) {
      console.log(req.query);
      if (req.query.hben === 'yes') {
        res.redirect('housing-benefit-all');
      } else {
        res.redirect('live_rent-frequency');
      }
    });

    // housing ben type handler
        router.get(/allsum-handler/, function (req, res) {
      console.log(req.query);
      if (req.query.sum === 'all') {
        res.redirect('live_services2');
      } else {
        res.redirect('live_rent-frequency');
      }
    });

        
            // service charge question type handler
        router.get(/servicequestion-handler/, function (req, res) {
      console.log(req.query);
      if (req.query.servicecharge === 'yes') {
        res.redirect('live_service-charge-frequency');
      } else {
        res.redirect('live_ground-rent');
      }
    });

            // ground rent question type handler
        router.get(/groundrent-handler/, function (req, res) {
      console.log(req.query);
      if (req.query.groundrent === 'yes') {
        res.redirect('live_ground-rent-frequency');
      } else {
        res.redirect('live_loan-adapted');
      }
    });

         // adaption loan
        router.get(/adaptloan-handler/, function (req, res) {
      console.log(req.query);
      if (req.query.adapted === 'yes') {
        res.redirect('live_loan-adaption-frequency');
      } else {
        res.redirect('live_council-tax');
      }
    });
                 // adaption loan
        router.get(/counciltax-handler/, function (req, res) {
      console.log(req.query);
      if (req.query.councilTax === 'yes') {
        res.redirect('live_council-tax-amount');
      } else {
        res.redirect('living-summary');
      }
    });
        
        
    // // service charge question type handler
    //     router.get(/rentfrq-handler/, function (req, res) {
    //   console.log(req.query);
    //   if (req.query.servicecharge === 'yes') {
    //     res.redirect('live_rent_rent-amount');
    //   } else {
    //     res.redirect('live_rent_rent-amount');
    //   }
    // });

   // service handler
        router.get(/service-handler/, function (req, res) {
          console.log(req.query);
      if (req.query.service == 'no') {
        res.redirect('ground-rent');
      } else {
        res.redirect('services-amount');
      }
    });

  // secured loan handler
        router.get(/sloan-handler/, function (req, res) {
      if (req.query.sloan === 'yes') {
        res.redirect('loan-frequency');
      } else {
        res.redirect('../live_services2');
      }
    });

    // capture address
    router.get(/homeadd-handler/, function (req, res) {
      if(req.query.linetwo === '') {
        applicant.homeAddress = (req.query.lineone);
      } else {
        applicant.homeAddress = (req.query.lineone + ', ' + req.query.linetwo);
      }
      res.redirect('../loan');
    });
    
    // rent to parents relitives friends
    router.get(/prf-handler/, function (req, res) {
      if (req.query.prf === 'yes') {
        res.redirect('../guest/address');
      } else {
        res.redirect('../joint-tenant');
      }
    });


    // home
    router.get(/your-home/, function (req, res) {
      applicant.resetLivingSituation();
      res.redirect('../your-home');
    });

    
    // mortgaged-handler
    router.get(/mortgaged2-handler/, function (req, res) {
      if (req.query.mortgaged === 'yes') {
        res.redirect('mortgage-frequency');
      } else {
        res.redirect('loan-question');
      }
    })

      //meals and energy
    router.get(/addenergy-handler/, function (req, res) {
      if (req.query.rentadds== 'no') {
        res.redirect('live_services2');
      } else {
        res.redirect('live_rent_meals-which');
      }
    });

    




    // // council-tax-handler 2
    // router.get(/ctax-handler/, function (req, res) {
    //   if (req.query.counciltax === 'yes') {
    //     res.redirect('../tax-amount');
    //   } else {
    //     res.redirect('../ground-rent');
    //   }
    // });
    
     // council-tax-handler 2
    router.get(/taxfreq-handler/, function (req, res) {
      applicant.councilTaxFreq = req.query.ctax;
      console.log(applicant.councilTaxFreq);
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/live/tax-amount', {
        'taxfreq' : applicant.councilTaxFreq
      });
    });

    // council-tax-handler
    router.get(/ctax2-handler/, function (req, res) {
      if (req.query.counciltax === 'yes') {
        res.redirect('../tax-frequency');
      } else {
        res.redirect('../ground-rent');
      }
    });

    // NON-DEPENDANT
    router.get(/non-dephandler/, function (req, res) {
      if (req.query.nonDep === 'yes') {
        res.redirect('kickout_release2-no-answer');
      } else {
        res.redirect('care-home-question');
      }
    });

// students


        // student living away
    router.get(/awaystudent-handler/, function (req, res) {
      if (req.query.moved == 'yes') {
        res.redirect('live_rent_student-rent-frequency');
      } else {
        res.redirect('../lis-check-list-3');
      }
    });

  //reg payment
    router.get(/regularpayment-handler/, function (req, res) {
      if (req.query.regular== 'yes') {
        res.redirect('live_rent_student-regular-rent-amount');
      } else {
        res.redirect('../lis-check-list-3');
      }
    });
      //reg payment
    router.get(/additionsfreq-handler/, function (req, res) {
      if (req.query.radditionsfreq== 'yes') {
        res.redirect('live_rent_student-regular-rent-amount');
      } else {
        res.redirect('../lis-check-list-3');
      }
    });

     router.get(/job-handler/, function (req, res) {
      if (req.query.job == 'yes') {
        res.redirect('kickout_release2-no-answer');
      } else {
        res.redirect('benefits-question');
      }
    });


router.get(/benefits-handler/, function (req, res) {
      if (req.query.benefittc == 'no') {
      res.redirect('preapp-summary'); 
      } else {
        res.redirect('uc-getting-paid-step1');
      }
});



router.get(/getuc-handler/, function (req, res) {
      if (req.query.getuc == 'yes') {
      res.redirect('uc-claim-type-v2'); 
      } else if (req.query.getuc == 'no') {
      res.redirect('benefits-type-question'); 
      } else {
        res.redirect('uc-assessment-period-info');
      }
});






     router.get(/statepen-handler/, function (req, res) {
      if (req.query.statepen== 'yes') {
        res.redirect('pension_statepension-frequency');
      } else {
        res.redirect('pension_other-pension');
      }
    });

         router.get(/kickout-handler/, function (req, res) {
      if (req.query.kickout== 'Yes') {
        res.redirect('../you/whose-applying');
      } else {
        res.redirect('kickout_release2-no-answer');
      }
    });
     router.get(/workpen-handler/, function (req, res) {
      if (req.query.workpen== 'yes') {
        res.redirect('pension_pension-name-second');
      } else {
        res.redirect('pension_pension-tally');
      }
    });



     


var benType;
    // passported benefits handler
      router.get(/ben-check/, function (req, res) {

        if (req.query.incomesupport == "true") {
                  console.log(req.query);
                  benType = 'Income Support';
          res.render('apply/preapp/full-exemption-benefits-income-support', {

          });

    
        } else if (req.query.taxcredits == "true") {
          if (req.query.esa == "true") {
            res.render('ESA');
          } else if (req.query.jsa == "true") {
            res.render('JSA');
          } else if (req.query.uc == "true") {
            res.render('apply/preapp/benefits-uc-tc');
          } else {
            // tc only
            res.render('apply/preapp/tax-credits-income',{
            });
          }

        } else if (req.query.uc == "true") {
          setPartnerText(applicant.partner);
          res.render('apply/preapp/uc-claim-type-v2', {
      
            // 'partnerortext' : partnerOrText
          });
        } else if (req.query.esa == "true") {
          benType = 'income related Employment and Support Allowance (ESA)';
          res.render('apply/preapp/benefits-esa', {

          });
        } else if (req.query.jsa == "true") {
          benType = 'income based Job Seekers Allowance (JSA)';
          res.render('apply/preapp/benefits-jsa', {

          });
        } else if (req.query.pencredit == "true") {
          benType = 'Pension credit (Guarantee Credit)';
          res.render('apply/preapp/benefits-pension', {

          });
        } else if (req.query.none == 'true') {
            res.redirect('preapp-summary');
  
        }
      });



    // passported benefits handler over 63

          router.get(/ben63-check/, function (req, res) {
            if (req.query.taxcredits == "true") {
            res.redirect('tax-credits-income'); 

          } else if (req.query.pencredit == "true") {
            benType = 'Pension Credit (Guarantee Credit)';
            res.render('apply/preapp/benefits-pension', {
        });
          } else if (req.query.none == 'true') {
              res.redirect('preapp-summary')
          }
        });


// esa handler
          router.get(/esa-handler/, function (req, res) {
      if (req.query.esa == 'contesa') {
      res.redirect('preapp-summarybenefits-handler'); 
      } else {
        res.redirect('full-exemption-benefits-esa');
      }
});


    // child tax credit handler
          router.get(/taxcredit-income-handler/, function (req, res) {
      if (req.query.taxcreditsIncome == 'yes') {
      res.redirect('full-exemption-tc'); 
      } else {
        res.redirect('preapp-summary');
      }
});
              // jsa handler
          router.get(/jsa-handler/, function (req, res) {
      if (req.query.jsatype == 'incomejsa') {
      res.redirect('full-exemption-benefits-jsa'); 
      } else {
        res.redirect('preapp-summary');
      }
});

          
    // pension credit handler
          router.get(/pensioncredit-handler/, function (req, res) {
      if (req.query.pensioncredit == 'guaranteecred') {
      res.redirect('full-exemption-pencredits'); 
      } else {
        res.redirect('preapp-summary');
      }
});


     // universal credits income handler
      router.get(/uc-type-handler/, function (req, res) {
      if (req.query.ucElement === 'yes') {
        res.redirect('uc-income-with-element-v3');
      } else{
        res.redirect('uc-income-without-element-v2');
      }
    });

      // universal credits without element handler (£435)
      router.get(/uc-element-income-handler/, function (req, res) {
      if (req.query.ucelementIncome === 'yes') {
        res.redirect('full-exemption-uc');
            } else {
                res.redirect('kickout_release2-no-answer');
      }
    });

                      // universal credits with element handler(£935)
            router.get(/uc-without-elements-handler/, function (req, res) {
      if (req.query.ucIncome === 'yes') {
        res.redirect('full-exemption-uc');
      } else {
        res.redirect('kickout_release2-no-answer');
      }
    });
                      // universal credits with element handler(£935)
            router.get(/otherpen-handler/, function (req, res) {
      if (req.query.otherpen === 'yes') {
        res.redirect('pension_pension-name');
      } else {
        res.redirect('pension-summary-state');
      }
    });


// add your routes here

//import the person constructor
// var person = require("./person.js");

module.exports = router;


