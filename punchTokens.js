var inputField = document.getElementById("input-field");
var autocompleteList = document.getElementById("autocomplete-list");
var autocompleteArray = autocompleteList.children;
var tokenList = document.getElementById("token-list");
var tokenArray = tokenList.getElementsByClassName("token");
var skillsList = getSkills();
var highlightIndex = -1;

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
  };

  request.send();
}

function createToken (skill) {
  var token = document.createElement("li");
  var tokenValue = document.createElement("span");
  var x = document.createElement("span");

  tokenValue.innerHTML = skill;
  x.innerHTML = " x ";
  x.setAttribute("class", "token-delete");

  x.onclick = function() {
    deleteToken(token);
  };

  token.setAttribute("class", "token");
  token.appendChild(tokenValue);
  token.appendChild(x);

  return token;
}

function addToken(value) {
  var value = value || autocompleteArray[highlightIndex].innerHTML;

  if (tokenArray.length < 5) {
    var token = createToken(value);
    var lastChild = document.getElementById("last-child");

    tokenList.insertBefore(token, lastChild);
  } else {
    var errorMsg = document.getElementById("error-msg");
    errorMsg.innerHTML = "You can add up to 5 skills.";
  }

  highlightIndex = -1;
  hideAutocomplete();
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

  skill.onmouseover = function() {
    autocompleteArray[highlightIndex].removeAttribute("id");
  };

  skill.onmousedown = function() {
    addToken(value);
    return false;
  };

  autocompleteList.appendChild(skill);
}

function showAutocomplete() {
  autocompleteList.setAttribute("style", "display: block;");
  for (var key in skillsList) {
    addToAutocomplete(skillsList[key].skill);
  }
}

function hideAutocomplete() {
  autocompleteList.innerHTML = "";
  autocompleteList.setAttribute("style", "display: none;");
}

function moveUp() {
  if (highlightIndex > 0) {
    autocompleteArray[highlightIndex].removeAttribute("id");
    autocompleteArray[--highlightIndex].setAttribute("id", "highlight");
  }
}

function moveDown() {
  if (highlightIndex < autocompleteArray.length - 1) {
    autocompleteArray[highlightIndex].removeAttribute("id");
    autocompleteArray[++highlightIndex].setAttribute("id", "highlight");
  }
}

tokenList.onclick = function() {
  inputField.focus();
};

inputField.onfocus = function() {
  inputField.removeAttribute("placeholder");
  inputField.setAttribute("style", "width: auto;");
  showAutocomplete();
  highlightIndex = 0;
  autocompleteArray[highlightIndex].setAttribute("id", "highlight");
};

inputField.onblur = function() {
  hideAutocomplete();
};

inputField.oninput = function() {
  var regExp = new RegExp(inputField.value, "i");

  autocompleteList.innerHTML = "";
  autocompleteList.setAttribute("style", "display: block;");

  for (var key in skillsList) {
    if (skillsList[key].skill.search(regExp) != -1 ) {
      addToAutocomplete(skillsList[key].skill);
    }
  }

  if (autocompleteArray.length !== 0) {
    autocompleteList.firstChild.setAttribute("id", "highlight");
    highlightIndex = 0;
  } else {
    hideAutocomplete();
    highlightIndex = -1;
  }
};

inputField.onkeydown = function(e) {
  e = e || window.event;

  switch (e.keyCode) {
    case 8:
      if (inputField.value === "") {
        deleteToken();
      }
    break;
    case 9:
      if(autocompleteArray.length > 0) {
        addToken();
      } else {
        inputField.value = "";
      }

      return false;
    break;
    case 27:
      autocompleteList.innerHTML = "";
    break;
    case 38:
      moveUp();
    break;
    case 40:
      if(highlightIndex == -1 && inputField.value === "") {
        showAutocomplete();
        highlightIndex = 0;
        autocompleteList.firstChild.setAttribute("id", "highlight");
        break;
      }
      moveDown();
    break;
  }
};

tokens.onsubmit = function() {
  if (highlightIndex > -1) {
    addToken();
  } else {
    var tokenString = "";

    while(tokenArray.length > 0) {
      var first = tokenList.firstElementChild;
      tokenString = tokenString + first.firstChild.innerHTML + ",";
      tokenList.removeChild(first);
    }

    highlightIndex = -1;
    hideAutocomplete();
    inputField.value = "";

    alert("Form submitted with the following values: " + tokenString.slice(0, -1));

    inputField.blur();
  }

  return false;
};
