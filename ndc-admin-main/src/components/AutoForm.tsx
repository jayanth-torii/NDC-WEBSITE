import { Box, Flex, Input, Switch, Text, Textarea } from "@chakra-ui/react";
import { MdFolder as SectionIcon, MdInbox as EmptyIcon } from "react-icons/md";
import { ImageControl } from "./ImageControl";
import { FileControl } from "./FileControl";
import { YoutubeControl } from "./YoutubeControl";
import { MapLocationControl } from "./MapLocationControl";
import { AddButton, EmptyState, IconChip, IconBtn } from "./editorKit";
import { HIDDEN_KEYS, emptyLike, humanize, isImageField, isPdfField, isVideoField, itemLabel, isYoutubeField, isMapLocationField } from "./fieldHeuristics";

type Json = any;

export function AutoForm({ value, onChange }: { value: Json; onChange: (v: Json) => void }) {
  return (
    <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden" borderWidth="1px" borderColor="gray.200">
      <ObjectFields value={value ?? {}} onChange={onChange} level={0} />
    </Box>
  );
}

function ObjectFields({ value, onChange, level = 0 }: { value: Record<string, Json>; onChange: (v: any) => void; level?: number }) {
  const keys = Object.keys(value ?? {}).filter((k) => !HIDDEN_KEYS.has(k));
  if (keys.length === 0) {
    return <EmptyState icon={EmptyIcon} title="No fields yet" hint='Use "Advanced: raw JSON" below to seed the initial shape.' />;
  }
  return (
    <Box>
      {keys.map((key, index) => (
        <Box 
          key={key}
          borderBottom={index < keys.length - 1 ? "1px solid" : "none"} 
          borderColor="gray.100"
          p={level === 0 ? 5 : 4}
          bg={level === 0 ? "white" : "gray.50"}
        >
          <FieldRow
            fieldKey={key}
            label={humanize(key)}
            value={value[key]}
            level={level}
            onChange={(next: Json) => onChange({ ...value, [key]: next })}
          />
        </Box>
      ))}
    </Box>
  );
}

function FieldRow({
  fieldKey,
  label,
  value,
  level,
  onChange,
}: {
  fieldKey: string;
  label: string;
  value: Json;
  level: number;
  onChange: (v: Json) => void;
}) {
  if (isImageField(fieldKey, value)) {
    return <ImageControl label={label} value={value || ""} onChange={onChange} />;
  }

  if (isPdfField(fieldKey, value) || isVideoField(fieldKey, value)) {
    return <FileControl label={label} value={value || ""} onChange={onChange} />;
  }
  
  if (isYoutubeField(fieldKey, value)) {
    return <YoutubeControl label={label} value={value || ""} onChange={onChange} />;
  }
  
  if (isMapLocationField(fieldKey, value)) {
    return <MapLocationControl label={label} value={value || ""} onChange={onChange} />;
  }

  if (Array.isArray(value)) {
    return <ArrayField fieldKey={fieldKey} label={label} value={value} level={level} onChange={onChange} />;
  }

  if (value !== null && typeof value === "object") {
    return (
      <Box borderLeft="3px solid" borderColor="brand.orange" pl={4} ml={1}>
        <Flex align="center" gap={3} mb={4}>
          <IconChip icon={SectionIcon} size={16} box={32} onDark={false} />
          <Text fontWeight={700} color="brand.navy" fontSize="sm" textTransform="uppercase" letterSpacing="wide">
            {label}
          </Text>
        </Flex>
        <Box borderRadius="md" overflow="hidden" borderWidth="1px" borderColor="gray.200">
          <ObjectFields value={value} onChange={onChange} level={level + 1} />
        </Box>
      </Box>
    );
  }

  if (typeof value === "boolean") {
    return (
      <Flex align="center" justify="space-between" maxW="400px">
        <Text fontSize="sm" fontWeight={600} color="gray.700">
          {label}
        </Text>
        <Switch.Root checked={value} onCheckedChange={(e) => onChange(e.checked)} colorPalette="orange">
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Root>
      </Flex>
    );
  }

  if (typeof value === "number") {
    return (
      <Box maxW="400px">
        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1} textTransform="uppercase" letterSpacing="wide">
          {label}
        </Text>
        <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} bg="white" borderColor="gray.300" _focus={{ borderColor: "brand.orange", boxShadow: "none" }} />
      </Box>
    );
  }

  const str = value == null ? "" : String(value);
  const multiline = str.length > 90 || str.includes("\n");
  return (
    <Box>
      <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1} textTransform="uppercase" letterSpacing="wide">
        {label}
      </Text>
      {multiline ? (
        <Textarea value={str} onChange={(e) => onChange(e.target.value)} rows={4} bg="white" borderColor="gray.300" _focus={{ borderColor: "brand.orange", boxShadow: "none" }} />
      ) : (
        <Input value={str} onChange={(e) => onChange(e.target.value)} bg="white" borderColor="gray.300" _focus={{ borderColor: "brand.orange", boxShadow: "none" }} />
      )}
    </Box>
  );
}

