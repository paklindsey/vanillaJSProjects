// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const grocery = document.getElementById("grocery");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****************************************************** EVENT LISTENERS **********
//submit form
form.addEventListener("submit", addItem);

//clear button
clearBtn.addEventListener("click", clearItems);

// ********************************************************** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    const element = document.createElement("article");
    // add class
    element.classList.add("grocery-item");
    //add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<article class="grocery-item">
            <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </article>`;

    // **adding these here because they are not available on window load
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    //apend child
    list.appendChild(element);
    //display alet
    displayAlert("item added to list", "sucess");
    //show container
    container.classList.add("show-container");
    //add to localstorage
    addToLocalStorage(id, value);
    //edit function
    function editItem() {
      console.log("item edited");
    }
    // delete function
    function deleteItem(e) {}
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    console.log("editing");
  } else {
    displayAlert("please enter value", "danger");
  }
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 2000);
}

// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  console.log("items", items);
  console.log(items);
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }

  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  // ** want to set back to default because
  setBackToDefault();
  localStorage.removeItem("list");
}

// set back to dafault

function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}
// ********************************************************** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  console.log("added to local storage");
}

// ************************************************************* SETUP ITEMS **********
