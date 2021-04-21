/*
Create a function called fetchGitHubInformation().
The same function that we're calling in the oninput event in our input  field of type "text".
*/
function fetchGitHubInformation() {
    /*
    Create a variable to hold the username that we've typed
    using jQuery to select the element by id then target its value using val() method
    */
    // var username = document.getElementById("gh-username").value; // no need for JS syntax 

    // since we use jQuery:
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
        // This is the code in pure JS:
        // document.getElementById("gh-user-data").innerHTML = "<h2>Please enter a GitHub username</h2>";

        // below is the same code but with jQuery
        $("#gh-user-data").html("<h2>Please enter a GitHub username</h2>");
        /*
        if username field is empty we just stop the function and return nothing:

        and we don't want to go and search the GitHub API if the field is empty.
        So we're just going to return out of this function.

        Remember that return statement will terminate the function 
        so any code that comes after will not be executed
        */
        return; // Just to stop/terminate the function
    } // end if no username
    // below is the code for fetching info from github if there is a value in the input box:
    // if the username is not empty the following code will run:
    // Notice that the line below is just my code based on our first lectures of JS fundamentals
    // $("#gh-user-data").html('<div id="loader"><img src="assets/css/loader.gif" alt="loading..." /></div>');
    /*
        The result:
        <div id="gh-repo-data" class="clearfix">
            <div id="loader">
                <img src="assets/css/loader.gif" alt="loading..." />
            </div>
        </div>
    */

    /*
    OR: we can use template literals here.
    These are back quotes, or back ticks, not regular apostrophes.

    So we can type it in several lines:
    */
    $("#gh-user-data").html(`
    <div id="loader">
        <img src="assets/css/loader.gif" alt="loading..." />
    </div>`);
    /*
        The image we are loading is loader.gif is simply an animated gif file 
        that will just keep repeating itself while data has been accessed.
        There are many of them out on the internet as well if you want to go and search for them.
    */
} // end function fetchGitHubInformation

// You can try your name or "aaronsnig501" or just use octocat for the author for later test