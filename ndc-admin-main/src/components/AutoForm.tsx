import { Accordion, Box, Flex, Input, Stack, Switch, Text, Textarea } from "@chakra-ui/react";
import { MdExpandMore as ExpandMoreIcon, MdFolder as SectionIcon, MdInbox as EmptyIcon } from "react-icons/md";
import { ImageControl } from "./ImageControl";
import { FileControl } from "./FileControl";
import { YoutubeControl } from "./YoutubeControl";
import { MapLocationControl } from "./MapLocationControl";
import { AddButton, EmptyState, IconChip, IconBtn, RowCard } from "./editorKit";
import { HIDDEN_KEYS, emptyLike, humanize, isImageField, isPdfField, isVideoField, itemLabel, isYoutubeField, isMapLocationField } from "./fieldHeuristics";

type Json = any;

// Recursively renders proper fields (text/number/switch/image/pdf/repeatable
// list) for an arbitrary JSON value — the structured replacement for the
// raw-JSON textarea. There's no backend schema to drive this off (every
// content model is `data: Mixed`), so field type is inferred per-key/value
// via fieldHeuristics. Edits clone-and-patch the source object at the
// changed path only, so fields this renderer doesn't recognize (or hides,
// like technical bookkeeping keys) are never dropped on save.
export function AutoForm({ value, onChange }: { value: Json; onChange: (v: Json) => void }) {
  return <ObjectFields value={value ?? {}} onChange={onChange} />;
}

function ObjectFields({ value, onChange }: { value: Record<string, Json>; onChange: (v: any) => void }) {
  const keys = Object.keys(value ?? {}).filter((k) => !HIDDEN_KEYS.has(k));
  if (keys.length === 0) {
    return <EmptyState icon={EmptyIcon} title="No fields yet" hint='Use "Advanced: raw JSON" below to seed the initial shape.' />;
  }
  return (
    <Stack gap={5}>
      {keys.map((key) => (
        <FieldRow
          key={key}
          fieldKey={key}
          label={humanize(key)}
          value={value[key]}
          onChange={(next: Json) => onChange({ ...value, [key]: next })}
        />
      ))}
    </Stack>
  );
}

function FieldRow({
  fieldKey,
  label,
  value,
  onChange,
}: {
  fieldKey: string;
  label: string;
  value: Json;
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
    return <ArrayField fieldKey={fieldKey} label={label} value={value} onChange={onChange} />;
  }

  if (value !== null && typeof value === "object") {
    return (
      <Accordion.Root collapsible defaultValue={[fieldKey]} variant="outline" borderRadius="lg" overflow="hidden">
        <Accordion.Item value={fieldKey} bg="gray.50" borderWidth="1px" borderColor="gray.200" borderRadius="lg">
          <Accordion.ItemTrigger bg="white" borderBottom="1px solid" borderColor="gray.100" px={4} py={3}>
            <Flex align="center" gap={3} flex="1">
              <IconChip icon={SectionIcon} size={16} box={32} onDark={false} />
              <Text fontWeight={700} color="brand.navy" textAlign="left">
                {label}
              </Text>
            </Flex>
            <Accordion.ItemIndicator>
              <ExpandMoreIcon size={16} />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody px={4} pt={4} pb={4}>
              <ObjectFields value={value} onChange={onChange} />
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    );
  }

  if (typeof value === "boolean") {
    return (
      <Switch.Root checked={value} onCheckedChange={(e) => onChange(e.checked)} colorPalette="orange">
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>{label}</Switch.Label>
      </Switch.Root>
    );
  }

  if (typeof value === "number") {
    return (
      <Box maxW="240px">
        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
          {label}
        </Text>
        <Input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} size="sm" bg="white" />
      </Box>
    );
  }

  const str = value == null ? "" : String(value);
  const multiline = str.length > 90 || str.includes("\n");
  return (
    <Box>
      <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
        {label}
      </Text>
      {multiline ? (
        <Textarea value={str} onChange={(e) => onChange(e.target.value)} rows={3} size="sm" bg="white" />
      ) : (
        <Input value={str} onChange={(e) => onChange(e.target.value)} size="sm" bg="white" />
      )}
    </Box>
  );
}

function ArrayField({ fieldKey, label, value, onChange }: { fieldKey: string; label: string; value: Json[]; onChange: (v: Json[]) => void }) {
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
      <Text fontWeight={700} color="brand.navy" mb={2}>
        {label}
      </Text>
      <Stack gap={3}>
        {value.map((item, i) =>
          isObjectArray ? (
            // The delete button sits in a relatively-positioned wrapper, as a
            // sibling of Accordion.Item rather than a child of ItemTrigger —
            // ItemTrigger renders as a <button>, and nesting an IconButton
            // (also a <button>) inside it is invalid HTML/hydration-unsafe.
            <Box key={i} position="relative">
              <Accordion.Root collapsible variant="outline" borderRadius="lg" overflow="hidden">
                <Accordion.Item value={`item-${i}`} bg="gray.50" borderWidth="1px" borderColor="gray.200" borderRadius="lg">
                  <Accordion.ItemTrigger bg="white" borderBottom="1px solid" borderColor="gray.100" px={4} py={3} pr={12}>
                    <Flex align="center" gap={3} flex="1">
                      <IconChip icon={SectionIcon} size={16} box={32} onDark={false} />
                      <Text fontWeight={600} textAlign="left">
                        {itemLabel(item, i)}
                      </Text>
                    </Flex>
                    <Accordion.ItemIndicator>
                      <ExpandMoreIcon size={16} />
                    </Accordion.ItemIndicator>
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent>
                    <Accordion.ItemBody px={4} pt={4} pb={4}>
                      <ObjectFields value={item} onChange={(next) => updateItem(i, next)} />
                    </Accordion.ItemBody>
                  </Accordion.ItemContent>
                </Accordion.Item>
              </Accordion.Root>
              <IconBtn
                aria-label="Remove item"
                tone="danger"
                size="xs"
                position="absolute"
                top="10px"
                right="40px"
                zIndex={1}
                onClick={() => removeItem(i)}
              />
            </Box>
          ) : (
            <RowCard key={i} mb={0}>
              <Box flex="1">
                {isYoutubeField(fieldKey, item) ? (
                  <YoutubeControl value={item ?? ""} onChange={(v) => updateItem(i, v)} />
                ) : isMapLocationField(fieldKey, item) ? (
                  <MapLocationControl value={item ?? ""} onChange={(v) => updateItem(i, v)} />
                ) : (
                  <Input value={item ?? ""} onChange={(e) => updateItem(i, e.target.value)} size="sm" bg="white" w="full" />
                )}
              </Box>
              <IconBtn aria-label="Remove item" tone="danger" size="xs" onClick={() => removeItem(i)} />
            </RowCard>
          )
        )}
        <AddButton dashed size="xs" onClick={addItem}>
          Add {singularish(label)}
        </AddButton>
      </Stack>
    </Box>
  );
}

function singularish(label: string): string {
  return label.toLowerCase().endsWith("s") ? label.slice(0, -1) : "item";
}
