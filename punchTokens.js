function addToken() {
  input = document.getElementById("input").value;
  alert(input);
}

tokens.onsubmit = function() {
  addToken();
  return false;
}
