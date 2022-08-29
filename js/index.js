import {
  clearProductInfo,
  getProductInfo,
  renderProductList,
  showProductInfo,
  validateInput,
} from "./components/products/controller/product.controller.js";
import {
  BASE_URL,
  ADD_BTN,
  TOGGLE_PRODUCT_MODAL,
  CLOSE_BTN,
} from "./constants/constant.js";
// GLOBAL VARIABLES
let isEdited = false;
let editId = "";
const productsList = await getProductsList();
// HANDLE PRODUCTS LIST
async function getProductsList() {
  const response = await axios.get(`${BASE_URL}/mobiles`);
  return response.data;
}
const addProduct = async () => {
  const product = getProductInfo();
  const isValid = validateInput(product);
  if (isValid == true) {
    await axios.post(`${BASE_URL}/mobiles`, { ...product });
    renderProductList(await getProductsList());
    setTimeout(() => {
      clearProductInfo();
    }, 1500);
  }
};
const editProduct = async (product_id) => {
  isEdited = true;
  ADD_BTN.innerHTML = "Update";
  const product = await axios.get(`${BASE_URL}/mobiles/${product_id}`);
  showProductInfo(product.data);
  editId = product_id;
};
const updateProduct = async () => {
  const product = getProductInfo();
  const isValid = validateInput(product);
  if (isValid == true) {
    await axios.put(`${BASE_URL}/mobiles/${editId}`, { ...product });
    renderProductList(await getProductsList());
    setTimeout(() => {
      clearProductInfo();
    }, 1500);
  }
};
const deleteProduct = async (product_id) => {
  await axios.delete(`${BASE_URL}/mobiles/${product_id}`);
  renderProductList(await getProductsList());
};
//INITIALIZE
const initialize = () => {
  renderProductList(productsList);
  ADD_BTN.addEventListener("click", () => {
    if (isEdited == false) addProduct();
    else {
      updateProduct();
      isEdited = false;
    }
  });
  TOGGLE_PRODUCT_MODAL.addEventListener("click", () => {
    clearProductInfo();
    ADD_BTN.innerHTML = "Thêm Sản Phẩm";
    isEdited = false;
  });
  CLOSE_BTN.addEventListener("click", () => {
    clearProductInfo;
    ADD_BTN.innerHTML = "Thêm Sản Phẩm";
    isEdited = false;
  });
  window.editProduct = editProduct;
  window.deleteProduct = deleteProduct;
};
initialize();
