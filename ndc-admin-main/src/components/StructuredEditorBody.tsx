import { useEffect, useState } from "react";
import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { MdCode as CodeIcon } from "react-icons/md";
import { AutoForm } from "./AutoForm";
import { Callout } from "./editorKit";

export function StructuredEditorBody({ data, onChange }: { data: any; onChange: (v: any) => void }) {
  const [rawText, setRawText] = useState("");
  const [rawError, setRawError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    <Box>
      <AutoForm value={data} onChange={onChange} />

      <Box mt={8} borderWidth="1px" borderColor="gray.200" borderRadius="xl" overflow="hidden" bg="white">
        <Flex 
          align="center" 
          justify="space-between" 
          px={5} 
          py={4} 
          bg="gray.50" 
          cursor="pointer" 
          onClick={() => setShowAdvanced(!showAdvanced)}
          borderBottom={showAdvanced ? "1px solid" : "none"}
          borderColor="gray.200"
        >
          <Flex align="center" gap={3}>
            <CodeIcon size={18} color="var(--chakra-colors-gray-600)" />
            <Text fontSize="sm" fontWeight={700} color="gray.700" textTransform="uppercase" letterSpacing="wide">
              Advanced: Raw JSON
            </Text>
          </Flex>
          <Text fontSize="xs" color="gray.500" fontWeight={600}>
            {showAdvanced ? "Hide" : "Show"}
          </Text>
        </Flex>
        
        {showAdvanced && (
          <Box p={5}>
            <Text fontSize="xs" color="gray.500" mb={4}>
              For fields the form above doesn't cover cleanly, or to seed the first fields into an empty page.
              Edit the JSON, then Apply to load it into the form above — Save still applies to the whole page.
            </Text>
            {rawError && (
              <Box mb={4}>
                <Callout tone="error">{rawError}</Callout>
              </Box>
            )}
            <Textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={12}
              fontFamily="mono"
              fontSize="xs"
              bg="gray.900"
              color="gray.100"
              borderColor="gray.700"
              _focus={{ borderColor: "brand.orange", boxShadow: "none" }}
              mb={4}
            />
            <Button size="sm" bg="brand.navy" color="white" _hover={{ bg: "brand.orange" }} onClick={applyRawText}>
              Apply JSON
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
