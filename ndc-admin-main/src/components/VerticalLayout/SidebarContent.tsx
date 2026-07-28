import type { ComponentType } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  MdSpaceDashboard as DashboardIcon,
  MdSettings as SettingsIcon,
  MdHome as HomeIcon,
  MdInfo as InfoIcon,
  MdHowToReg as HowToRegIcon,
  MdGroups as GroupsIcon,
  MdAssignment as AssignmentIcon,
  MdSchool as SchoolIcon,
  MdContactMail as ContactMailIcon,
  MdApartment as ApartmentIcon,
  MdTune as TuneIcon,
  MdCollections as CollectionsIcon,
  MdLightbulb as LightbulbIcon,
  MdVerified as VerifiedIcon,
  MdLocalLibrary as LocalLibraryIcon,
  MdQuiz as QuizIcon,
  MdScience as ScienceIcon,
  MdForum as ForumIcon,
  MdMenuBook as MenuBookIcon,
  MdSportsSoccer as SportsIcon,
  MdGroup as GroupIcon,
  MdEventNote as EventNoteIcon,
  MdCampaign as CampaignIcon,
  MdArticle as ArticleIcon,
  MdMarkunreadMailbox as MarkunreadMailboxIcon,
} from "react-icons/md";
import { API_ROUTES } from "../../services/route";

type NavItem = { label: string; to: string; icon: ComponentType<{ size?: number }> };

// Same page list as before, restyled to match NCET's #sidebar-menu exactly
// (icon + label rows, grouped by .menu-title sections, orange active/hover).
const NAV_GROUPS: { title?: string; items: NavItem[] }[] = [
  {
    items: [
      { label: "Dashboard", to: "/", icon: DashboardIcon },
      { label: "Site Settings", to: "/site-settings", icon: SettingsIcon },
    ],
  },
  {
    title: "Pages",
    items: [
      { label: "Home Page", to: `/page/home/${encodeURIComponent(API_ROUTES.HOME.GET)}`, icon: HomeIcon },
      { label: "About NDC", to: "/about-ndc", icon: InfoIcon },
      { label: "Admissions", to: "/admissions", icon: HowToRegIcon },
      { label: "Alumni", to: "/alumni", icon: GroupsIcon },
      { label: "Apply Now Page", to: `/page/apply-now-page/${encodeURIComponent(API_ROUTES.APPLY_NOW_PAGE.GET)}`, icon: AssignmentIcon },
      { label: "Certificate Courses", to: `/page/certificate-courses/${encodeURIComponent(API_ROUTES.CERTIFICATE_COURSES.GET)}`, icon: SchoolIcon },
      { label: "Contact Us Page", to: `/page/contact-us-page/${encodeURIComponent(API_ROUTES.CONTACT_US_PAGE.GET)}`, icon: ContactMailIcon },
    ],
  },
  {
    title: "Departments",
    items: [
      { label: "Departments (overview)", to: `/page/departments-page/${encodeURIComponent(API_ROUTES.DEPARTMENTS_PAGE.GET)}`, icon: ApartmentIcon },
      { label: "Department Details Editor", to: "/department-details-editor", icon: TuneIcon },
    ],
  },
  {
    title: "More pages",
    items: [
      { label: "Gallery", to: "/gallery", icon: CollectionsIcon },
      { label: "IIC", to: "/iic", icon: LightbulbIcon },
      { label: "IQAC", to: "/iqac", icon: VerifiedIcon },
      { label: "Library", to: "/library", icon: LocalLibraryIcon },
      { label: "Question Bank", to: "/question-bank", icon: QuizIcon },
      { label: "Research", to: `/page/research/${encodeURIComponent(API_ROUTES.RESEARCH.GET)}`, icon: ScienceIcon },
      { label: "Research Forum", to: `/page/research-forum/${encodeURIComponent(API_ROUTES.RESEARCH_FORUM.GET)}`, icon: ForumIcon },
      { label: "Samashti", to: `/page/samashti/${encodeURIComponent(API_ROUTES.SAMASHTI.GET)}`, icon: MenuBookIcon },
      { label: "Sports", to: `/page/sports/${encodeURIComponent(API_ROUTES.SPORTS.GET)}`, icon: SportsIcon },
      { label: "Students", to: `/page/students/${encodeURIComponent(API_ROUTES.STUDENTS.GET)}`, icon: GroupIcon },
    ],
  },
  {
    title: "Activities",
    items: [
      { label: "Activities (overview)", to: `/page/activities-page/${encodeURIComponent(API_ROUTES.ACTIVITIES_PAGE.GET)}`, icon: EventNoteIcon },
      { label: "Activity Cells (16)", to: "/activity-cells", icon: GroupsIcon },
    ],
  },
  {
    title: "Blog",
    items: [
      { label: "Blog Banner", to: `/page/blog-banner/${encodeURIComponent(API_ROUTES.BLOG_BANNER.GET)}`, icon: CampaignIcon },
      { label: "Blog Posts", to: "/blogs", icon: ArticleIcon },
    ],
  },
  {
    title: "Enquiries",
    items: [
      { label: "Apply Now Submissions", to: "/submissions/apply-now-forms", icon: MarkunreadMailboxIcon },
      { label: "Contact Us Submissions", to: "/submissions/contact-us-forms", icon: MarkunreadMailboxIcon },
    ],
  },
];

export function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <Box py="10px" pb="30px">
      {NAV_GROUPS.map((group, i) => (
        <Box as="ul" key={i} listStyleType="none" m={0} p={0}>
          {group.title && !collapsed && (
            <Text
              as="li"
              px="20px"
              py="12px"
              fontSize="10px"
              fontWeight={600}
              textTransform="uppercase"
              letterSpacing="0.05em"
              color="rgba(255,255,255,0.45)"
              cursor="default"
            >
              {group.title}
            </Text>
          )}
          {group.items.map((item) => {
            const Icon = item.icon;
            return (
              <Box as="li" key={item.to} listStyleType="none">
                <NavLink to={item.to} end style={{ textDecoration: "none" }}>
                  {({ isActive }) => (
                    <Flex
                      align="center"
                      gap={3}
                      px="20px"
                      py="11px"
                      fontSize="13.3px"
                      color={isActive ? "white" : "rgba(255,255,255,0.75)"}
                      bg={isActive ? "brand.sidebarActiveBg" : "transparent"}
                      borderLeft="3px solid"
                      borderLeftColor={isActive ? "brand.orange" : "transparent"}
                      fontWeight={isActive ? 600 : 400}
                      transition="all 0.2s"
                      justify={collapsed ? "center" : "flex-start"}
                      _hover={{ color: "brand.orange", bg: "rgba(255,255,255,0.04)" }}
                    >
                      <Icon size={16} />
                      {!collapsed && <span>{item.label}</span>}
                    </Flex>
                  )}
                </NavLink>
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
}
