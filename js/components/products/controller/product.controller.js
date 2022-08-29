import Product from "../model/product.model.js";
import { validator } from "../../../validator/validator.js";
import {
  ERROR_DESC,
  ERROR_IMG,
  ERROR_NAME,
  ERROR_PRICE,
} from "../../../constants/constant.js";
export const renderProductList = (productList) => {
  let contentHtml = "";
  for (const [index, item] of productList.entries()) {
    contentHtml += renderProductItem(index, item);
  }
  document.getElementById("productTable").innerHTML = contentHtml;
};

const renderProductItem = (index, data) => {
  return `
            <tr>
                <th>${index + 1}</th>
                <td>${data.name}</td>
                <td>${data.price}</td>
                <td>
                    <img src=${data.image} alt=${data.name}
                    class="img-fluid" style="width: 12rem ; height: 12rem"/>
                </td>
                <td>${data.description}</td>
                <td>
                    <div class="w-100 d-flex flex-column">
                        <button onClick="editProduct(${
                          data.id
                        })" class="btn btn-success" data-bs-toggle="modal"
                        data-bs-target="#productModal">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button onClick="deleteProduct(${
                          data.id
                        })" class="btn btn-danger my-3">
                            <i class="fa fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
};

export const getProductInfo = () => {
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const img = document.getElementById("product-image").value;
  const desc = document.getElementById("product-desc").value;
  return new Product(name, price, img, desc);
};

export const showProductInfo = (product) => {
  document.getElementById("product-name").value = product.name;
  document.getElementById("product-price").value = product.price;
  document.getElementById("product-image").value = product.image;
  document.getElementById("product-desc").value = product.description;
};

export const clearProductInfo = () => {
  document.getElementById("product-name").value = "";
  document.getElementById("product-price").value = "";
  document.getElementById("product-image").value = "";
  document.getElementById("product-desc").value = "";
  ERROR_NAME.style.display = "none";
  ERROR_PRICE.style.display = "none";
  ERROR_IMG.style.display = "none";
  ERROR_DESC.style.display = "none";
};

export const validateInput = (item) => {
  const isValidName = validator.checkEmptyString(
    item.name,
    ERROR_NAME,
    "Không được rỗng"
  );
  const isValidPrice =
    validator.checkEmptyString(item.price, ERROR_PRICE, "Không được rỗng") &&
    validator.checkNumber(item.price * 1, ERROR_PRICE, "Phải là số");
  const isValidImage =
    validator.checkEmptyString(item.image, ERROR_IMG, "Không được rỗng") &&
    validator.checkImage(item.image, ERROR_IMG, "Phải là đuôi .png, .jpg,...");
  const isValidDesc = validator.checkEmptyString(
    item.description,
    ERROR_DESC,
    "Không được rỗng"
  );

  return isValidName && isValidPrice && isValidImage && isValidDesc;
};
