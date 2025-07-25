function ProductCard({ baseName, baseDescription }) {
  return (
    <li>
      <div className="itemCard">
        <h2>{baseName}</h2>
        <p>{baseDescription}</p>
        <button onClick={() => handleAddItemToCart(cartItemId)}>
          Add to Cart
        </button>
      </div>
    </li>
  );
}

export default ProductCard;
