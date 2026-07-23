"use client";

import ProgrammeQuestionPapers from "./ProgrammeQuestionPapers";

export default function BcomHons({ data }: { data?: Record<string, any> }) {
  return (
    <ProgrammeQuestionPapers data={data} titlePrefix="B.Com (Hons)-" />
  );
}
