//with destructuring
function ProductList({ inventory = [] }) {
  //destructuring assignment grabs `inventory` out of props
  //we're also setting a default value og `inventory` to an empty array
  return (
    <ul>
      {inventory.map((item) => {
        return <li key={item.id}>{item.baseName}</li>;
      })}
    </ul>
  );
}
