import React from 'react';
import PageBanner from '@/components/ui/PageBanner';

const QuestionBankBanner = ({ data }: any) => {
  const title = data?.title || "Question Bank";
  const image = data?.image || "/images/question-bank/banner.png";

  return (
    <PageBanner
      title={title}
      image={image}
      className="rounded-xl mt-10 mb-10 md:mb-20"
    />
  );
};

export default QuestionBankBanner;
