// ===============================================================================
// LOAD DATA
// We are linking our routes to a "data" source.
// This data sources hold array of information on friend data
// ===============================================================================

var path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    app.get("/survey", function (req, resp) {
        var seyverFilePath = path.join(__dirname,"../public/survey.html");
        resp.sendFile(seyverFilePath)
    });
    app.get("*", function (req, resp) {
        resp.sendFile(path.join(__dirname,"../public/home.html"))
    });

}