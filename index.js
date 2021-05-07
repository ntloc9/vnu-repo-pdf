//https://repository.vnu.edu.vn/flowpaper/simple_document.php?subfolder=16%2F07%2F22%2F&doc=160722683649573237125665834454826132574
const buildURL = (subfolder, doc) => {
    return `https://repository.vnu.edu.vn/flowpaper/services/view.php?doc=${doc}&format=pdf&subfolder=${subfolder}`
}

const parseURL = (queryString) => {
    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');
        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}

document.getElementById('clickDown').addEventListener("click", function () {
    let url = document.getElementById('url')
    if (!url.value) {
        alert('please enter link')
    }
    if (url.value.split('?').length > 1) {
        queryString = url.value.split('?')[1];
        let data = parseURL(queryString);
        const subfolder = data.subfolder ?? null;
        const doc = data.doc ?? null;
        if (!subfolder && !doc) {
            alert('link does not support')
        }
        let urlBuiled = buildURL(subfolder, doc);
        window.open(urlBuiled);
    }
});
