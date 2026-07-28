import type { ReactNode, ComponentType, CSSProperties } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Spinner,
  Text,
  type BoxProps,
  type ButtonProps,
  type FlexProps,
  type IconButtonProps,
} from "@chakra-ui/react";
import { MdAdd, MdClose, MdDelete, MdInbox, MdSave } from "react-icons/md";

// Shared editor UI kit — ported from NCET admin's `_editorKit.js` onto Chakra
// v3 + this app's own brand tokens (brand.navy/navyDeep/orange, radii, the
// "card" shadow — see src/theme/system.ts), so every content-editing page
// reads as one product instead of each page hand-rolling its own plain box.
// Purely presentational — no data/fetch logic lives here.

type IconComp = ComponentType<{ size?: number; style?: CSSProperties }>;

export function IconChip({
  icon: Icon,
  size = 28,
  box = 56,
  onDark = true,
}: {
  icon?: IconComp;
  size?: number;
  box?: number;
  onDark?: boolean;
}) {
  if (!Icon) return null;
  return (
    <Flex
      flex="0 0 auto"
      w={`${box}px`}
      h={`${box}px`}
      borderRadius="lg"
      align="center"
      justify="center"
      bg={onDark ? "rgba(255,255,255,0.12)" : "orange.50"}
      border={onDark ? "1px solid rgba(255,255,255,0.2)" : "none"}
      color="brand.orange"
    >
      <Icon size={size} />
    </Flex>
  );
}

// Card surface used for every content region.
export function Panel({ children, ...rest }: BoxProps) {
  return (
    <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="lg" boxShadow="card" overflow="hidden" {...rest}>
      {children}
    </Box>
  );
}

// Gradient page header with icon, eyebrow, title, subtitle, stats, mode badge.
export function EditorHeader({
  icon,
  eyebrow = "Content Manager",
  title,
  subtitle,
  stats,
  mode,
}: {
  icon?: IconComp;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  stats?: { value: string | number; label: string }[];
  mode?: "edit" | "create";
}) {
  return (
    <Panel border="none" bgGradient="to-br" gradientFrom="brand.navy" gradientTo="brand.navyDeep" position="relative" mb={5}>
      <Box position="absolute" right="-60px" top="-60px" w="220px" h="220px" borderRadius="full" bg="rgba(246,135,42,0.18)" filter="blur(8px)" />
      <Flex wrap="wrap" justify="space-between" align="center" gap={4} px={7} py={6} position="relative">
        <Flex align="center" gap={3}>
          <IconChip icon={icon} size={28} box={56} />
          <Box>
            <Text fontSize="xs" fontWeight={700} letterSpacing="0.12em" textTransform="uppercase" color="rgba(255,255,255,0.65)">
              {eyebrow}
            </Text>
            <Text fontSize="xl" fontWeight={800} color="white" mt="2px">
              {title}
            </Text>
            {subtitle && (
              <Text fontSize="sm" color="rgba(255,255,255,0.7)" mt={1}>
                {subtitle}
              </Text>
            )}
          </Box>
        </Flex>
        <Flex align="center" gap={2} wrap="wrap">
          {stats?.map((s, i) => (
            <Box key={i} textAlign="center" px={4} py={2} borderRadius="lg" bg="rgba(255,255,255,0.1)" border="1px solid rgba(255,255,255,0.15)" minW="88px">
              <Text fontSize="lg" fontWeight={800} color="white" lineHeight={1}>
                {s.value}
              </Text>
              <Text fontSize="2xs" textTransform="uppercase" letterSpacing="0.06em" color="rgba(255,255,255,0.72)" mt={1}>
                {s.label}
              </Text>
            </Box>
          ))}
          {mode && (
            <Box
              px={4}
              py={2}
              borderRadius="lg"
              bg={mode === "edit" ? "rgba(52,211,153,0.18)" : "rgba(251,191,36,0.2)"}
              border={`1px solid ${mode === "edit" ? "rgba(52,211,153,0.4)" : "rgba(251,191,36,0.45)"}`}
              color="white"
              fontWeight={700}
              fontSize="xs"
              whiteSpace="nowrap"
            >
              {mode === "edit" ? "● Edit Mode" : "○ Create Mode"}
            </Box>
          )}
        </Flex>
      </Flex>
    </Panel>
  );
}

