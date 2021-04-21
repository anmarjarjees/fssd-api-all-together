// This function is here just for learning
// it was our first function "sendMailOld()" that we used before the original "sendMail()"
function sendMailOld() {
    // Just for testing
    console.log("Aha, you want to email us!");

    // Remember that here we need to copy the full template of EmailJS send() method
    // No need to worry! you can take the following code from EmailJS docs ;-)

    // Here is one of the ways by placing the object and all its properties 
    // directly inside the emailjs.send() method:
    // serviceID: "outlook"
    // templateID: "cbc_demo3"

    /*
    instead of passing the full object, we can create this object "templateParams"         
    */
    /*
    var templateParams = {
        // The sender information based on our HTML form
        // our HTML form has only 3 input fields: name, email, and message
        // we are just hard coding the values! But we need to retrieve the user's input
        main_subject: "Project Request",
        from_name: 'Anmar with his students',
        from_email: 'Valid and Exist Email Address',
        project_request: 'here is my request to build for me a project'
    }

    emailjs.send('outlook', 'cbc_demo3', templateParams);
    */

    /*
       Notice that the keys for this object are all equal to the parameter names that we've set in our email template back on EmailJS.

       Also remember the number of the templateParams variable properties, ]
       like how many properties I need to use and it depends on how many input fields we have in our HTML form

       In our HTML form we have the following form fields:
       - Input field for name
       - Input field for email
       - Textarea for message

       Since we have 3 inputs/fields, so we need to prepare three properties as placeholders:

       we can create a variable like "templateParams" with the required properties
       OR 
       we can just pass these properties with their values directly inside emailjs send function        
   */
    var templateParams = {
        // Notice that our template (EmailJS) has the parameter named "main_subject"
        // it's good to give a value for this property
        // Remember it is just an optional field!
        main_subject: "Project Request",
        // we need to get the value of user name/full name:
        from_name: document.getElementById("full-name").value,
        // we need to get the value of user's email:
        from_email: document.getElementById("email-address").value,
        // we need to get the value of user's project request message:
        project_request: document.getElementById("project-summary").value
    }

    // for testing/learning:
    // templateParams  is just a JS object ==> objectName.property or objectName.method()
    console.log("the form_name property of templateParams object : " + templateParams.from_name);
    console.log("the from_email property of templateParams object: " + templateParams.from_email);
    console.log("the project_request property of templateParams object: " + templateParams.project_request);


    // Remember that we can also add "userID" to send() method but it is optional :-)
    // These lines of code is from EmailJS docs
    // Below we run our promise/code: emailjs.send()...
    emailjs.send('outlook', 'cbc_demo3', templateParams)
        /*
         now we can supply the "then()"" method for our promise.
         And we can provide two functions:
        - the first one will run when the promise is done/met (pass => run our first anonymous function)
        - the second one will run when the promise is not done (fail => run our second anonymous function)
        */
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            // output: SUCCESS! 200 OK

            // This line of code is from the Code Institute (LMS Learning):
            console.log("SUCCESS", response); // simpler
            // output: the response object with its two properties: status and text

            // Here we can add our own custom message (using literal Template):
            alert(`
            Thank you ${templateParams.from_name} for emailing us,
            We will reply to you on this address ${templateParams.from_email}
             `);
        }, function (error) {
            console.log('FAILED...', error);
            /*
            Adding our own code for console/alert the reason of the error!
            An extra based on our understanding of the object "error"
            this object has two properties:
            - status
            - text
            */
            console.log("Error: " + error.text);
            // using \n for displaying the rest of the output message in a new line
            alert('Error in sending your message: \n' + error.text);
        }); // the end of method then() for emailjs.send()

    /*
      Notice every time we click the submit button of our form,
      we will have our page to be reloaded (refreshed).
 
      This will prevent us from:
      - reading the content of the console window as it will be very fast will disappear quickly.
      - sending the email!

      There is a simple trick that we have covered before in our previous lectures 
      to prevent the page from being reloaded after calling this function

      We just need to do the following two steps:
      1. Ask this function to return false by adding return false at the very end of the function (last line of the function code)
      2. We have to add the keyword return before our function name inside the value of the event handler attribute of the HTML     
    */

    // Return false is required so "email.min.js" file can have the time to read the content of the HTML form before being refreshed
    // email.min.js is the minified version of email.js code file that will be run by EmailJS services
    return false; // to prevent the default behaviour of the browser of reloading or refreshing the pages
} // end the old sendMail() function

