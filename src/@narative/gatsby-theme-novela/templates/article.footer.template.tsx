import React from "react";

import Subscription from "@components/Subscription";

import { Template } from "@types";


const ArticleFooter: Template = ({ pageContext }) => {
  const { article, mailchimp } = pageContext;

  /**
   * Fix contentful and mailchimp
   * **/
  return (
    <>
      {mailchimp && <Subscription />}
    </>
  );
};

export default ArticleFooter;
