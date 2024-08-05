import { useEffect, useState } from 'react';

function Form({
  products,
  updatedProductIndex,
  setUpdatedProductIndex,
  setData,
}) {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  });

  useEffect(
    function () {
      if (updatedProductIndex != -1) {
        setProduct({
          name: products[updatedProductIndex].name,
          price: products[updatedProductIndex].price,
          category: products[updatedProductIndex].category,
          description: products[updatedProductIndex].description,
        });
      }
    },
    [updatedProductIndex]
  );

  const isAddState = () => updatedProductIndex === -1;

  const isInputEmpty = () =>
    Object.entries(product).some(([_, value]) => value.trim() == '');

  const clearInputs = function () {
    setProduct({
      name: '',
      category: '',
      price: '',
      description: '',
    });
  };

  const addProduct = function (e) {
    e.preventDefault();

    if (isInputEmpty()) {
      swal('Warning!', 'Fill the empty fields', 'warning');
      return;
    }

    setData([...products, product]);
    clearInputs();
  };

  const updateProduct = function (e) {
    e.preventDefault();

    const { name, price, category, description } = product;
    products[updatedProductIndex] = {
      name: name,
      category: price,
      price: category,
      description: description,
    };

    setData([...products]);
    setUpdatedProductIndex(-1);
    clearInputs();
  };

  const handleChange = function (e) {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    // console.log(product);
  };

  return (
    <div>
      <div className="form-contianer bg-light-subtle w-75 mx-auto rounded-1 p-5 my-5 shadow">
        <form onSubmit={isAddState() ? addProduct : updateProduct}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Product Category
            </label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Product Price
            </label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Product Description
            </label>
            <textarea
              className="form-control"
              rows={3}
              defaultValue={''}
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="add-update btn btn-primary me-3">
            {isAddState() ? 'Add' : 'Update'}
          </button>
          <button
            type="button"
            className="clear btn btn-primary"
            onClick={clearInputs}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
