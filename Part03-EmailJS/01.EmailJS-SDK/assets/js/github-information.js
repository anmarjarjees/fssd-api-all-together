function userInformationHTML(user) {

    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
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
} // userInformationHTML

function repoInformationHTML(repos) {

    if (repos.length == 0) {
        // empty array so no repos for this user:
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function (repo) {

        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
        <p>
            <strong>Repo List:</strong>
        </p>
        <ul>
            ${listItemsHTML.join("\n")}
        </ul>
    </div>`;
} // end repoInformationHTML

function fetchGitHubInformation(event) {
    /*
    The first bug to fix:
    we want to get rid of the issue with our gh-repo-data div not being cleared when there's an empty text box.
    We're actually going to empty both of our divs.
    So we'll use jQuery first of all to select the gh-user-data div and set its HTML content to an empty string.
    and the same for gh-repo-data
    */
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    var username = $("#gh-username").val();

    if (!username) {
        $("#gh-user-data").html("<h2>Please enter a GitHub username</h2>");
        return;
    } // end if no username

    // if the username is not empty the following code will run:
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];

            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        function (errorResponse) {
            /*
            check:
            if errorResponse.status === 404 (page is not found error)   
            */
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            }
            /*
            This part is for the last topic in GitHub API:
            We can't do too much about the fact that GitHub throttles their API, 
            but what we can do is present a nicer and friendlier error message to our users when this happens.

            So after we check for status of 404, 
            we're now going to put an else if clause and check for the status of 403.
            403 means forbidden. And this is the status code that GitHub returned when our access is denied.
            */
            else if (errorResponse.status == 403) {
                /*
                we're going to create a new variable called resetTime and set that to be a new date object.
                The date that we want to retrieve is actually stored inside our errorResponse inside the headers.
                And the particular header that we want to target is the X-RateLimit-Reset header.
    
                "X-RateLimit" is the header that's provided by GitHub to helpfully let us know when our quota will be reset and when we can start using the API again.
                
                This is presented to us as a UNIX timestamp.
                So to get it into a format we can read, 
                we need to multiply it by 1000 and then turn it into a date object.
                And this will give us a valid readable date in our resetTime variable.
                */
                var resetTime = new Date(errorResponse.getResponseheader('X-RateLimit-Reset') * 1000);
                /*
                Then all we need to take that resetTime variable and display it to our user.
                So we'll use jQuery to target our gh-user-data element.

                We're going to use the toLocaleTimeString() method on this resetTime date object that we've created.

                This function will do 2 things:
                - Pick up your location from your browser 
                - Print the local time.
                */
                $("#gh-user-data").html(
                    `<h4>
                    Too many requests, please wait until ${resetTime.toLocaleTimeString()}
                    </h4>`);
            }
            else {
                console.log(errorResponse);
                /*
                And we'll also set our gh-user-data div to the JSON response that we got back.
                */
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });

} // end function fetchGitHubInformation


/*
The next issue:
The next thing I want to do is have the octocat profile displaying when the page is loaded, 
instead of just having an empty div.

To do this, we're going to use the documentReady() function in jQuery 
and execute the fetchGitHubInformation() function when the DOM is fully loaded.

Remember that we have: value="octocat" in the input box
*/
$(document).ready(fetchGitHubInformation);

// You can try your name or "aaronsnig501" for the author