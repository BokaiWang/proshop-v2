import React, { FC } from "react";
import { Helmet } from "react-helmet-async";

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const Meta: FC<MetaProps> = ({
  title = "Welcome to Proshop",
  description = "We sell the best products for cheap",
  keywords = "electronics, buy electronics, cheap electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

export default Meta;
