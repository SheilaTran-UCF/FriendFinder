// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on all possible friends
// ===============================================================================
var path = require("path");
var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get('/api/friends', function (req, res) {

        console.log("Reading API");

        res.json(friends);

    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // ---------------------------------------------------------------------------

    app.post("/api/new", function (req, res) {

        //setup variables for finding match
        //  var newFriend = req.body;
         var newFriend = {
             name: req.body.name,
             photo: req.body.photo,
             scores: []
         };
          var newScore = newFriend.scores;
         var total = 0;
         var bestMatch = 1000;
         var index = -1;
        // we loop through all the friend possibilities in the database.
        var scoreArray = [];
        for (var i = 0; i < req.body.scores.length; i++) {
            scoreArray.push(parseInt(req.body.scores[i]))
        
            //Iterate through the whole list of friends already in database

            total = 0;

            // We then loop through all the scores of each friend
            for (var j = 0; j < newScore.length; j++) {

                //for each friend calculate the total value

                var diff = Math.abs(newScore[j] - friends[i].scores[j]);

                total += diff;

            }

            if (total < bestMatch) {

                bestMatch = total;

                index = i;

            }

        }
        // console.log Match
        console.log('Best Match:', friends[index]);
        // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
        // the database will always return that the user is the user's best friend).
        friends.push(newFriend);
        // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
        res.json(friends[index]);

    });

};


