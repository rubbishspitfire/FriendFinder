// ===============================================================================
// LOAD DATA
// We are linking our routes to a "data" source.
// This data sources hold array of information on friend data
// ===============================================================================

var friendData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the JavaScript array friendData.
    app.post("/api/friends", function (req, resp) {
        //This array holdes score points for current user
        var scoresArray = [];
        var totalDifference=10000; 
        var matchName='';
        var matchImage='';
        var scoresArrayLength = req.body.scores.length;
        for (var i = 0; i < scoresArrayLength; i++) {
            scoresArray.push(parseInt(req.body.scores[i]));
        }
        var newEntry={
            name:req.body.name,
            photo:req.body.photo,
            scores:req.body.scores
        };
        //a friend with least amount of score difference will be a perfect match for you!
        for (let x = 0; x < friendData.length; x++) {
            var sumOfDifferences = 0;
            for (let z = 0; z < scoresArrayLength; z++) {
                var diff = Math.abs(scoresArray[z] - friendData[x].scores[z]);
                sumOfDifferences+=diff;
            }
            //console.log("Sum of differences:",sumOfDifferences);
            if(sumOfDifferences < totalDifference){
                matchName = friendData[x].name,
                matchImage = friendData[x].photo
            }
        }
        friendData.push(newEntry);
        resp.json({status: 'OK', matchName: matchName, matchImage: matchImage});
    });

    app.get("/api/clear", function(req, res) {
        // Empty out the arrays of data
        friendData.length = 0;
        res.json({ status: 'OK'});
      });    
}