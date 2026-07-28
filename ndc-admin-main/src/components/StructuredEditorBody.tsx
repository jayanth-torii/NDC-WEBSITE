import { useEffect, useState } from "react";
import { Accordion, Box, Stack, Text, Textarea } from "@chakra-ui/react";
import { MdExpandMore as ExpandMoreIcon } from "react-icons/md";
import { AutoForm } from "./AutoForm";
import { Callout, GhostButton } from "./editorKit";

// Shared body for every content editor: AutoForm's structured fields plus a
// collapsed "Advanced: raw JSON" escape hatch underneath — for shapes the
// heuristics don't cover well, and for seeding the very first fields into an
// empty/not-yet-seeded document (AutoForm alone has nothing to render for
// `{}`, since there's no schema to infer fields from).
export function StructuredEditorBody({ data, onChange }: { data: any; onChange: (v: any) => void }) {
  const [rawText, setRawText] = useState("");
  const [rawError, setRawError] = useState<string | null>(null);

  useEffect(() => {
    setRawText(JSON.stringify(data ?? {}, null, 2));
    setRawError(null);
  }, [data]);

  function applyRawText() {
    try {
      onChange(JSON.parse(rawText));
      setRawError(null);
    } catch {
      setRawError("Invalid JSON — fix the syntax before applying.");
    }
  }

  return (
    <Stack gap={5}>
      <AutoForm value={data} onChange={onChange} />

      <Accordion.Root collapsible borderWidth="1px" borderColor="orange.200" borderRadius="lg" overflow="hidden">
        <Accordion.Item value="advanced" border="none">
          <Accordion.ItemTrigger px={4} py={3} bg="orange.50">
            <Text flex="1" fontSize="sm" fontWeight={600} color="orange.800" textAlign="left">
              Advanced: raw JSON
            </Text>
            <Accordion.ItemIndicator color="orange.800">
              <ExpandMoreIcon size={16} />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody px={4} pb={4} bg="white">
              <Stack gap={3}>
                <Text fontSize="xs" color="gray.400">
                  For fields the form above doesn't cover cleanly, or to seed the first fields into an empty page.
                  Edit the JSON, then Apply to load it into the form above — Save still applies to the whole page.
                </Text>
                {rawError && <Callout tone="error">{rawError}</Callout>}
                <Textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  rows={10}
                  fontFamily="mono"
                  fontSize="xs"
                  bg="white"
                />
                <Box>
                  <GhostButton size="sm" onClick={applyRawText}>
                    Apply
                  </GhostButton>
                </Box>
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Stack>
  );
}
