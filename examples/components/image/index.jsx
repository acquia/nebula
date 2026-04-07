import { Image as ResponsiveImage } from 'drupal-canvas';

const Image = ({ image }) => {
  if (!image?.src) {
    return null;
  }

  const { src, alt, width, height } = image;

  return (
    <ResponsiveImage
      {...{ src, alt, width, height }}
      className="my-8 max-w-full"
    />
  );
};

export default Image;
