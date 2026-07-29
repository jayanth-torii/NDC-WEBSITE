import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Grid, Spinner, Stack, Text } from "@chakra-ui/react";
import { MdWidgets as CellsIcon, MdArrowForward as ArrowIcon, MdGroups as GroupIcon } from "react-icons/md";
import { ACTIVITY_GROUPS } from "../config/adminPages";
import { humanize } from "../components/fieldHeuristics";
import { getActivityCells } from "../services/data.service";
import { Callout, EditorHeader, EmptyState, SectionHead } from "../components/editorKit";

// Gallery-style list of all 16 activity cells, replacing the old two-dropdown
// single-page editor. Each cell is a genuinely separate, independently
// addressable backend document (see ndc-backend-main's activityCell model —
// not an array-in-a-singleton) and a genuinely separate public page
// (ndc-web-main has 16 distinct file-based routes under src/app/activities/),
// so this now mirrors that as real subpages: clicking a card navigates to
// /activity-cells/:cellId (ActivityCellDetailPage.tsx).
//
// Cards use each cell's own saved banner image as its thumbnail — fetched in
// one shot from GET /activity-cells (list) rather than 16 separate requests —
// so the grid reads as a visual gallery of the real public pages, not a
// plain list of slugs.

const GROUP_THEME: Record<string, { accent: string; soft: string }> = {
  "academic-&-social-engagement-forums": { accent: "blue.500", soft: "blue.50" },
  "faculty-oriented-cells": { accent: "purple.500", soft: "purple.50" },
  "student-oriented-cells": { accent: "brand.orange", soft: "orange.50" },
};

export function ActivityCellsPage() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<Record<string, { title?: string; image?: string }>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getActivityCells()
      .then((res) => {
        const map: Record<string, { title?: string; image?: string }> = {};
        for (const item of res?.data ?? []) {
          map[item.cellId] = item.data?.bannerSection ?? {};
        }
        setBanners(map);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const groupNames = Object.keys(ACTIVITY_GROUPS);
  const totalCells = groupNames.reduce((sum, g) => sum + ACTIVITY_GROUPS[g].length, 0);

  return (
    <Stack gap={5}>
      <EditorHeader
        icon={CellsIcon}
        eyebrow="Activities"
        title="Activity Cells"
        subtitle="Click a cell to manage its own dedicated page."
        stats={[
          { value: totalCells, label: "Cells" },
          { value: groupNames.length, label: "Categories" },
        ]}
      />
      {error && <Callout tone="error">{error}</Callout>}

      {loading ? (
        <Spinner size="md" />
      ) : (
        <Stack gap={8}>
          {groupNames.map((group) => {
            const theme = GROUP_THEME[group] ?? { accent: "brand.navy", soft: "gray.50" };
            const cells = ACTIVITY_GROUPS[group];
            return (
              <Box key={group}>
                <SectionHead icon={GroupIcon} title={humanize(group)} subtitle={`${cells.length} cells in this category.`} />
                <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }} gap={4}>
                  {cells.map((cellId) => {
                    const banner = banners[cellId] ?? {};
                    // Card label always uses the humanized slug, not the saved
                    // banner title — several cells have legacy junk titles
                    // (e.g. "api::ncc.ncc", or the slug itself) from an old CMS
                    // migration. The real saved title is still fully visible
                    // and editable in the cell's own Banner panel; this is
                    // just reliable admin-chrome navigation, not page content.
                    const displayName = humanize(cellId);
                    return (
                      <Box
                        key={cellId}
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate(`/activity-cells/${cellId}`)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") navigate(`/activity-cells/${cellId}`);
                        }}
                        position="relative"
                        borderRadius="xl"
                        overflow="hidden"
                        cursor="pointer"
                        h="150px"
                        boxShadow="card"
                        border="1px solid"
                        borderColor="gray.100"
                        transition="transform 0.15s, box-shadow 0.15s"
                        _hover={{ transform: "translateY(-3px)", boxShadow: "0 12px 28px rgba(14,36,85,0.16)" }}
                        style={
                          banner.image
                            ? {
                                backgroundImage: `linear-gradient(180deg, rgba(14,36,85,0.15) 0%, rgba(14,36,85,0.88) 100%), url(${banner.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }
                            : undefined
                        }
                        bg={banner.image ? undefined : theme.soft}
                      >
                        {!banner.image && (
                          <Flex position="absolute" inset={0} align="center" justify="center" color={theme.accent} opacity={0.5}>
                            <GroupIcon size={40} />
                          </Flex>
                        )}
                        <Box position="absolute" top={0} left={0} w="4px" h="100%" bg={theme.accent} />
                        <Flex
                          position="absolute"
                          bottom={0}
                          left={0}
                          right={0}
                          direction="column"
                          p={3}
                          bg={banner.image ? "transparent" : "whiteAlpha.800"}
                        >
                          <Text
                            fontWeight={700}
                            fontSize="sm"
                            color={banner.image ? "white" : "brand.navy"}
                            truncate
                          >
                            {displayName}
                          </Text>
                          <Flex align="center" gap={1} color={banner.image ? "whiteAlpha.800" : "gray.500"} fontSize="2xs" mt="2px">
                            <Text>Manage page</Text>
                            <ArrowIcon size={12} />
                          </Flex>
                        </Flex>
                      </Box>
                    );
                  })}
                </Grid>
              </Box>
            );
          })}
          {totalCells === 0 && <EmptyState icon={CellsIcon} title="No activity cells configured" />}
        </Stack>
      )}
    </Stack>
  );
}
