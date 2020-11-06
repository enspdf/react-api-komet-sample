import { useState } from "react";

const Manage = (props) => {

  const {initialValues, product, setProduct, setIsOpen, getProducts} = props;
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCancel = () => {
    setIsOpen(false);
    setProduct(initialValues);
  }

  const handleChange = (e)  => setProduct({...product,[e.target.name]:e.target.value});
  
  const handleUpdate = () => {
    setIsLoading(true);
    const { _id:id, name, description, price } = product;
    fetch(`https://nodejs-komet-api.herokuapp.com/api/product/${id}`,{
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({name, description, price })
  })
      .then((res) => res.json())
      .then(({ success, product }) => {
        setProduct(product);
        setIsSuccess(true);
        getProducts();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSuccess(false);
        setIsLoading(false);
      });
  }
  
  const handleSave = () => {
    setIsLoading(true);
    const { name, description, price } = product;
    fetch(`https://nodejs-komet-api.herokuapp.com/api/product/`,{
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, description, price })
  })
      .then((res) => res.json())
      .then(({ success }) => {
        setProduct(initialValues);
        setIsSuccess(true);
        setIsOpen(false);
        getProducts();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsSuccess(false);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="section-form">
      <h2 className="title"> { product?._id ? "Edit" : "Add" } Product</h2>
      <form >
        <div className="form-item"> 
              <label>Product Name:</label>
              <input onChange={handleChange} type="text" value={product?.name} name="name"/>
        </div>
        <div className="form-item"> 
              <label>Product Price:</label>
              <input onChange={handleChange} type="text" value={product?.price} name="price"/>
        </div>
        <div className="form-item"> 
            <label>Product Description:</label>
            <textarea onChange={handleChange} name="description"value={product?.description} ></textarea>
        </div>
        <div className="form-actions"> 
            {  
            product?._id ?
            <button type="button" onClick = {handleUpdate} >Update</button> : 
            <button type="button" onClick = {handleSave} >Save</button>
            }
           
            <button type="button" onClick = {handleCancel} >Cancel</button>
        </div>
      </form>
      </div>
    </>
  );
}

export default Manage;