/*
The other better way is to pass our form element object as a parameter for this function
for this function we need to use the argument "this" in the html attribute when we call the function

the parameter "contactForm" is just a JS "LOCAL" variable  to be replaced with the actual form element

the js variable (the function parameter) which is contactForm => <form> .... </form>
*/
function sendMail(contactForm) {
    // for testing the contactForm
    // we need to make sure that contactForm has the <form> html element
    console.log(contactForm); // output the entire form element

    /*
    Now be advised that contactFrom is a variable that contains the <from> object 
    
    we need to access the individual properties (fields) of this form object to get their values:
    we can the values of name attribute
    - name => because we put name="name" in our HTML form element
    - emailaddress => because we put name="emailaddress" in our HTML form element
    - projectsummary => because we put name="projectsummary" in our HTML form element

    to summarize, the values of the "name" html attribute are the properties of the form object
    */
    var templateParams = {
        // Notice that our template (EmailJS) has the parameter named "main_subject"
        // it's good to give a value for this property
        // Remember it is just an optional field!
        main_subject: "Personal Project Request",
        // we need to get the value of user name/full name [ name="name" ]:
        from_name: contactForm.name.value,
        // we need to get the value of user's email [ name="emailaddress" ]:
        from_email: contactForm.emailaddress.value,
        // we need to get the value of user's project request message [ name="projectsummary" ]:
        project_request: contactForm.projectsummary.value
    }

    // for testing: *************************************************
    console.log("templateParams => name property value: " + templateParams.from_name);
    console.log("templateParams => from_email property value: " + templateParams.from_email);
    console.log("templateParams => project_request property value: " + templateParams.project_request);
    // **************************************************************

    // Put the values for YOUR_SERVICE_ID which is "outlook" and YOUR_TEMPLATE_ID which is "cbc_demo2"
    emailjs.send('outlook', 'cbc_demo3', templateParams)
        /*
         now we can supply the then() method for our promise.
         And we can provide two functions:
         - the first one will run when the promise is done/met (pass => run our first anonymous function)
         - the second on will runt when the promise is not done (fail) => run our second anonymous function)
        */
        .then(function (response) {
            // NOTE#1: this line of code is from EmailJS docs
            console.log('SUCCESS!', response.status, response.text); // has more details
            // output: SUCCESS! 200 OK

            // NOTE#2: This line of code is from the Code Institute (LMS Learning):
            console.log("SUCCESS", response); // simpler
            // output: the response object with its two properties: status and text
            // output: SUCCESS r {status: 200, text: "OK"}

            /* ************************************************************************ */
            /* ********* Below is our own code (NOT Code institute [LMS]) ************* */
            /*
                - alert the user that his email has been sent successfully!
                - clear all the input fields of the form
            */
            alert(`
            Thank you ${templateParams.from_name} for emailing us,
            We will reply to you on this address:
            ${templateParams.from_email}
            `);
            // Now we can clear all the fields input by assigning an empty string to each one:
            contactForm.name.value = "";
            contactForm.emailaddress.value = "";
            contactForm.projectsummary.value = "";
        }, function (error) {
            console.log('FAILED...', error);
            alert(`
            Sorry ${templateParams.from_name}!,
            We were unable to receive your email: ${templateParams.from_email}
            `);
        }); // the end of method then() for emailjs.send()

    // Return false is required so "email.min.js" file can have the time to read the content of the HTML form before being refreshed
    // email.min.js is the minified version of email.js code file that will be run by EmailJS services
    return false; // to prevent the default behaviour of the browser of reloading or refreshing the pages
} // end sendMail() function

// for testing
// console.log(contactForm); // error: not defined (in RED color)