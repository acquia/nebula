/* eslint-disable-next-line no-unused-vars */
const Branding = ({ homeUrl, logo, siteName, siteSlogan }) => {
  return (
    <>
      {logo && (
        <a aria-label={siteName} className="max-h-full" href={homeUrl}>
          <img alt="" className="max-h-full" fetchPriority="high" src={logo} />
        </a>
      )}
    </>
  )
}

export default Branding
