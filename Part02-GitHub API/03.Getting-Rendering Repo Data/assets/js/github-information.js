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

// Code Part 2 [Second Steps] (After finishing part 1):
/*
This takes just one argument, which is repos, the object returned from our GitHub API.

The GitHub API => Rendering Repo Data: length is a property not a method
*/
function repoInformationHTML(repos) {
    /*
    GitHub returns this object "repos" as an array of JSON objects.
    So we can use our standard array property "length", to see if it's equal to 0.
    */
    if (repos.length == 0) {
        // empty array so no repos for this user:
        // return statement:
        // - will return a value
        // - will stop the function
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    /*
    We are going take the results of the map() method that's going to be run against our repos array.
    Remember that the map() method works like a forEach, but it returns an array with the results of this function.
    
    So the variable "listItemsHTML" will be an array
    */
    var listItemsHTML = repos.map(function (repo) {
        /*
        return list item:
        inside the list item, an <anchor> tag.
        The href for the <anchor> tag is going to be ${repo.html_url}
        So that's going to take us to the actual repository when we click on it.
        */
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });
    /*
    Format the result in the screen:
    by returning the div, the same one that we returned in our error.
    inside this div => we add a paragraph to display the word "Repo List:"
     
    then adding ul => 
    remember that .map() method returns an array
    so in between <ul> and </ul> we output the array variable "listItemsHTML" using join method 
    we are using the join() method on that array to join everything with a new line (space)
    as a one string: ${listItemsHTML.join("\n")}

    It's better to convert the listItemsHTML array into a string
    The link in W3Schools: https://www.w3schools.com/jsref/jsref_join.asp
    */

    // For testing:
    /*
    listItemsHTML is an array
    */
    console.log("listItemsHTML: ", listItemsHTML);

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
} // end repoInformationHTML

function fetchGitHubInformation() {
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
        // Code Part 1 [First Steps]:
        /*     
            after getting the address of our GitHub API: https://api.github.com/users.
            And then the value of username that we've obtained from our input box.
            => ${username}/username`

            start retrieving repository information for that user. 
            and this will be a different end point (url) to list the repositories for that individual user.
            => ${username}/repos`

            Now we have two JSON objects:
            - User JSON Object
            - Repos Array of JSON Objects
            
            repos is a different JSON object:
            https://docs.github.com/en/free-pro-team@latest/rest/reference/repos
        */

        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        /*
        Now that we're doing two getJSON calls for the two different JSON objects (user and repos), 
        we actually need to have two responses come back in our first function.
        So we're going to call those firstResponse and secondResponse.

        firstResponse: $.getJSON(`https://api.github.com/users/${username}`)
        secondResponse: $.getJSON(`https://api.github.com/users/${username}/repos`)
        */
        function (firstResponse, secondResponse) {
            console.log("First Response: " + firstResponse); // for testing 
            console.log("Second Response: " + secondResponse); // for testing 
            // also changing userData and adding repoData
            /*
            Now, when we do two calls for userData and repoData as shown below, 
            the when() method packs a response up into arrays.
            And each one is the first element of the array.
            So we just need to put the indexes in there for these responses.

            Now we need to remember that:
            - firstResponse is an array
            - secondResponse is an array
            */
            // var userData = firstResponse; // we do need to specify the index 
            // var repoData = secondResponse; // we do need to specify the index 
            // for both array index 0 will represent our needed data
            console.log("First Response index 0: " + firstResponse[0]); // for testing 
            console.log("Second Response index 0: " + secondResponse[0]); // for testing 

            var userData = firstResponse[0];
            var repoData = secondResponse[0];

            $("#gh-user-data").html(userInformationHTML(userData));
            /*
                After that, we can just target "#gh-repo-data" as we did with targeting the "#gh-user-data"
                The function "repoInformationHTML" will be created in "Rendering Repo Data" topic 
                (check above code: Part 2)
            */
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

// You can try your name or "aaronsnig501" for the author