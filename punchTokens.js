var tokensList = document.getElementById("tokens-list");
var inputField = document.getElementById("input-field");
var autocompleteList = document.getElementById("autocomplete-list");
var skillsList = getSkills();
var highlightedSkillIndex = 0;


function getSkills() {
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }

  request.open("GET", "/skills.json");

  request.onreadystatechange = function() {
    if ((request.readyState===4) && (request.status===200)) {
      skillsList = JSON.parse(request.responseText);
    }
  }

  request.send();
}

function createToken (input) {
  var token = document.createElement("li");
  var tokenValue = document.createElement("span");
  var x = document.createElement("span");

  tokenValue.innerHTML = input;
  x.innerHTML = " x ";

  x.onclick = function() {
    deleteToken(token);
  };

  token.setAttribute("class", "token");
  token.appendChild(tokenValue);
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
  var tokensArray = tokensList.children;
  var token = token || tokensArray[tokensArray.length - 2];

  if (tokensArray.length > 1) {
    tokensList.removeChild(token);
  }
}

function emptyAutocompleteList() {
  var array = autocompleteList.children;

  for(var i = array.length - 1; i > -1; i--) {
    autocompleteList.removeChild(array[i]);
  }
}

inputField.onfocus = function() {
  for (var key in skillsList) {
    var skill = document.createElement("li");
    skill.innerHTML = skillsList[key].skill;
    autocompleteList.appendChild(skill);
  }

  autocompleteList.firstChild.setAttribute("id", "highlight");
};

inputField.onblur = function() {
  emptyAutocompleteList();
};

function moveDown() {
  autocompleteArray = autocompleteList.children;

  if (highlightedSkillIndex < autocompleteArray.length - 1) {
    autocompleteArray[highlightedSkillIndex].removeAttribute("id");
    autocompleteArray[++highlightedSkillIndex].setAttribute("id", "highlight");
    console.log("lengde: " + autocompleteArray.length + " index: " + highlightedSkillIndex);
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
    case 27:
      emptyAutocompleteList();
    break;
    case 40:
      moveDown();
    break;
  }
};

tokens.onsubmit = function() {
  if (inputField.value != "") {
    addToken();
  } else {
    var tokenArray = tokensList.getElementsByClassName("token");
    var tokenString = "";

    for (var i = 0; i < tokenArray.length; i++) {
      tokenString = tokenString + tokenArray[i].firstChild.innerHTML + ",";
    }

    alert("Form submitted with the following values: " + tokenString);
  }

  return false;
};
