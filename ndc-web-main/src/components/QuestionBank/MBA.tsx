"use client";

import ProgrammeQuestionPapers from "./ProgrammeQuestionPapers";

export default function MBA({ data }: { data?: Record<string, any> }) {
  return <ProgrammeQuestionPapers data={data} titlePrefix="MBA-" />;
}
