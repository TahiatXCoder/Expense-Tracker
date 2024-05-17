// Load data from localStorage if available
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("budgetAppData")) {
    const data = JSON.parse(localStorage.getItem("budgetAppData"));
    tempAmount = data.tempAmount;
    expenditureValue.innerText = data.expenditureValue;
    balanceValue.innerText = data.balanceValue;
    list.innerHTML = data.listHTML;
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
