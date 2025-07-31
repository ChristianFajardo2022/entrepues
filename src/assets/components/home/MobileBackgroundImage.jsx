const MobileBackgroundImage = ({ src, alt }) => (
  <img
    className="block md:hidden absolute top-0 left-0 w-full h-full object-cover"
    src={src}
    alt={alt}
  />
);

export default MobileBackgroundImage;
