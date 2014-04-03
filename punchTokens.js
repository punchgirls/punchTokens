function createToken (input) {
  token = document.createElement("li");
  token.innerHTML = input;

  return token;
}

function addToken() {
  inputField = document.getElementById("input-field");
  token = createToken(inputField.value);
  tokensList = document.getElementById("tokens-list");
  lastChild = document.getElementById("last-child");

  tokensList.insertBefore(token, lastChild);
}

tokens.onsubmit = function() {
  addToken();
  return false;
}
