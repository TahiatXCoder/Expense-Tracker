// Function to modify list elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement.parentElement;
  let parentAmount = parentDiv.querySelector(".amount").textContent;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").textContent;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  // Update balance on edit/delete
  balanceValue.textContent = parseInt(balanceValue.textContent) + parseInt(parentAmount);
  expenditureValue.textContent = parseInt(expenditureValue.textContent) - parseInt(parentAmount);
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
