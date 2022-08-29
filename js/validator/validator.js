export const validator = {
  checkEmptyString: function (value, errorId, message) {
    if (value.length == 0) {
      errorId.innerText = message;
      errorId.style.display = "flex";
      errorId.style.color = "#dc3545";
      return false;
    } else {
      errorId.innerText = "Hợp lệ";
      errorId.style.display = "flex";
      errorId.style.color = "#198754";
      return true;
    }
  },
  checkNumber: function (value, errorId, message) {
    const regexNumber = /^[0-9]*$/;
    if (regexNumber.test(value)) {
      errorId.innerText = "Hợp lệ";
      errorId.style.display = "flex";
      errorId.style.color = "#198754";
      return true;
    } else {
      errorId.innerText = message;
      errorId.style.display = "flex";
      errorId.style.color = "#dc3545";
      return false;
    }
  },
  checkImage: function (value, errorId, message) {
    const regexImg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
    if (regexImg.test(value)) {
      errorId.innerText = "Hợp lệ";
      errorId.style.display = "flex";
      errorId.style.color = "#198754";
      return true;
    } else {
      errorId.innerText = message;
      errorId.style.display = "flex";
      errorId.style.color = "#dc3545";
      return false;
    }
  },
};
