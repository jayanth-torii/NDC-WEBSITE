import type { ReactNode, ComponentType, CSSProperties } from "react";
import {
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  IconButton,
  Spinner,
  Stack,
  Text,
  type BoxProps,
  type ButtonProps,
  type FlexProps,
  type IconButtonProps,
} from "@chakra-ui/react";
import { MdAdd, MdClose, MdDelete, MdInbox, MdSave } from "react-icons/md";
import Swal from "sweetalert2";

// Shared editor UI kit
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
      borderRadius="2xl"
      align="center"
      justify="center"
      bg={onDark ? "rgba(255,255,255,0.12)" : "orange.50"}
      border={onDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid"}
      borderColor={onDark ? "transparent" : "orange.100"}
      color={onDark ? "white" : "brand.orange"}
      boxShadow={onDark ? "inset 0 2px 4px rgba(255,255,255,0.1)" : "inset 0 2px 4px rgba(246,135,42,0.05)"}
    >
      <Icon size={size} />
    </Flex>
  );
}

// Card surface used for every content region.
export function Panel({ children, ...rest }: BoxProps) {
  return (
    <Box 
      bg="white" 
      border="1px solid" 
      borderColor="gray.100" 
      borderRadius="24px" 
      boxShadow="0 8px 30px -4px rgba(0,0,0,0.04)" 
      overflow="hidden" 
      transition="all 0.3s"
      _hover={{ boxShadow: "0 12px 40px -8px rgba(0,0,0,0.06)" }}
      {...rest}
    >
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
    <Panel 
      border="none" 
      bgGradient="to-br" 
      gradientFrom="brand.navy" 
      gradientTo="brand.navyDeep" 
      position="relative"
      mb={5}
      borderRadius="28px"
      boxShadow="0 20px 40px -12px rgba(14,36,85,0.3)"
      overflow="hidden"
    >
      {/* Decorative ambient glows */}
      <Box position="absolute" right="-10%" top="-40%" w="400px" h="400px" borderRadius="full" bg="brand.orange" filter="blur(120px)" opacity={0.25} pointerEvents="none" />
      <Box position="absolute" left="-10%" bottom="-40%" w="400px" h="400px" borderRadius="full" bg="blue.500" filter="blur(120px)" opacity={0.2} pointerEvents="none" />
      
      {/* Slanted decoration */}
      <Box position="absolute" left={0} top={0} w="4px" h="full" bgGradient="to-b" gradientFrom="brand.orange" gradientTo="#ffb677" />

      <Flex wrap="wrap" justify="space-between" align="center" gap={5} px={7} py={6} position="relative" zIndex={1}>
        <Flex align="center" gap={4}>
          <IconChip icon={icon} size={26} box={52} />
          <Box>
            <Flex align="center" gap={2} mb={1}>
                <Box w="6px" h="6px" borderRadius="full" bg="brand.orange" animation="pulse 2s infinite" />
                <Text fontSize="10px" fontWeight={800} letterSpacing="0.2em" textTransform="uppercase" color="brand.orange">
                  {eyebrow}
                </Text>
            </Flex>
            <Text fontSize="2xl" fontWeight={900} color="white" mt={1} letterSpacing="-0.02em" lineHeight={1.1}>
              {title}
            </Text>
            {subtitle && (
              <Text fontSize="xs" fontWeight={500} color="rgba(255,255,255,0.8)" mt={2} borderLeft="2px solid" borderColor="brand.orange" pl={2.5}>
                {subtitle}
              </Text>
            )}
          </Box>
        </Flex>

        <Flex align="center" gap={2.5} wrap="wrap">
          {stats?.map((s, i) => (
            <Flex key={i} direction="column" justify="center" align="center" px={4} py={2} borderRadius="xl" bg="rgba(255,255,255,0.06)" border="1px solid rgba(255,255,255,0.1)" backdropFilter="blur(8px)" minW="80px" transition="transform 0.3s" _hover={{ transform: "translateY(-2px)" }}>
              <Text fontSize="lg" fontWeight={900} color="white" lineHeight={1} mb="2px">
                {s.value}
              </Text>
              <Text fontSize="9px" textTransform="uppercase" letterSpacing="0.1em" color="rgba(255,255,255,0.6)" fontWeight={700}>
                {s.label}
              </Text>
            </Flex>
          ))}
          {mode && (
            <Box
              px={4}
              py={2}
              borderRadius="full"
              bg={mode === "edit" ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)"}
              border={`1px solid ${mode === "edit" ? "rgba(52,211,153,0.3)" : "rgba(251,191,36,0.3)"}`}
              color={mode === "edit" ? "#6ee7b7" : "#fcd34d"}
              fontWeight={800}
              fontSize="10px"
              letterSpacing="0.1em"
              textTransform="uppercase"
              whiteSpace="nowrap"
              backdropFilter="blur(4px)"
            >
              {mode === "edit" ? "● Edit Mode" : "○ Create Mode"}
            </Box>
          )}
        </Flex>
      </Flex>
    </Panel>
  );
}

