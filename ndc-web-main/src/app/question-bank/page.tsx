"use client";

import React, { Suspense } from "react";
import GlobalBanner from "@/components/GlobalBanner/GlobalBanner";
import QuestionBankTabs from "@/components/QuestionBank/QuestionBankTabs";

const QuestionBankPage = () => {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-x-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_40%,#f1f5f9_100%)]">
      <GlobalBanner
        eyebrow="Academics"
        title="Question Bank"
        image="/images/question-bank/banner.png"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Question Bank" },
        ]}
      />

      <div className="relative pb-20 lg:pb-28">
        <Suspense fallback={<div className="container mx-auto px-4 py-16 text-body-gray">Loading…</div>}>
          <QuestionBankTabs />
        </Suspense>
      </div>
    </main>
  );
};

export default QuestionBankPage;
