// Code PART 2 [Second Function]: Then write this function: userInformationHTML()
/*
Remember that this is the function that we're calling when our promise resolves.

UserInformationHTML() takes one parameter of "user".
Remember at this point that user is the object that's been returned from the GitHub API.

This object has many methods, such as the user's name, login name, and links to their profile.

Please refer to  https://docs.github.com/en/free-pro-team@latest/rest/guides
or my PDF file
*/
function userInformationHTML(user) {
    /*
   If we want to display all the properties that GitHub User has:
   let's use console.log():
   */
    console.log(user); // this will output the JSON content of "user" JSON object

    // we don't output anything here, just return the result:
    // simple output for testing:
    // return "login: " + user.login + ". Username: " + user.name + " " + ". Public Repos: " + user.public_repos;

    /*
    We're returning a template literal using the "back quote" notation.
    return

    - user public name
    "name": "monalisa octocat"

    - span with class "small-name": Check github-styles.css CSS file

    - put a bracket and an @ sign so that will appear before the user's login name.
    like "The Octocat (@octocat)"

    "html_url": example => "https://github.com/octocat"

    - the text inside the anchor tag is the user login name:
    "login": "octocat"

    Then display the user's content:
    - create a new div with class gh-content to display all user's content
    - inside it, creating a div with class of "gh-avatar" href and image for the user avatar 
    - img inside it

    display in italic: (@octocat)

    template literal: `Simple text ${variable} simple text`

    We are going to return a full HTML code + embedded JS variables using literal template with "`":

        "name", "html_url", "login"

    In HTML format (Just the few):

    <h2> USER_NAME <span class="small-name"> HTML_URL LOGIN </span>
    </h2>
    <div class="gh-content">
        <a href="HTML_URL" target="_blank">
            <img src="USER_IMAGE" alt="LOGIN_NAME">
        </a>
    </div>
    */
    return `
    <h2>${user.name}
        <span class="small-name">
            <a href="${user.html_url}" target="_blank">${user.login}</a>
        </span>
    </h2>

    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
            </a>
        </div>
        <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`;
} // end userInformationHTML()

