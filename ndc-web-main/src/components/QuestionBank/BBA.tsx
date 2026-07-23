"use client";

import ProgrammeQuestionPapers from "./ProgrammeQuestionPapers";

export default function BBA({ data }: { data?: Record<string, any> }) {
  return <ProgrammeQuestionPapers data={data} titlePrefix="BBA-" />;
}
