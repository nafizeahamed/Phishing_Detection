// contentScript.js

const init = function () {
    const injectelement = document.createElement('div');
    injectelement.className = "rest_class";
    injectelement.innerHTML = "hello darling"
    // document.body.appendChild(injectelement)

    document.body.insertBefore(injectelement, document.body.firstChild);



}

//init();

var currentUrl = window.location.href;
//alert(currentUrl)
const message = currentUrl
//alert(message)
fetch("https://nafizeahamed.pythonanywhere.com/", {

    method: "POST",
    mode: "no-cors",
    credentials: "include",
    headers: {
        "X-CSRFToken": '123456789asdfghjkl',

        "Content-Type": "application/json"
    },
    body: JSON.stringify({ "url": message })
}).then(response => response.json()).then(response => {
    const x = JSON.stringify(response);
    const k1 = JSON.stringify({ "result": "[1]" });

    if (x === k1) {
        //diceE1.remove('hidden');
        currentUrl = currentUrl + " IS MALICIOUS!!";
        //edit(currentTabUrl);
        init();
        alert(currentUrl + "⚠️")
        //Notification("hi")


        //alert(extract(currentTabUrl));
    }
    else {
        //alert("The URL is Legitimate");

        currentUrl = currentUrl + " IS LEGITIMATE";
        init();
        alert(currentUrl)


    }
    //alert(message);
}).catch(error => {
    alert(error);
});