/* eslint-disable-next-line no-unused-vars */
const Branding = ({ homeUrl, logo, siteName, siteSlogan }) => {
  return (
    <>
      {logo && (
        <a href={homeUrl} aria-label={siteName} className="max-h-full">
          <img src={logo} alt="" fetchPriority="high" className="max-h-full" />
        </a>
      )}
    </>
  );
};

export default Branding;
