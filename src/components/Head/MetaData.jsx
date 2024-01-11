import Head from "next/head";
import React from "react";

const MetaData = ({
  title,
  keywordContent,
  imageContent,
  urlContent,
  titleContent,
  descriptionContent,
  siteNameContent,
  typeContent,
  localeContent,
}) => {
  return (
    <Head>
      <title>{title?.length > 0 ? title : "Car Care Solutions"}</title>
      <meta
        name="description"
        content={
          descriptionContent?.length > 0
            ? descriptionContent
            : "Car, Service, Care, Solution, Wash, Repair"
        }
      />
      <meta
        name="keywords"
        content={
          keywordContent?.length > 0
            ? keywordContent
            : "car service,car care,car wash,car solution,car repair,car remake,car,wash,service"
        }
      />
      <meta
        property="og:image"
        content={
          imageContent?.length > 0
            ? imageContent
            : "https://i.ibb.co/KLk2TxX/car-service-logo.png"
        }
      />
      <meta
        property="og:url"
        content={
          urlContent?.length > 0
            ? urlContent
            : "https://i.ibb.co/RP0Tpk5/about-2.png"
        }
      />
      <meta
        property="og:title"
        content={
          titleContent?.title > 0
            ? titleContent
            : "Car Service - Car Care Solutions"
        }
      />
      <meta
        property="og:description"
        content={
          descriptionContent?.length > 0
            ? descriptionContent
            : "Quality repairs that you can trust every time means that you can rely on the repair services to fix your vehicle correctly, Efficiently, and safely."
        }
      />
      <meta
        property="og:site_name"
        content={
          siteNameContent?.length > 0 ? siteNameContent : "Car Care Solutions"
        }
      />
      <meta
        property="og:type"
        content={typeContent?.length > 0 ? typeContent : "website"}
      />
      <meta
        property="og:locale"
        content={localeContent?.length > 0 ? localeContent : "en_US"}
      />
    </Head>
  );
};

export default MetaData;
