tokensList = document.getElementById("tokens-list");
inputField = document.getElementById("input-field");

function createToken (input) {
  token = document.createElement("li");
  token.innerHTML = input;
  token.setAttribute("class", "token");
  return token;
}

function addToken() {
  input = inputField.value;

  if (input != "") {
    token = createToken(input);
    lastChild = document.getElementById("last-child");

    tokensList.insertBefore(token, lastChild);
    inputField.value = "";
  }
}

function deleteToken() {
  lastToken = tokensList.children[tokensList.children.length - 2];
  tokensList.removeChild(lastToken);
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
