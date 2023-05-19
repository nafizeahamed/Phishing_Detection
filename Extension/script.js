"use strict";
function block() {

  chrome.storage.local.get("myCheckboxState", function (result) {
    var storedData = result.myCheckboxState;
    // Do something with the data
    //alert(storedData);
    if (storedData === true) {

      chrome.tabs.update({ url: "redirect.html" });
    }

    else {

      chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: 300,
        height: 200
      }, function (window) {
        chrome.windows.update(window.id, {
          left: Math.round((screen.width - window.width) / 2),
          top: Math.round((screen.height - window.height) / 2)
        });
      });



    }

  });
}
//block();
/*
function block(url) {
  chrome.tabs.update({ url: "redirect.html" });
}
function popup(url) {
  chrome.windows.create({
    url: "popup.html",
    type: "popup",
    width: 300,
    height: 200,
  });
}
*/

function isFilePath(url) {
  var x = url.slice(0, 4);
  if (x === "http") {
    return false;
  } else {
    return true;
  }
}

let cloud = "https://nafizeahamed.pythonanywhere.com/report1";

let firstexe = false;

chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.onCreated.addListener(function (tab) {
    //alert("nwe")
    firstexe = true;
    //chrome.tabs.onActivated.addListener(function (tab) {
    //chrome.tabs.onMoved.addListener(function (tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let currentTabUrl = "";
      currentTabUrl = tabs[0].url;
      const message = currentTabUrl;

      if (cloud != message) {
        if (isFilePath(message) === false) {
          //alert('message  :' + message)

          fetch("http://nafizeahamed.pythonanywhere.com/", {
            method: "POST",
            mode: "no-cors",
            credentials: "include",
            headers: {
              "X-CSRFToken": "123456789asdfghjkl",

              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: message }),
          })
            .then((response) => response.json())
            .then((response) => {
              const x = JSON.stringify(response);
              const k1 = JSON.stringify({ result: "[1]" });

              if (x === k1) {
                currentTabUrl = currentTabUrl + " IS MALICIOUS!!";
                //edit(currentTabUrl);
                //popup(currentTabUrl)
                //alert(currentTabUrl + "⚠️");
                block(currentTabUrl);
                //Notification("hi")

                //alert(extract(currentTabUrl));
              } else {
                //alert("The URL is Legitimate");

                currentTabUrl = currentTabUrl + " IS LEGITIMATE";
                //alert(currentTabUrl);
              }
              //alert(message);
            })
            .catch((error) => {
              //alert(error);
            });
        }
      }
    });
  });
});

if (firstexe === false) {
  //alert("false")
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete") {
      let currentTabUrl = "";
      currentTabUrl = tab.url;
      const message = currentTabUrl;

      if (cloud != message) {
        if (isFilePath(message) === false) {
          fetch("http://nafizeahamed.pythonanywhere.com/", {
            method: "POST",
            mode: "no-cors",
            credentials: "include",
            headers: {
              "X-CSRFToken": "123456789asdfghjkl",

              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: message }),
          })
            .then((response) => response.json())
            .then((response) => {
              const x = JSON.stringify(response);
              const k1 = JSON.stringify({ result: "[1]" });

              if (x === k1) {
                currentTabUrl = currentTabUrl + " IS MALICIOUS!!";

                block(currentTabUrl);
                // popup(currentTabUrl)

                //alert(currentTabUrl + "⚠️");
              } else {
                //alert("The URL is Legitimate");

                currentTabUrl = currentTabUrl + " IS LEGITIMATE";
                //alert(currentTabUrl)
              }
              //alert(message);
            })
            .catch((error) => {
              //alert(error);
            });
          //});
        }
      }
    }
  });
}