function ArrayField({ fieldKey, label, value, level, onChange }: { fieldKey: string; label: string; value: Json[]; level: number; onChange: (v: Json[]) => void }) {
  const isObjectArray = value.length > 0 && value.every((v) => v !== null && typeof v === "object" && !Array.isArray(v));

  function addItem() {
    const sample = value.length > 0 ? value[value.length - 1] : "";
    onChange([...value, emptyLike(sample)]);
  }
  function removeItem(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }
  function updateItem(i: number, next: Json) {
    const copy = value.slice();
    copy[i] = next;
    onChange(copy);
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight={700} color="brand.navy" fontSize="sm" textTransform="uppercase" letterSpacing="wide">
          {label}
        </Text>
        <AddButton dashed size="xs" onClick={addItem}>
          Add {singularish(label)}
        </AddButton>
      </Flex>
      
      {value.length > 0 ? (
        <Box borderWidth="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
          {value.map((item, i) =>
            isObjectArray ? (
              <Box key={i} borderBottom={i < value.length - 1 ? "1px solid" : "none"} borderColor="gray.200" bg="white">
                <Flex align="center" justify="space-between" bg="gray.100" px={4} py={3} borderBottom="1px solid" borderColor="gray.200">
                  <Flex align="center" gap={3}>
                    <IconChip icon={SectionIcon} size={14} box={24} onDark={false} />
                    <Text fontWeight={600} fontSize="sm" color="brand.navy">
                      {itemLabel(item, i)}
                    </Text>
                  </Flex>
                  <IconBtn aria-label="Remove item" tone="danger" size="xs" onClick={() => removeItem(i)} />
                </Flex>
                <Box>
                  <ObjectFields value={item} onChange={(next) => updateItem(i, next)} level={level + 1} />
                </Box>
              </Box>
            ) : (
              <Flex key={i} align="center" p={3} gap={3} borderBottom={i < value.length - 1 ? "1px solid" : "none"} borderColor="gray.200" bg="white">
                <Box flex="1">
                  {isYoutubeField(fieldKey, item) ? (
                    <YoutubeControl value={item ?? ""} onChange={(v) => updateItem(i, v)} />
                  ) : isMapLocationField(fieldKey, item) ? (
                    <MapLocationControl value={item ?? ""} onChange={(v) => updateItem(i, v)} />
                  ) : (
                    <Input value={item ?? ""} onChange={(e) => updateItem(i, e.target.value)} bg="white" w="full" borderColor="gray.300" _focus={{ borderColor: "brand.orange", boxShadow: "none" }} />
                  )}
                </Box>
                <IconBtn aria-label="Remove item" tone="danger" size="xs" onClick={() => removeItem(i)} />
              </Flex>
            )
          )}
        </Box>
      ) : (
        <Box p={4} borderWidth="1px" borderColor="gray.200" borderStyle="dashed" borderRadius="md" textAlign="center">
          <Text fontSize="sm" color="gray.500">No items yet.</Text>
        </Box>
      )}
    </Box>
  );
}

function singularish(label: string): string {
  return label.toLowerCase().endsWith("s") ? label.slice(0, -1) : "item";
}