// Lighter section intro
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
    <Flex align="flex-start" justify="space-between" gap={3} mb={4} wrap="wrap" bg="white" p={4} borderRadius="xl" boxShadow="0 4px 20px -4px rgba(0,0,0,0.02)" border="1px solid" borderColor="gray.100">
      <Flex align="flex-start" gap={3}>
        <IconChip icon={icon} size={19} box={40} onDark={false} />
        <Box pt="2px">
          <Text fontSize="md" fontWeight={900} color="brand.navy" letterSpacing="-0.02em">
            {title}
          </Text>
          {subtitle && (
            <Text fontSize="xs" fontWeight={500} color="gray.500" mt="2px">
              {subtitle}
            </Text>
          )}
        </Box>
      </Flex>
      {right && <Box flex="0 0 auto" pt="2px">{right}</Box>}
    </Flex>
  );
}

const CALLOUT_TONES = {
  info: { bg: "orange.50", border: "orange.100", fg: "orange.800" },
  error: { bg: "red.50", border: "red.100", fg: "red.700" },
  success: { bg: "green.50", border: "green.100", fg: "green.800" },
  blue: { bg: "blue.50", border: "blue.100", fg: "blue.800" },
} as const;

// Colored callout box
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
    <Flex align="flex-start" gap={3} bg={c.bg} border="1px solid" borderColor={c.border} color={c.fg} borderRadius="xl" px={5} py={4} fontSize="sm" fontWeight={500} mb={6} boxShadow="sm">
      {Icon && <Icon size={18} style={{ flexShrink: 0, marginTop: 2, color: c.fg }} />}
      <Box flex="1">{children}</Box>
      {onClose && (
        <IconButton aria-label="Dismiss" size="xs" variant="ghost" color={c.fg} _hover={{ bg: "rgba(0,0,0,0.05)" }} onClick={onClose}>
          <MdClose size={18} />
        </IconButton>
      )}
    </Flex>
  );
}

// Sticky footer save bar
export function SaveBar({
  summary,
  saving,
  label = "Save Changes",
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
    <Box position="sticky" bottom={0} zIndex={10} mt={5} pb={4}>
      <Panel display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={3} px={6} py={4} boxShadow="0 -10px 40px rgba(14,36,85,0.08)" borderRadius="xl">
        {summary && (
          <Text color="gray.500" fontSize="sm" fontWeight={500}>
            {summary}
          </Text>
        )}
        <Button 
          bgGradient="to-r" 
          gradientFrom="brand.orange" 
          gradientTo="#f89c4d" 
          color="white" 
          _hover={!disabled && !saving ? { transform: "translateY(-2px)", boxShadow: "0 12px 25px rgba(246,135,42,0.4)" } : undefined} 
          transition="all 0.3s"
          onClick={onSave} 
          disabled={saving || disabled} 
          ml="auto"
          px={8}
          py={6}
          borderRadius="xl"
          fontWeight={800}
          boxShadow="0 8px 20px rgba(246,135,42,0.25)"
        >
          {saving ? <Spinner size="sm" mr={2} /> : <MdSave size={20} style={{ marginRight: '8px' }} />}
          {saving ? "Saving..." : label}
        </Button>
      </Panel>
    </Box>
  );
}

// Dashed empty-state placeholder
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
    <Box border="2px dashed" borderColor="gray.200" borderRadius="2xl" px={6} py={16} textAlign="center" color="gray.400" bg="gray.50/50" transition="all 0.3s" _hover={{ bg: "gray.50" }}>
      <Flex justify="center" mb={4}>
        <Flex w="80px" h="80px" borderRadius="full" bg="white" border="1px solid" borderColor="gray.100" align="center" justify="center" boxShadow="sm">
            <Icon size={40} style={{ color: "#CBD5E1" }} />
        </Flex>
      </Flex>
      {title && (
        <Text mt={2} fontSize="lg" fontWeight={800} color="brand.navy">
          {title}
        </Text>
      )}
      {hint && (
        <Text mt={2} fontSize="sm" fontWeight={500} color="gray.500" maxW="400px" mx="auto">
          {hint}
        </Text>
      )}
    </Box>
  );
}

