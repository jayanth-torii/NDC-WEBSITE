"use client";

import ProgrammeQuestionPapers from "./ProgrammeQuestionPapers";

export default function BCA({ data }: { data?: Record<string, any> }) {
  return <ProgrammeQuestionPapers data={data} titlePrefix="BCA-" />;
}
