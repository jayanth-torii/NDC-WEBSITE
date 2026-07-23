"use client";

import ProgrammeQuestionPapers from "./ProgrammeQuestionPapers";

export default function MCom({ data }: { data?: Record<string, any> }) {
  return <ProgrammeQuestionPapers data={data} titlePrefix="Mcom-" />;
}