// Nested item card container
export function SubtleCard({ children, ...rest }: BoxProps) {
  return (
    <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="2xl" mb={5} overflow="hidden" boxShadow="0 2px 10px rgba(0,0,0,0.02)" transition="all 0.3s" _hover={{ borderColor: "brand.orange", boxShadow: "0 4px 20px rgba(246,135,42,0.08)" }} {...rest}>
      {children}
    </Box>
  );
}

// Header strip for a SubtleCard
export function CardHeader({ children, ...rest }: FlexProps) {
  return (
    <Flex align="center" gap={4} bg="gray.50/80" borderBottom="1px solid" borderColor="gray.100" px={5} py={4} {...rest}>
      {children}
    </Flex>
  );
}

// Light inner row
export function RowCard({ children, ...rest }: FlexProps) {
  return (
    <Flex align="center" gap={3} bg="white" border="1px solid" borderColor="gray.100" borderRadius="xl" px={4} py={3} mb={3} transition="all 0.2s" _hover={{ borderColor: "gray.200", boxShadow: "sm" }} {...rest}>
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
      bg={dashed ? "white" : "brand.navy"}
      color={dashed ? "brand.navy" : "white"}
      border={dashed ? "2px dashed" : "none"}
      borderColor={dashed ? "gray.300" : "transparent"}
      fontWeight={800}
      borderRadius="xl"
      px={5}
      py={4}
      _hover={{ bg: dashed ? "gray.50" : "brand.navyDeep", transform: "translateY(-1px)", boxShadow: dashed ? "sm" : "md" }}
      transition="all 0.2s"
      alignSelf="flex-start"
      {...rest}
    >
      <Icon size={18} style={{ marginRight: '6px' }} />
      {children}
    </Button>
  );
}

// Small square icon button
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
    if (needsConfirm) {
      Swal.fire({
        title: "Are you sure?",
        text: confirmMessage || "Are you sure you want to delete this? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F6872A",
        cancelButtonColor: "#0e2455",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          onClick?.();
        }
      });
      return;
    }
    onClick?.();
  }
  const isDanger = tone === "danger";
  return (
    <IconButton 
        type="button" 
        aria-label="Action" 
        size="sm" 
        bg={isDanger ? "red.50" : "gray.50"} 
        color={isDanger ? "red.500" : "gray.500"} 
        borderRadius="lg"
        _hover={{ bg: isDanger ? "red.500" : "gray.200", color: isDanger ? "white" : "gray.800", transform: "scale(1.05)" }}
        transition="all 0.2s"
        {...rest} 
        onClick={handleClick}
    >
      <Icon size={16} />
    </IconButton>
  );
}

// Gradient primary button
export function PrimaryButton({ children, icon: Icon, ...rest }: { children: ReactNode; icon?: IconComp } & ButtonProps) {
  return (
    <Button 
        bgGradient="to-r" 
        gradientFrom="brand.navy" 
        gradientTo="brand.navyDeep" 
        color="white" 
        borderRadius="xl"
        fontWeight={800}
        px={6}
        _hover={{ transform: "translateY(-2px)", boxShadow: "0 8px 20px rgba(14,36,85,0.2)" }} 
        transition="all 0.3s"
        {...rest}
    >
      {Icon && <Icon size={18} style={{ marginRight: '8px' }} />}
      {children}
    </Button>
  );
}

// Neutral outline button
export function GhostButton({ children, icon: Icon, ...rest }: { children: ReactNode; icon?: IconComp } & ButtonProps) {
  return (
    <Button
        variant="outline"
        borderColor="gray.200"
        color="gray.600"
        borderRadius="xl"
        fontWeight={700}
        px={5}
        _hover={{ bg: "gray.50", borderColor: "gray.300" }}
        transition="all 0.2s"
        {...rest}
    >
      {Icon && <Icon size={18} style={{ marginRight: '8px' }} />}
      {children}
    </Button>
  );
}

// Studio-style tab card grid — a grid of clickable icon+label+description
// cards used as an alternative to a plain Tabs.List, for editors with many
// sections (Departments overview, Department Details). Ported from NCET's
// admin (departments-page/_editorKit.js + departments-admin.scss) which
// pioneered this pattern for exactly this kind of many-tab content editor;
// re-skinned onto this app's own navy/orange tokens (that source already
// used #0a1f44/#f6872a, near-identical to brand.navy/brand.orange, so no
// palette was introduced — just wired to the real tokens). The "tilt on
// hover" feel is done with a plain CSS transform/transition rather than
// framer-motion, since no other page in this app depends on that library.
export type TabCardSpec = { id: string; label: string; desc?: string; icon?: IconComp };

