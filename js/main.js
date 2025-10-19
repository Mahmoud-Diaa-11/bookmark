var nameInput = document.getElementById("NameInput");
var urlInput = document.getElementById("urlInput");
var submitBtn = document.getElementById("submitBtn");
var tBody = document.getElementById("tBody");
var visitBtn = document.getElementById("visitBtn");
var validateMsg = document.getElementById("validateMsg");
var closeBtn = document.getElementById("closeBtn");
var bookmarkList = [];
if (localStorage.getItem("infoContainer")) {
  bookmarkList = JSON.parse(localStorage.getItem("infoContainer"));
  displaySite();
}

//Add Data
function addSite() {
  if (validateInputs(nameInput) && validateInputs(urlInput)) {
    site = {
      name: nameInput.value,
      url: `https://www.${urlInput.value}`,
    };
    bookmarkList.push(site);
    localStorage.setItem("infoContainer", JSON.stringify(bookmarkList));
    displaySite();
    clearInputs();
    clearValidation();
  } else {
    validateMsg.classList.add("d-block");
    validateMsg.classList.remove("d-none");
  }
}

// Clear Inputs
function clearInputs() {
  nameInput.value = null;
  urlInput.value = null;
}

//Display Data
function displaySite() {
  var box = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    box += `  <tr class="border-top">
              <td class="p-3">${i + 1}</td>
              <td class="p-3">${bookmarkList[i].name}</td>
              <td class="p-3"d>
               <a href="${
                 bookmarkList[i].url
               }" target="_blank">  <button id="visitBtn" class="btn">
               
                  <i class="fa-solid fa-eye pe-2"></i> Visit
                </button></a>
              </td>
              <td class="p-3">
                <button onclick ='deleteSite(${i})' id="deleteBtn" class="btn btn-danger">
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
              </td>
            </tr>`;
  }
  tBody.innerHTML = box;
}

//Delete Data
function deleteSite(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("infoContainer", JSON.stringify(bookmarkList));
  displaySite();
}

//validation
function validateInputs(element) {
  var value = element.value;
  var id = element.id;

  regex = {
    NameInput: /^[A-Za-z]{3,9}$/i,
    urlInput: /^(https:\/\/www\.)?[A-Za-z]{1,}.com$/i,
  };
  if (regex[id].test(value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}
//Clear Validation
function clearValidation() {
  nameInput.classList.remove("is-valid");
  urlInput.classList.remove("is-valid");
  nameInput.classList.remove("is-invalid");
  urlInput.classList.remove("is-invalid");
}
// close validation message
function closeVAlidationMsg() {
  validateMsg.classList.add("d-none");
}
document.addEventListener("click", function (e) {
  if (e.target === validateMsg) {
    closeVAlidationMsg();
  }
});
