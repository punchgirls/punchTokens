var tokensList = document.getElementById("tokens-list");
var inputField = document.getElementById("input-field");

function createToken (input) {
  var token = document.createElement("li");
  token.innerHTML = input;
  token.setAttribute("class", "token");

  var x = document.createElement("span");
  x.innerHTML = " x ";

  x.onclick = function() {
    deleteToken(token);
  }

  token.appendChild(x);

  return token;
}

function addToken() {
  var input = inputField.value;

  if (input != "") {
    var token = createToken(input);
    lastChild = document.getElementById("last-child");

    tokensList.insertBefore(token, lastChild);
    inputField.value = "";
  }
}

function deleteToken(token) {
  var tokenArray = tokensList.children;
  var token = token || tokenArray[tokenArray.length - 2];

  if (tokenArray.length > 1) {
    tokensList.removeChild(token);
  }
}

inputField.onkeydown = function(e) {
  e = e || window.event;

  switch (e.keyCode) {
    case 8:
      if (inputField.value == "") {
        deleteToken();
      }
    break;
  }
}

tokens.onsubmit = function() {
  if (inputField.value != "") {
    addToken();
  } else {
   alert("Form submitted!");
  }

  return false;
};