export function TabCardGrid({
  tabs,
  activeTab,
  onChange,
  minColumnWidth = "132px",
}: {
  tabs: TabCardSpec[];
  activeTab: string;
  onChange: (id: string) => void;
  minColumnWidth?: string;
}) {
  return (
    <Grid templateColumns={`repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`} gap={3} mb={6} style={{ perspective: "900px" }}>
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <chakra.button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            textAlign="center"
            p={3}
            borderRadius="2xl"
            border="1px solid"
            borderColor={active ? "brand.orange" : "gray.200"}
            bg={active ? "orange.50" : "white"}
            boxShadow={active ? "0 10px 24px rgba(246,135,42,0.22)" : "0 1px 2px rgba(14,36,85,0.04)"}
            transition="transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease"
            _hover={{ transform: "translateY(-4px)", boxShadow: "0 12px 24px rgba(14,36,85,0.14)" }}
          >
            {Icon && (
              <Flex
                w="44px"
                h="44px"
                mx="auto"
                mb={2}
                borderRadius="xl"
                align="center"
                justify="center"
                color="white"
                bgGradient="to-br"
                gradientFrom={active ? "brand.orange" : "brand.navy"}
                gradientTo={active ? "#e8741a" : "brand.navyDeep"}
                boxShadow={active ? "0 8px 18px rgba(246,135,42,0.35)" : "0 8px 16px rgba(14,36,85,0.28)"}
              >
                <Icon size={19} />
              </Flex>
            )}
            <Text fontWeight={800} fontSize="xs" color="brand.navy" lineHeight={1.2}>
              {tab.label}
            </Text>
            {tab.desc && (
              <Text fontSize="9px" color="gray.400" mt="2px">
                {tab.desc}
              </Text>
            )}
          </chakra.button>
        );
      })}
    </Grid>
  );
}

// Sidebar-tabs studio layout — a slim vertical nav (icon + label per section)
// pinned to the left, content panel filling the rest. Replaces TabCardGrid's
// "row of cards above the content" for pages with many sections: on a wide
// editor the card-grid row eats a full width band of near-empty space before
// the content even starts, and re-scans on every tab change. A sticky
// sidebar keeps the nav in view while scrolling a long form and reads as a
// single editor surface instead of "menu, then a separate panel below it".
export function EditorLayout({
  tabs,
  activeTab,
  onChange,
  children,
  sidebarExtra,
}: {
  tabs: TabCardSpec[];
  activeTab: string;
  onChange: (id: string) => void;
  children: ReactNode;
  sidebarExtra?: ReactNode;
}) {
  return (
    <Flex align="flex-start" gap={4} direction={{ base: "column", lg: "row" }}>
      <Box
        flex={{ base: "1 1 auto", lg: "0 0 216px" }}
        w={{ base: "full", lg: "216px" }}
        position={{ lg: "sticky" }}
        top={{ lg: "16px" }}
      >
        <Panel p={2}>
          <Stack gap="2px">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <chakra.button
                  key={tab.id}
                  type="button"
                  onClick={() => onChange(tab.id)}
                  display="flex"
                  alignItems="center"
                  gap={2.5}
                  textAlign="left"
                  w="full"
                  px={2.5}
                  py={2}
                  borderRadius="lg"
                  bg={active ? "orange.50" : "transparent"}
                  color={active ? "brand.orange" : "gray.600"}
                  fontWeight={active ? 800 : 600}
                  fontSize="13px"
                  borderLeft="3px solid"
                  borderColor={active ? "brand.orange" : "transparent"}
                  transition="background 0.15s, color 0.15s"
                  _hover={{ bg: active ? "orange.50" : "gray.50", color: active ? "brand.orange" : "brand.navy" }}
                >
                  {Icon && (
                    <Flex
                      flex="0 0 auto"
                      w="26px"
                      h="26px"
                      borderRadius="md"
                      align="center"
                      justify="center"
                      bg={active ? "brand.orange" : "gray.100"}
                      color={active ? "white" : "gray.500"}
                    >
                      <Icon size={14} />
                    </Flex>
                  )}
                  <Text as="span" lineHeight={1.2} truncate>
                    {tab.label}
                  </Text>
                </chakra.button>
              );
            })}
          </Stack>
        </Panel>
        {sidebarExtra}
      </Box>
      <Box flex="1 1 0%" minW={0} w="full">
        {children}
      </Box>
    </Flex>
  );
}