// Lighter section intro — icon chip + title/subtitle + optional right slot.
// Used atop list pages, where a full gradient hero would be overkill.
export function SectionHead({
  icon,
  title,
  subtitle,
  right,
}: {
  icon?: IconComp;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <Flex align="flex-start" justify="space-between" gap={3} mb={4} wrap="wrap">
      <Flex align="flex-start" gap={3}>
        <IconChip icon={icon} size={20} box={44} onDark={false} />
        <Box>
          <Text fontSize="md" fontWeight={800} color="brand.navy" letterSpacing="-0.01em">
            {title}
          </Text>
          {subtitle && (
            <Text fontSize="sm" color="gray.500" mt={1}>
              {subtitle}
            </Text>
          )}
        </Box>
      </Flex>
      {right && <Box flex="0 0 auto">{right}</Box>}
    </Flex>
  );
}

const CALLOUT_TONES = {
  info: { bg: "orange.50", border: "orange.200", fg: "orange.800" },
  error: { bg: "red.50", border: "red.200", fg: "red.600" },
  success: { bg: "green.50", border: "green.200", fg: "green.700" },
  blue: { bg: "blue.50", border: "blue.200", fg: "blue.800" },
} as const;

// Colored callout box — replaces every page's ad hoc inline alert Box.
export function Callout({
  tone = "info",
  icon,
  onClose,
  children,
}: {
  tone?: keyof typeof CALLOUT_TONES;
  icon?: IconComp;
  onClose?: () => void;
  children: ReactNode;
}) {
  const c = CALLOUT_TONES[tone];
  const Icon = icon;
  return (
    <Flex align="flex-start" gap={2} bg={c.bg} border="1px solid" borderColor={c.border} color={c.fg} borderRadius="md" px={4} py={3} fontSize="sm">
      {Icon && <Icon size={16} style={{ flexShrink: 0, marginTop: 2 }} />}
      <Box flex="1">{children}</Box>
      {onClose && (
        <IconButton aria-label="Dismiss" size="xs" variant="ghost" color={c.fg} onClick={onClose}>
          <MdClose size={16} />
        </IconButton>
      )}
    </Flex>
  );
}

// Sticky footer save bar with a summary + submit button.
export function SaveBar({
  summary,
  saving,
  label = "Save",
  onSave,
  disabled,
}: {
  summary?: ReactNode;
  saving: boolean;
  label?: string;
  onSave: () => void;
  disabled?: boolean;
}) {
  return (
    <Box position="sticky" bottom={0} zIndex={10} mt={6}>
      <Panel display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={3} px={6} py={4} boxShadow="0 -4px 24px rgba(14,36,85,0.10)">
        {summary && (
          <Text color="gray.500" fontSize="sm">
            {summary}
          </Text>
        )}
        <Button bg="brand.navy" color="white" _hover={{ bg: "brand.navyDeep" }} onClick={onSave} disabled={saving || disabled} ml="auto">
          {saving ? <Spinner size="sm" /> : <MdSave size={16} />}
          {saving ? "Saving..." : label}
        </Button>
      </Panel>
    </Box>
  );
}

// Dashed empty-state placeholder.
export function EmptyState({
  icon = MdInbox,
  title,
  hint,
}: {
  icon?: IconComp;
  title: string;
  hint?: string;
}) {
  const Icon = icon;
  return (
    <Box border="2px dashed" borderColor="gray.200" borderRadius="lg" px={4} py={12} textAlign="center" color="gray.400">
      <Flex justify="center">
        <Icon size={40} style={{ opacity: 0.5 }} />
      </Flex>
      {title && (
        <Text mt={3} fontWeight={600} color="gray.500">
          {title}
        </Text>
      )}
      {hint && (
        <Text mt={1} fontSize="sm">
          {hint}
        </Text>
      )}
    </Box>
  );
}