// Code Part 1 [First Function]: Start first with this function: fetchGitHubInformation
function fetchGitHubInformation() {
    /*
    Create a variable to hold the username that we've typed
    using jQuery to select the element by id then target its value using val() method
    */

    // var username = document.getElementById("gh-username").value; // no need for JS syntax since we use jQuery:
    var username = $("#gh-username").val(); // the same result just by using jQuery syntax
    // console.log("User name: " + username);

    /*
    if the username field is empty (it has no value which means it's undefined), there's no value:
    then we're going to return a HTML element "<h2>" that says "Please enter a GitHub username". 
    */
    if (!username) {
        /*
        So, again, we'll select this "gh-user-data" ID using jQuery and set the HTML inside it.
        We'll give it a heading of <h2>.   
        */
        $("#gh-user-data").html("<h2>Please enter a GitHub username</h2>");
        /*
        if username field is empty we just stop the function and return nothing:

        and we don't want to go and search the GitHub API if the field is empty.
        So we're just going to return out of this function.

        Remember that return statement will terminate the function so any code that comes after will not be executed
        */
        return;
    } // end if no username
    // below is the code for fetching info from github if there is a value in the input box:
    // if the username is not empty the following code will run:
    // Notice that the line below is just my code based on our first lectures of JS fundamentals
    // Be careful the code below is duplicated just for learning purpose:
    // $("#gh-user-data").html('<div id="loader"><img src="assets/css/loader.gif" alt="loading..." /></div>');

    /*
    OR: we can use template literals here.
    These are back quotes, or back ticks, not regular apostrophes.

    So we can type it in several lines:
    */
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    /*
    And we're going to use what are called promises to achieve this.
    What is a promise? Well a promise in coding is a lot like a promise in real life.

    When: finish something
    Then: you will receive this...

    The same in jQuery:
    $.when ( 
        // something has finished happening
    ).then ( function() {
        // We promise to give you this
    // But what if we can't keep our promise!
    });

    So in our case for GitHub info:
    $.when ( 
        // we have got a response from the Github API
    ).then (
        // function to display it in the gh-user-data div
        // unless we get an error
    );  
*/

    /*
    If you don't pass it any arguments at all, jQuery.when() will return a resolved promise.
    It has no condition at all
    */

    /*
     $.when().then(function () {
         alert("I fired immediately");
     })
    */

    $.when(
        // here is my code to get the info from GitHub as JSON
        /*
        jQuery getJSON() ==> W3Schools Link: https://www.w3schools.com/jquery/ajax_getjson.asp    

        jQuery getJSON() Method:
        The getJSON() method is used to get JSON data using an "AJAX HTTP GET request".
 
        Syntax: $(selector).getJSON(url,data,success(data,status,xhr))

        - url [Required] => Specifies the url to send the request to (we use our GitHub API)
        example =>  "url": "https://api.github.com/users/octocat",
        - data [Optional] => Specifies data to be sent to the server
        - success(data,status,xhr) [Optional]

        GitHub Docs => REST API => Reference Users:
        NOTE: I was able to find the url address full syntax from this link:
        https://docs.github.com/en/free-pro-team@latest/rest/reference/users

            
        Based on GitHub: GET /users/username

        below the url is: the address of our GitHub API: https://api.github.com/users.
        And then the value of username that we've obtained from our input box.

        Hint: https://api.github.com/users/YourUserName

        YourUserName => whatever the value the user inputs/types in the input box

        You can try to type your "username" to see your full information as JSON format!
        example: https://api.github.com/users/alexchow
        */

        // Two different format:
        // using our normal/classical way of concatenating string and variables
        // $.getJSON("https://api.github.com/users/" + username)
        // or using Code Institute the ` and $ { }
        $.getJSON(`https://api.github.com/users/${username}`)

        // Notice that we don't end any sentence with ; inside when() method (like object members)
        // if you have multiple sentence we have to use the comma ,
        // this when() method has only one statement
        // and the same rule for then() method
    ).then(
        /*
            we have our 2 anonymous functions, with "response" argument, 
            which is the first argument that came back from our getJSON() method.
 
            Notice that "response" is just a variable name (function's parameter) so it could by x or y or... 
            And we're going to store that in another variable called "userData".
        */

        // my first anonymous function if we did receive a JSON data response
        // if the condition is met
        // the "response" parameter will be the JSON object we receive from GitHub API
        function (response) {
            /*
            for testing: should display the info for that specific "username"
            */
            console.log("Good response: " + response); // for testing: [object Object]

            // one of the properties of response object is "status":
            console.log(response.status); // undefined [everything is ok!]

            /*
          we can create a new meaningful variable name "userData" then userData = response
            */
            var userData = response;

            // more testing:
            // console.log can fully display the returned JSON object
            console.log(userData); // will display the full JSON response message
            /*
            {login: "octocatx", id: 40041436, node_id: "MDQ6VXNlcjQwMDQxNDM2", avatar_url: "https://avatars.githubusercontent.com/u/40041436?v=4", gravatar_id: "", …}
            avatar_url: "https://avatars.githubusercontent.com/u/40041436?v=4"
            bio: "I void warranties."
            blog: ""
            company: null
            created_at: "2018-06-07T20:07:39Z"
            email: null
            events_url: "https://api.github.com/users/octocatx/events{/privacy}"
            followers: 0
            followers_url: "https://api.github.com/users/octocatx/followers"
            following: 0
            following_url: "https://api.github.com/users/octocatx/following{/other_user}"
            gists_url: "https://api.github.com/users/octocatx/gists{/gist_id}"
            gravatar_id: ""
            hireable: null
            html_url: "https://github.com/octocatx"
            id: 40041436
            location: "The internet"
            login: "octocatx"
            name: "octocatx"
            node_id: "MDQ6VXNlcjQwMDQxNDM2"
            organizations_url: "https://api.github.com/users/octocatx/orgs"
            public_gists: 2
            public_repos: 3
            received_events_url: "https://api.github.com/users/octocatx/received_events"
            repos_url: "https://api.github.com/users/octocatx/repos"
            site_admin: false
            starred_url: "https://api.github.com/users/octocatx/starred{/owner}{/repo}"
            subscriptions_url: "https://api.github.com/users/octocatx/subscriptions"
            twitter_username: null
            type: "User"
            updated_at: "2021-04-10T11:59:47Z"
            url: "https://api.github.com/users/octocatx"
            */

            // The two lines below (jQuery and JS) are to output or print the userData into the document
            // $("#gh-user-data").html(userData); // empty string! 
            // because jQuery method.html() will not display objects
            // document.getElementById("gh-user-data").innerHTML = userData; // [object Object]

            /*
              Then we can use our jQuery selectors to select the ID "gh-user-data" div 
              and set the HTML to the results of another function called userInformationHTML(). 
              
              Here is another custom function that we are going to create "userInformationHTML()",
              this function is to render the returned GitHub result into the DOM for our site visitors 
              
              that function we will receive "userData" as an argument 
              then format it nicely in HTML elements

              remember that userData is the variable that contains the returned JSON object of GitHub API

              the .html() method will render/display the returned value from "userInformationHTML()"
            */
            $("#gh-user-data").html(userInformationHTML(userData));

        }, // end function response

        // my second anonymous function if we did receive a JSON data response
        /*
            Now in case if the promise doesn't work out,
            we create a function for error response
        */
        // if the condition is not met
        // the "errorResponse" parameter will be the JSON object we receive from JSON request
        function (errorResponse) {
            /*
            for testing: should display the info for that specific "username"
            */
            console.log("Bad response: " + errorResponse); // Bad response: [object Object]
            console.log("Bad response: ", errorResponse);
            // Bad response:  {readyState: 4, getResponseHeader: ƒ, getAllResponseHeaders: ƒ, setRequestHeader: ƒ, overrideMimeType: ƒ, …}

            // so one of the properties of errorResponse object is "status":
            console.log(errorResponse.status); // 404 [Error in finding the page]

            // for learning and testing, let's try to output "errorResponse":
            // console.log(errorResponse);
            /*
            The output of noData:
            abort: ƒ (a)
            always: ƒ ()
            catch: ƒ (a)
            done: ƒ ()
            fail: ƒ ()
            getAllResponseHeaders: ƒ ()
            getResponseHeader: ƒ (a)
            overrideMimeType: ƒ (a)
            pipe: ƒ ()
            progress: ƒ ()
            promise: ƒ (a)
            readyState: 4
            responseJSON: {message: "Not Found", documentation_url: "https://docs.github.com/rest/reference/users#get-a-user"}
            responseText: "{↵  "message": "Not Found",↵  "documentation_url": "https://docs.github.com/rest/reference/users#get-a-user"↵}↵"
            setRequestHeader: ƒ (a,b)
            state: ƒ ()
            status: 404
            statusCode: ƒ (a)
            statusText: "error"
            then: ƒ (b,d,e)
            __proto__: Object
            */

            /*
                       Now check:
                       if errorResponse.status === 404 (page is not found error)   
            */
            if (errorResponse.status == 404) {
                /*
                    then select our gh-user-data div 
                    and set its HTML to an error message that says the user wasn't found.
    
                    Because we're using template literals, 
                    remember that we can pass in the username here by using the $ and {} notation.
                */
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            }
            /*
                What if the error that we receive is not 404 (page not found), 
                it could be something else, so let's create else block
            */
            else {
                console.log("errorResponse => " + errorResponse.responseJSON.message);
                /*
                And we'll also set our gh-user-data div to the JSON response that we got back.
                */
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        } // end function errorResponse
    ); // end of then() method
} // end function fetchGitHubInformation()


/*
*************************************
The basic idea of using when().then()
*************************************

$.when( "you do your part").then ( "I promise you to give you this gift")

$.when(
    condition: statement1,
    statement2,
    etc...
    ).then(
    function(goodResponse) {
        // this function will run when the condition is met in when() method
        // I will give you an extra mark
    },
    function(badResponse) {
        // this function will run when the condition is not met in when() method
        // Sorry I can't give you an extra mark
    }
);
*/


/*
If you don't pass any arguments for when() at all, jQuery.when() will return a resolved promise.
It has no condition at all
Example:

$.when().then(function () {
     alert("I fired immediately");
 })
*/

// You can try your name or "aaronsnig501" or just use octocat for the author

/*
Useful links:
To learn more about promises in jQuery and JavaScript:
- jQuery: https://api.jquery.com/jquery.when/
- JavaScript: https://www.w3schools.com/js/js_promise.asp
*/