import { useState } from 'react';
import Alert from './components/alert';
import './App.css';
import Form from './components/form';
import ProductContainer from './components/productContainer';

function App() {
  const getProducts = function () {
    const pro = JSON.parse(localStorage.getItem('products'));
    if (!pro) return [];
    return pro;
  };

  const [products, setProducts] = useState(getProducts());
  const [displayedProducts, setDisplayedProducts] = useState(getProducts());
  const [updatedProductIndex, setUpdatedProductIndex] = useState(-1);

  const setData = function (products) {
    setProducts(products);
    setDisplayedProducts(products);
    localStorage.setItem('products', JSON.stringify(products));
  };

  return (
    <div className="App">
      <div className="circle"></div>
      <Form
        products={products}
        updatedProductIndex={updatedProductIndex}
        setUpdatedProductIndex={setUpdatedProductIndex}
        setData={setData}
      />
      {!products || !products.length ? (
        <Alert />
      ) : (
        <ProductContainer
          products={products}
          updatedProductIndex={updatedProductIndex}
          setUpdatedProductIndex={setUpdatedProductIndex}
          displayedProducts={displayedProducts}
          setDisplayedProducts={setDisplayedProducts}
          setData={setData}
        />
      )}
    </div>
  );
}

export default App;
