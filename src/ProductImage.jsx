import placeholder from './assets/placeholder.png';

export default function ProductImage({ src, alt, ...props }) {
  const isValidSrc = src && !src.includes('undefined');
  const imageSrc = isValidSrc ? src : placeholder;
  const imageAlt = alt || 'Product image';

  return <img src={imageSrc} alt={imageAlt} {...props} />;
}
