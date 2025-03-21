import Heading from "./heading";

const PageTitle = ({ title }) => {
  return <Heading heading={title} headingElement="h1" />;
};

PageTitle.displayName = "PageTitle";
export default PageTitle;
