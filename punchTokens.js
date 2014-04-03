function createToken (input) {
  token = document.createElement("li");
  token.innerHTML = input;
  token.setAttribute("class", "token");
  return token;
}

function addToken() {
  inputField = document.getElementById("input-field");
  input = inputField.value;

  if (input != "") {
    token = createToken(input);
    tokensList = document.getElementById("tokens-list");
    lastChild = document.getElementById("last-child");

    tokensList.insertBefore(token, lastChild);
    inputField.value = "";
  }
}

tokens.onsubmit = function() {
  if (document.getElementById("input-field").value != "") {
    addToken();
  } else {
   alert("Form submitted!");
  }

  return false;
};
