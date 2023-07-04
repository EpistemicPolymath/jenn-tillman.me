/**
* PHP Email Form Validation - v3.6
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      // let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');      
      // if( ! action ) {
      //   displayError(thisForm, 'The form action property is not set!');
      //   return;
      // }
      // thisForm.querySelector('.loading').classList.add('d-block');
      // thisForm.querySelector('.error-message').classList.remove('d-block');
      // thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha)
              .then(token => {
                formData.set('recaptcha-response', token);
                email_form_submit(thisForm, formData);
              })
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        email_form_submit(thisForm, formData);
      }
    });
  });

  function email_form_submit(thisForm, formData) {
    Email.send({
      SecureToken : "3aeb80bb-e043-4c1c-819f-66bb5d755fa3",
      To : `jenn.tillman55@gmail.com`,
      From : `jenn.tillman55@gmail.com`,
      Subject : `${formData.get("subject")} + SMTPjs Email`,
      Body : `${formData.get("name")} sent: ${formData.get("message")} from email ${formData.get("email")}`
    }).then(response => {
      // console.log(Email.send + '')
      if( response === 'OK') {
        return alert("Message Sent Succesfully")
      } else {
        throw new Error(`There was an error sending the email`); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
      console.log()
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
