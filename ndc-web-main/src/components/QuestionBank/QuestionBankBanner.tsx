import React from "react";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";

const QuestionBankBanner = ({ data }: any) => {
  const title = data?.title || "Question Bank";
  const image = data?.image || "/images/question-bank/banner.png";

  return (
    <GlobalBanner
      eyebrow="Academics"
      title={title}
      image={image}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Question Bank" },
      ]}
    />
  );
};

export default QuestionBankBanner;
