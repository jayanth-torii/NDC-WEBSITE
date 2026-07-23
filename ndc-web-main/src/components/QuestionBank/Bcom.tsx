"use client";

import ProgrammeQuestionPapers from "./ProgrammeQuestionPapers";

export default function Bcom({ data }: { data?: Record<string, any> }) {
  return <ProgrammeQuestionPapers data={data} titlePrefix="B.com-" />;
}
