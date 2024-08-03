import { buildTimeValue } from "@testing-library/user-event/dist/utils";
import { useState } from "react";

function ProductContainer({
  setProduct,
  products,
  updatedProduct,
  setUpdatedProduct,
  displayedProducts,
  setDisplayedProducts,
  setData,
}) {
  const isAddState = () => updatedProduct === -1;

  const getColor = function (index) {
    if (updatedProduct == index) return "primary-subtle";
    else if (index % 2 !== 0) return "body-secondary";
    return "transparent";
  };

  const renderProducts = function () {
    return displayedProducts.map((product, i) => (
      <tr key={i} className={`border-bottom bg-${getColor(i)}`} data-index={i}>
        <td>{i + 1}</td>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>${product.price}</td>
        <td>{product.description}</td>
        <td>
          <button
            type="button"
            className="update-button btn btn-outline-success"
            disabled={!isAddState()}
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
        <td>
          <button
            type="button"
            className="delete-button btn btn-outline-danger"
            disabled={!isAddState()}
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    ));
  };

  const deleteProduct = function (index) {
    products.splice(index, 1);
    // setProducts(products); ==> Wrong! you should create new array.
    setData([...products]);
  };

  const updateProduct = function (index) {
    setProduct({
      index: index,
      name: products[index].name,
      price: products[index].price,
      category: products[index].category,
      description: products[index].description,
    });
    setUpdatedProduct(index);
  };

  const handle = async function (e) {
    const btn = e.target.closest(".btn");

    if (!btn) return;

    const index = btn.closest("tr").dataset.index;

    if (btn.classList.contains("update-button")) {
      btn.closest("tr").classList.add("bg-primary-subtle");
      updateProduct(index);
      return;
    }

    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (willDelete) {
      deleteProduct(index);
      swal({
        title: "Deleted",
        icon: "success",
        button: "Ok",
      });
    }
  };

  const searchProduct = function (e) {
    const value = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().startsWith(value)
    );
    setDisplayedProducts(filteredProducts);
  };

  return (
    <>
      <div className="my-5 w-50 mx-auto">
        <input
          type="text"
          className="form-control"
          id="search"
          placeholder="Search....."
          onChange={searchProduct}
        />
      </div>

      <table className="w-75 mx-auto bg-light-subtle mb-5">
        <thead className="border-2 border-top-0 border-start-0 border-end-0 border-dark">
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody onClick={handle}>{renderProducts()}</tbody>
      </table>
    </>
  );
}

export default ProductContainer;
