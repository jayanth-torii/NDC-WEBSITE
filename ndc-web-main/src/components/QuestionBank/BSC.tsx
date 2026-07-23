"use client";

import ProgrammeQuestionPapers from "./ProgrammeQuestionPapers";

export default function BSC({ data }: { data?: Record<string, any> }) {
  return <ProgrammeQuestionPapers data={data} titlePrefix="BSC-" />;
}
