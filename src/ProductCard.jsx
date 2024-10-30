import placeholder from './assets/placeholder.png';

function ProductCard({ name, description }) {
  return (
    <li className="productCard">
      <div className="productPreview">
        <img src={placeholder} alt="" />
      </div>
      <div className="productCopy">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className="productButtons">
        <button disabled={true}>Details</button>
        <button>Add</button>
      </div>
    </li>
  );
}

export default ProductCard;
