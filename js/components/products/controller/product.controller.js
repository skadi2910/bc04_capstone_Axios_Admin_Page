import Product from "../model/product.model.js";

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
                    <img src=${data.image} alt="${data.name}"
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
};
