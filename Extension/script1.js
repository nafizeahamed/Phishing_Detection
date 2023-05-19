"use strict";

function isFilePath(url) {
  var x = url.slice(0, 4);
  if (x === "http") {
    return false;
  } else {
    return true;
  }
}

// Function to save the checkbox state
function saveCheckboxState(checkboxState) {
  chrome.storage.local.set({ myCheckboxState: checkboxState });
}

// Function to load the checkbox state
function loadCheckboxState(callback) {
  chrome.storage.local.get("myCheckboxState", function (result) {
    callback(result.myCheckboxState);
  });
}

var checkbox = document.getElementById("block");
checkbox.addEventListener("change", function () {
  saveCheckboxState(checkbox.checked);
});

loadCheckboxState(function (state) {
  checkbox.checked = state;

});




function parsing(url) {
  var parser = new URL(url);

  // alert(url)
  const p = document.createElement("p");
  p.innerHTML = "protocol  :" + parser.protocol;
  document.getElementById("p").appendChild(p);

  const q = document.createElement("q");
  q.innerHTML = "host  :" + parser.host;
  document.getElementById("q").appendChild(q);

  const r = document.createElement("r");
  r.innerHTML = "port  :" + parser.port + "\n\n";
  document.getElementById("r").appendChild(r);

  const s = document.createElement("s");
  s.innerHTML = "hostname :" + parser.hostname;
  document.getElementById("s").appendChild(s);

  const t = document.createElement("t");
  t.innerHTML = "search element  :" + parser.search;
  document.getElementById("t").appendChild(t);

  const u = document.createElement("t");
  u.innerHTML = "pathname  :" + parser.pathname;
  document.getElementById("u").appendChild(u);

  const v = document.createElement("v");
  v.innerHTML = "pathname  :" + parser.hash;
  document.getElementById("v").appendChild(v);

  const w = document.createElement("w");
  w.innerHTML = "url  :" + parser.href;
  document.getElementById("w").appendChild(w);

  let y = "";
  fetch(`https://cloudflare-dns.com/dns-query?name=${parser.hostname}&type=A`, {
    headers: {
      accept: "application/dns-json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const ipAddress = data.Answer[0].data;
      y = ipAddress;
      console.log(ipAddress);
      const m = document.createElement("m");
      m.innerHTML = "ip  :" + y;
      document.getElementById("m").appendChild(m);

      fetch(`https://ipapi.co/${ipAddress}/json/`)
        .then((response) => response.json())
        .then((data) => {
          const n = document.createElement("n");
          n.innerHTML = "city  :" + data.city;
          document.getElementById("n").appendChild(n);

          const o = document.createElement("o");
          o.innerHTML = "country  :" + data.country;
          document.getElementById("o").appendChild(o);
        });
    });
}

chrome.tabs.onCreated.addListener(function (tab) {
  //alert("nwe")

  //document.getElementById("url").textContent=0;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentTabUrl = "";
    currentTabUrl = tabs[0].url;
    const message = currentTabUrl;
    parsing(currentTabUrl);
    if (isFilePath(message) === true) {
      //alert("The URL is Legitimate");
      const ele = document.getElementById("body");
      const custom_styles = {
        color: "green",
      };
      Object.assign(ele.style, custom_styles);
      image.src = "Capture12.PNG";
      image.width = "75";
      image.height = "75";
      document.body.appendChild(image);
      currentTabUrl = "this is not a site";
      document.getElementById("url").textContent = currentTabUrl;


      // parsing(x)

    }
    if (isFilePath(message) === false) {
      fetch("https://nafizeahamed.pythonanywhere.com/", {
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
            //alert("The URL is malicious");
            const ele = document.getElementById("body");
            const custom_styles = {
              color: "red",
            };

            Object.assign(ele.style, custom_styles);
            image.src = "Capture13.PNG";
            image.width = "75";
            image.height = "75";
            document.body.appendChild(image);
            x = currentTabUrl;
            currentTabUrl = currentTabUrl + " IS MALICIOUS!!";
            document.getElementById("url").textContent = currentTabUrl;
            // parsing(x);
          } else {
            //alert("The URL is Legitimate");
            const ele = document.getElementById("body");
            const custom_styles = {
              color: "green",
            };
            Object.assign(ele.style, custom_styles);
            image.src = "Capture12.PNG";
            image.width = "75";
            image.height = "75";
            document.body.appendChild(image);
            currentTabUrl = currentTabUrl + " IS LEGITIMATE";
            document.getElementById("url").textContent = currentTabUrl;
            //parsing(x);
          }
          //alert(message);
        })
        .catch((error) => {
          // alert(error);
          currentTabUrl = "SERVER DOWN";
          document.getElementById("url").textContent = currentTabUrl;



        });
    }
  });

});
if (typeof browser === "undefined") {
  var browser = chrome;
}
const image = document.createElement("img");

//document.getElementById("url").textContent=0;
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  let currentTabUrl = "";
  currentTabUrl = tabs[0].url;
  const message = currentTabUrl;
  parsing(currentTabUrl);
  if (isFilePath(message) === true) {
    //alert("The URL is Legitimate");
    const ele = document.getElementById("body");
    const custom_styles = {
      color: "green",
    };
    Object.assign(ele.style, custom_styles);
    image.src = "Capture12.PNG";
    image.width = "75";
    image.height = "75";
    document.body.appendChild(image);
    currentTabUrl = "this is not a site";
    document.getElementById("url").textContent = currentTabUrl;


    // parsing(x)

  }
  if (isFilePath(message) === false) {
    fetch("https://nafizeahamed.pythonanywhere.com/", {
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
          //alert("The URL is malicious");
          const ele = document.getElementById("body");
          const custom_styles = {
            color: "red",
          };

          Object.assign(ele.style, custom_styles);
          image.src = "Capture13.PNG";
          image.width = "75";
          image.height = "75";
          document.body.appendChild(image);

          currentTabUrl = currentTabUrl + " IS MALICIOUS!!";
          document.getElementById("url").textContent = currentTabUrl;
          //parsing(x)

          //alert(extract(currentTabUrl));
        } else {
          //alert("The URL is Legitimate");
          const ele = document.getElementById("body");
          const custom_styles = {
            color: "green",
          };
          Object.assign(ele.style, custom_styles);
          image.src = "Capture12.PNG";
          image.width = "75";
          image.height = "75";
          document.body.appendChild(image);
          currentTabUrl = currentTabUrl + " IS LEGITIMATE";
          document.getElementById("url").textContent = currentTabUrl;
          // parsing(x)
        }
        //alert(message);
      })
      .catch((error) => {
        // alert(error);
        currentTabUrl = "SERVER DOWN";
        document.getElementById("url").textContent = currentTabUrl;
      });
  }
});

