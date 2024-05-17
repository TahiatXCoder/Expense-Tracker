// Load data from localStorage if available
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("budgetAppData")) {
    const data = JSON.parse(localStorage.getItem("budgetAppData"));
    tempAmount = data.tempAmount;
    expenditureValue.innerText = data.expenditureValue;
    balanceValue.innerText = data.balanceValue;
    list.innerHTML = data.listHTML;
    bindEditDeleteEvents(); // Re-bind edit/delete event listeners
  }
  // Set initial state if no saved data is available
  else {
    tempAmount = 0;
    expenditureValue.innerText = 0;
    balanceValue.innerText = 0;
  }
});

//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement.parentElement;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  // Update balance on edit/delete
  balanceValue.innerText = parseInt(balanceValue.innerText) + parseInt(parentAmount);
  expenditureValue.innerText = parseInt(expenditureValue.innerText) - parseInt(parentAmount);
  parentDiv.remove();
  // Save data to localStorage
  saveDataToLocalStorage();
};

// Function to bind edit/delete events
const bindEditDeleteEvents = () => {
  let editButtons = document.querySelectorAll(".edit");
  let deleteButtons = document.querySelectorAll(".delete");
  
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modifyElement(button, true);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modifyElement(button);
    });
  });
};

//Function To Create List
const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
  bindEditDeleteEvents(); // Bind edit/delete events for the new item
  // Save data to localStorage
  saveDataToLocalStorage();
};
