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
  const setData = function (products) {
    setProducts(products);
    setDisplayedProducts(products);
    localStorage.setItem('products', JSON.stringify(products));
  };
  const [products, setProducts] = useState(getProducts());
  const [displayedProducts, setDisplayedProducts] = useState(getProducts());
  const [updatedProduct, setUpdatedProduct] = useState(-1);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  });

  return (
    <div className="App">
      <div className="circle"></div>
      <Form
        product={product}
        setProduct={setProduct}
        products={products}
        updatedProduct={updatedProduct}
        setUpdatedProduct={setUpdatedProduct}
        setData={setData}
      />
      {!products || !products.length ? (
        <Alert />
      ) : (
        <ProductContainer
          setProduct={setProduct}
          products={products}
          updatedProduct={updatedProduct}
          setUpdatedProduct={setUpdatedProduct}
          displayedProducts={displayedProducts}
          setDisplayedProducts={setDisplayedProducts}
          setData={setData}
        />
      )}
    </div>
  );
}

export default App;
