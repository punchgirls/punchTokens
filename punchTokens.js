var inputField = document.getElementById("input-field");
var autocompleteList = document.getElementById("autocomplete-list");
var autocompleteArray = autocompleteList.children;
var tokenList = document.getElementById("tokens-list");
var tokenArray = tokenList.getElementsByClassName("token");
var skillsList = getSkills();
var index = -1;

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
  var token = createToken(autocompleteArray[index].innerHTML);
  lastChild = document.getElementById("last-child");

  tokenList.insertBefore(token, lastChild);
  inputField.value = "";
}

function deleteToken(token) {
  var tokenArray = tokenList.children;
  var token = token || tokenArray[tokenArray.length - 2];

  if (tokenArray.length > 1) {
    tokenList.removeChild(token);
  }
}

function addToAutocomplete(value) {
  var skill = document.createElement("li");
  skill.innerHTML = value;
  autocompleteList.appendChild(skill);
}

function emptyAutocomplete() {
  for(var i = autocompleteArray.length - 1; i > -1; i--) {
    autocompleteList.removeChild(autocompleteArray[i]);
  }
}

function showAutocomplete() {
  for (var key in skillsList) {
    addToAutocomplete(skillsList[key].skill);
  }
}

function moveUp() {
  if (index > 0) {
    autocompleteArray[index].removeAttribute("id");
    autocompleteArray[--index].setAttribute("id", "highlight");
  }
}

function moveDown() {
  if (index < autocompleteArray.length - 1) {
    autocompleteArray[index].removeAttribute("id");
    autocompleteArray[++index].setAttribute("id", "highlight");
  }
}

inputField.onfocus = function() {
  showAutocomplete();
  autocompleteArray[++index].setAttribute("id", "highlight");
};

inputField.onblur = function() {
  emptyAutocomplete();
};

inputField.oninput = function() {
  var regExp = new RegExp(inputField.value, "i");

  emptyAutocomplete();

  for (var key in skillsList) {
    if (skillsList[key].skill.search(regExp) != -1 ) {
      addToAutocomplete(skillsList[key].skill);
    }
  }

  if (autocompleteList.children.length != 0) {
    autocompleteList.firstChild.setAttribute("id", "highlight");
    index = 0;
  } else {
    index = -1;
  }
};

inputField.onkeydown = function(e) {
  e = e || window.event;

  switch (e.keyCode) {
    case 8:
      if (inputField.value == "") {
        deleteToken();
      }
    break;
    case 27:
      emptyAutocomplete();
    break;
    case 38:
      moveUp();
    break;
    case 40:
      if(index == -1 && inputField.value == "") {
        showAutocomplete();
        index = 0;
        autocompleteList.firstChild.setAttribute("id", "highlight");
        break;
      }
      moveDown();
    break;
  }
};

tokens.onsubmit = function() {
  if (index > -1) {
    if (tokenArray.length < 5) {
      addToken();
      emptyAutocomplete();
      index = -1;
    } else {
      var errorMsg = document.getElementById("error-msg");
      errorMsg.innerHTML = "You can add up to 5 skills.";
      emptyAutocomplete();
      index = -1;
    }
  } else {
    var tokenString = "";

    for (var i = 0; i < tokenArray.length; i++) {
      tokenString = tokenString + tokenArray[i].firstChild.innerHTML + ",";
    }

    alert("Form submitted with the following values: " + tokenString);
  }

  return false;
};