// Nested item card container (object/array entries within AutoForm).
export function SubtleCard({ children, ...rest }: BoxProps) {
  return (
    <Box bg="gray.50" border="1px solid" borderColor="gray.200" borderRadius="lg" mb={4} overflow="hidden" {...rest}>
      {children}
    </Box>
  );
}

// Header strip for a SubtleCard (icon chip + content + actions).
export function CardHeader({ children, ...rest }: FlexProps) {
  return (
    <Flex align="center" gap={3} bg="white" borderBottom="1px solid" borderColor="gray.100" px={4} py={3} {...rest}>
      {children}
    </Flex>
  );
}

// Light inner row (a paragraph/file/link row inside a card body or list).
export function RowCard({ children, ...rest }: FlexProps) {
  return (
    <Flex align="center" gap={2} bg="white" border="1px solid" borderColor="gray.100" borderRadius="md" px={3} py={2} mb={2} {...rest}>
      {children}
    </Flex>
  );
}

// Primary or dashed "add" button.
export function AddButton({
  children,
  dashed,
  icon: Icon = MdAdd,
  ...rest
}: {
  children: ReactNode;
  dashed?: boolean;
  icon?: IconComp;
} & ButtonProps) {
  return (
    <Button
      type="button"
      size="sm"
      bg={dashed ? "transparent" : "brand.navy"}
      color={dashed ? "brand.navy" : "white"}
      border={dashed ? "1px dashed" : "none"}
      borderColor={dashed ? "gray.300" : "transparent"}
      fontWeight={dashed ? 600 : 700}
      _hover={{ bg: dashed ? "gray.50" : "brand.navyDeep" }}
      alignSelf="flex-start"
      {...rest}
    >
      <Icon size={15} />
      {children}
    </Button>
  );
}

// Small square icon button (default / danger). Danger buttons gate their
// click behind a confirm() by default — pass confirm={false} to opt out, or
// confirmMessage to customise the copy.
export function IconBtn({
  icon: Icon = MdDelete,
  tone = "danger",
  confirm,
  confirmMessage,
  onClick,
  ...rest
}: {
  icon?: IconComp;
  tone?: "danger" | "default";
  confirm?: boolean;
  confirmMessage?: string;
  onClick?: () => void;
} & Omit<IconButtonProps, "onClick">) {
  const needsConfirm = confirm === undefined ? tone === "danger" : confirm;
  function handleClick() {
    if (needsConfirm && !window.confirm(confirmMessage || "Are you sure you want to delete this? This action cannot be undone.")) {
      return;
    }
    onClick?.();
  }
  const toneProps = tone === "danger" ? { color: "red.600", borderColor: "red.200" } : { color: "brand.navy", borderColor: "gray.200" };
  return (
    <IconButton type="button" aria-label="Remove" size="xs" variant="outline" bg="white" {...toneProps} {...rest} onClick={handleClick}>
      <Icon size={15} />
    </IconButton>
  );
}

// Gradient primary button — standalone CTAs outside a SaveBar (e.g. "New Post").
export function PrimaryButton({ children, icon: Icon, ...rest }: { children: ReactNode; icon?: IconComp } & ButtonProps) {
  return (
    <Button bg="brand.navy" color="white" _hover={{ bg: "brand.navyDeep" }} {...rest}>
      {Icon && <Icon size={16} />}
      {children}
    </Button>
  );
}

// Neutral outline button (Apply / Cancel / secondary actions).
export function GhostButton({ children, icon: Icon, ...rest }: { children: ReactNode; icon?: IconComp } & ButtonProps) {
  return (
    <Button variant="outline" borderColor="gray.200" color="gray.600" {...rest}>
      {Icon && <Icon size={15} />}
      {children}
    </Button>
  );
}
