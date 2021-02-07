/*
Rendering The Map
*/
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        // Remember that there are two required options for every map: center and zoom:              
        zoom: 3,
        center: {
            /* 
            So in here, we set a latitude and a longitude
            */
            lat: 46.619261,
            lng: -33.134766
        }
    });
    /*
    As we said though, to be useful we need to have markers that show where Rosie has been.
    Additionally, when the markers are close together, then we'd like them to appear in one cluster.
    */

    /*
    STEP 1: Create labels variable with locations array
    So the first thing we want to do is create some labels.
    I'm going to say: var labels = , and then a string that consists of the letters of the alphabet, from A through Z, all in uppercase.

    Each individual letter is going to appear on the markers.
    */

    // Google: Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /*
    And then I'm going to create an array,
    And this array will contain a set of objects [[Array of Objects]]

    Each object will contain a latitude and a longitude of the different places that Rosie has visited.

    And all of these, you'll notice when we render them on the map, 
    are locations in New York.
    */
    var locations = [
        {
            lat: 40.785091,
            lng: -73.968285
        },
        {
            lat: 41.084045,
            lng: -73.874256
        },
        {
            lat: 40.754932,
            lng: -73.984016
        }
    ];

    /*
    STEP 2:
    Now, we need to iterate through that array and create a new marker that has the label from our string.

    Please notice that this map method here is a built-in JavaScript method.
    The map method in JavaScript works similar to a forEach() function.
    The difference is that this returns an array with the results of looping through each item in our locations array.

    The map method can take up to three arguments.
    We're going to use two in our example here:

    - First Argument: that we're going to pass into our function is location, which is the current value of where we are in the array as we're looping through.
    - Second Argument: one is i, which is the index number of where we currently are in the array.
    */
    var markers = locations.map(function (location, i) {
        /*
            We're going to return a new google.maps.marker object.
        */
        return new google.maps.Marker({
            /*
            So this is going to have: 
            - position value: which is going to be set to the current location
            - label: which is going to be set to i % labels.length. {modulo operator}

            Because we want to get one of our labels out of the string that we've created.
            Using length to find the length of the string

            The reason for using the % operator is so that if we have more than 26 locations, 
            then it will loop around to the start of our string again and go from Z back to A, 
            instead of throwing an error.
            */
            position: location,
            label: labels[i % labels.length]
        });
    });

    /*
    STEP 3: 
    And this is going to create both the marker image for our map, 
    but it's also going to create them in a cluster if they're close together using that clusterer library that we already loaded.
    */

    // Google: Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
} // end function initMap


// The code below is just for exploring how Google developers think!:
letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // string like array every character has its index value
// letters.length = 26 (Constant Value)
// the last index is 25
// length property belongs to array and string
for (var i = 0; i < 30; i++) {
    console.log("current index % 26: ", i % letters.length);
    console.log(i + ": " + letters[i % letters.length]);
}