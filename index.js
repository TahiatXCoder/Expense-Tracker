// Load data from localStorage if available
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("budgetAppData")) {
    const data = JSON.parse(localStorage.getItem("budgetAppData"));
    tempAmount = data.tempAmount;
    expenditureValue.textContent = data.expenditureValue;
    balanceValue.textContent = data.balanceValue;
    list.innerHTML = data.listHTML;
    bindEditDeleteEvents(); // Re-bind edit/delete event listeners
  }
  // Set initial state if no saved data is available
  else {
    tempAmount = 0;
    expenditureValue.textContent = "0";
    balanceValue.textContent = "0";
  }
});

//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((button) => {
    button.disabled = bool;
  });
};

//Function To Modify List Elements
// Function to modify list elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.closest(".sublist-content");
  let parentDiv = element.parentElement.parentElement;
  let parentAmount = parentDiv.querySelector(".amount").textContent;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").textContent;
@@ -59,33 +33,3 @@ const bindEditDeleteEvents = () => {
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
  editButton.classList.add("edit");
  editButton.textContent = "Edit";
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete";
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  bindEditDeleteEvents(); // Bind edit/delete events for the new item
  // Save data to localStorage
  saveDataToLocalStorage();
};

// Function to save data to localStorage
const saveDataToLocalStorage = () => {
  const data = {
    tempAmount: tempAmount,
    expenditureValue: expenditureValue.textContent,
    balanceValue: balanceValue.textContent,
    listHTML: list.innerHTML
  };
  localStorage.setItem("budgetAppData", JSON.stringify(data));
};
