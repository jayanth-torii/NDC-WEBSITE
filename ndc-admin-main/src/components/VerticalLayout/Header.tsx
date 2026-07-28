import { Link } from "react-router-dom";
import { Box, Flex, Heading, IconButton, Menu, Portal, Text } from "@chakra-ui/react";
import { MdMenu as MenuIcon, MdPerson as PersonIcon, MdLogout as LogoutIcon } from "react-icons/md";
import Swal from "sweetalert2";
import { useAuth } from "../../auth/AuthContext";
import { useLayout, HEADER_HEIGHT, SIDEBAR_WIDTH } from "./LayoutContext";
import ndcLogo from "../../assets/NDC-Logo.png";

// Mirrors NCET admin's Header.js: brand box + burger toggle + heading +
// profile dropdown. #page-topbar: white bg, fixed, box-shadow "topbar" token
// (_topbar.scss's exact value) — topbarTheme default is "light" in NCET.
export function Header() {
  const { user, logout } = useAuth();
  const { toggle } = useLayout();

  function handleLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your admin session.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f6872a",
      cancelButtonColor: "#0e2455",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) logout();
    });
  }

  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      h={HEADER_HEIGHT}
      bg="white"
      boxShadow="topbar"
      zIndex={1002}
      align="center"
      justify="space-between"
      pr={4}
    >
      <Flex align="center" h="100%">
        <Flex w={{ base: "auto", lg: SIDEBAR_WIDTH }} px={4} align="center" justify="center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Flex
              w="auto"
              h="50px"
              align="center"
              justify="center"
            >
              <img src={ndcLogo} alt="NDC Logo" style={{ maxHeight: "50px", maxWidth: "180px", objectFit: "contain" }} />
            </Flex>
          </Link>
        </Flex>
        <IconButton aria-label="Toggle sidebar" variant="ghost" onClick={toggle} color="brand.navy">
          <MenuIcon size={22} />
        </IconButton>
        <Box display={{ base: "none", sm: "block" }} ml={2}>
          <Heading as="h4" size="md" fontWeight={600} color="brand.navy" letterSpacing="0.3px">
            NDC Administration Panel
          </Heading>
        </Box>
      </Flex>

      <Menu.Root>
        <Menu.Trigger asChild>
          <Flex
            as="button"
            align="center"
            gap={2}
            px={3}
            py={2}
            borderRadius="sm"
            _hover={{ bg: "gray.100" }}
            cursor="pointer"
          >
            <Flex
              w="32px"
              h="32px"
              borderRadius="full"
              bg="brand.orange"
              color="white"
              align="center"
              justify="center"
              fontWeight={700}
              fontSize="14px"
            >
              {(user?.name || "A")[0].toUpperCase()}
            </Flex>
            <Text fontWeight={500}>{user?.name}</Text>
          </Flex>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="profile" asChild>
                <Link to="/profile">
                  <PersonIcon size={16} style={{ marginRight: 8 }} />
                  Profile
                </Link>
              </Menu.Item>
              <Menu.Separator />
              <Menu.Item value="logout" color="red.500" onClick={handleLogout}>
                <LogoutIcon size={16} style={{ marginRight: 8 }} />
                Log out
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Flex>
  );
}
