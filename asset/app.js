// Connect and get JSON data structure 
function getRecipe(url, callback) {
    var req = new XMLHttpRequest()
    req.open('GET', url) // Open a connection with GET method 
    req.responseType = 'text/json' // Data type for response
        // Make sure the response is correct to call the parsing function
    req.addEventListener("load", function() {
        if (req.status == '200') {
            callback(req.response)
        }
    })
    req.send(null)
}