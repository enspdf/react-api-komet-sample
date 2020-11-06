import { useState, useEffect } from "react";
import Manage from "./Manage";
import "../App.css";

const initialValues = { name:"", description:"", price:"" }

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(initialValues);
  const [isOpen, setIsOpen] = useState(false);

  const getProducts = () => {
    setIsLoading(true);
    fetch("https://nodejs-komet-api.herokuapp.com/api/product")
      .then((res) => res.json())
      .then(({ success, products }) => {
        setProducts(products);
        setIsSuccess(success);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAdd = () => {
    setProduct(initialValues);
    setIsOpen(true);
  };

  const handleEdit = (data) => {
    setProduct(data);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    fetch(`https://nodejs-komet-api.herokuapp.com/api/product/${id}`,{
    method: "delete"})
      .then((res) => res.json())
      .then(({ success }) => {
      
        if(success){
          setProduct(initialValues);
          setIsSuccess(true);
          getProducts();
        }
        
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSuccess(false);
        setIsLoading(false);
      });
  }

  return (
    <div className="App">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <section>
          <div className="panel-left">
            <a className="btn" href="#!" onClick={() => handleAdd()}>
              Add Product
            </a>
            <table className="styled-table">
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
                {products?.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td style={{ width:140 }}>
                      <a
                        href="#!"
                        className="btn-line"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </a>
                      <a
                        href="#!"
                        className="btn-line"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </a>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="panel-right">
            {isOpen && (
              <Manage
                product={product}
                setProduct={setProduct}
                initialValues={initialValues}
                setIsOpen={setIsOpen}
                getProducts={getProducts}
              />
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default Product;
