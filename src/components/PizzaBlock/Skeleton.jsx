import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="137" cy="133" r="126" />
    <rect x="8" y="281" rx="6" ry="6" width="264" height="26" />
    <rect x="9" y="321" rx="5" ry="5" width="263" height="75" />
    <rect x="-201" y="509" rx="5" ry="5" width="61" height="22" />
    <rect x="145" y="407" rx="13" ry="13" width="127" height="47" />
    <rect x="9" y="413" rx="8" ry="8" width="81" height="35" />
  </ContentLoader>
);

export default Skeleton;
