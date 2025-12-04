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
    const encodedSubject = encodeURIComponent(formData.get("subject") || ''); 
    const encodedBody = encodeURIComponent(`${formData.get("name")} sent: ${formData.get("message")} from email ${formData.get("email")}` || '');
    // Construct the mailto link
    let mailtoUrl = `mailto:jenn.tillman55@gmail.com?bcc=u7uwf9yjbf00nwfxuam7xqm2~72218714-b90a-11ed-8d56-f27a94c8b4fd@amplenote.email&`;
    if(encodedSubject || encodedBody) {
      mailtoUrl += `&`;
      if(encodedSubject) {
        mailtoUrl += `subject=${encodedSubject}`;
      }
      if(encodedBody) {
        if(encodedSubject) {
          mailtoUrl += `&`;
        }
        mailtoUrl += `body=${encodedBody}`;
  }
    }
    // Open the mailto link
    // window.location.href = mailtoUrl;
    // Open the mailto link in a new tab
    window.open(mailtoUrl, '_blank');
  }

  // function email_form_submit(thisForm, formData) {
  //   Email.send({
  //     SecureToken : "3aeb80bb-e043-4c1c-819f-66bb5d755fa3",
  //     To : `jenn.tillman55@gmail.com`,
  //     From : `jenn.tillman55@gmail.com`,
  //     Subject : `${formData.get("subject")} + SMTPjs Email`,
  //     Body : `${formData.get("name")} sent: ${formData.get("message")} from email ${formData.get("email")}`
  //   }).then(response => {
  //     // console.log(Email.send + '')
  //     if( response === 'OK') {
  //       return alert("Message Sent Succesfully")
  //     } else {
  //       throw new Error(`There was an error sending the email`); 
  //     }
  //   })
  //   .catch((error) => {
  //     displayError(thisForm, error);
  //     console.log()
  //   });
  // }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

  // async function email_form_submit(thisForm, formData) {
  //   // Nodemailer Transporter
  //   const transporter = nodemailer.createTransport({
  //     host: "smtp.gmail.com",
  //     port: 465,
  //     secure: true,
  //     auth: {
  //       type: "OAuth2",
  //       user: "jenn.tillman55@gmail.com",
  //       accessToken: `${process.env.ACCESS_TOKEN}`,
  //     },
  //   });

  //   const mailInfo = await transporter.sendMail({
  //     from: "Nodemailer <jenn.tillman55@gmail.com>", // Header From:
  //     to: "Jen Tillman <jenn.tillman55@gmail.com>", // Header To:
  //     envelope: {
  //       from: "jenn.tillman55@gmail.com",
  //       to: [
  //         "jenn.tillman55@gmail.com"
  //       ],
  //       cc: [
  //         // Career Todo: Add CC emails here
  //         "u7uwf9yjbf00nwfxuam7xqm2~72218714-b90a-11ed-8d56-f27a94c8b4fd@amplenote.email"
  //       ],
  //     },
  //       subject: `${formData.get("subject")} SMTP Email`,
  //       text: `${formData.get("name")} sent: ${formData.get("message")} from email ${formData.get("email")}`,
  //     });

  //       console.log("Envelope used: mailInfo.envelope");
  
  //   }

  //   const etherealTransporter = nodemailer.createTransport({
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     auth: {
  //         user: 'uriah.mcclure@ethereal.email',
  //         pass: 'D2e7cKx5NW1UxJFTUw'
  //     }
  //   });

  //   email_form_submit_ethereal = async (thisForm, formData) => {
  //     etherealTransporter.sendMail({
  //       from: 'Uriah Mcclure <uriah.mcclure@ethereal.email>',
  //       to: 'uriah.mcclure@ethereal.email',
  //       subject: `${formData.get("subject")} SMTP Email`,
  //       text: `${formData.get("name")} sent: ${formData.get("message")} from email ${formData.get("email")}`,
  //   })
  //   .then((mailInfo) => {
  //       console.log("Message sent: %s", mailInfo.messageId);
  //       // Preview the stored message in Ethereal’s web UI
  //       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailInfo));
  //   })
  //   .catch(console.error)
  
  // };
})();
