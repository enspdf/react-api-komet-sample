import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);

  const getProducts = () => {
    fetch("https://nodejs-komet-api.herokuapp.com/api/product")
      .then(res => res.json())
      .then(({ success, products }) => {
        setProducts(products);
        setIsSuccess(success);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <a onClick={() => console.log(product)}>Edit</a>
                <a onClick={() => console.log(product._id)}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
