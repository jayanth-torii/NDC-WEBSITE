import { Flex, Link, Text } from "@chakra-ui/react";
import { FOOTER_HEIGHT } from "./LayoutContext";
import ndcLogo from "../../assets/NDC-Logo.png";
import toriiLogo from "../../assets/torii-minds-logo.png";

// Mirrors NCET admin's VerticalLayout/Footer.js — the `.admin-footer`
// override class NCET actually renders with (_footer.scss), a dark bar
// (#253443), not the generic light `.footer` template default.
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <Flex
      as="footer"
      minH={FOOTER_HEIGHT}
      bg="brand.footerDark"
      align="center"
      justify="space-between"
      flexWrap="wrap"
      gap={2}
      px={4}
      py={2}
    >
      <Flex align="center" gap={3}>
        <Flex
          w="auto"
          h="35px"
          align="center"
          justify="center"
          flexShrink={0}
        >
          <img src={ndcLogo} alt="NDC Logo" style={{ maxHeight: "35px", objectFit: "contain" }} />
        </Flex>
        <Text fontSize="0.85rem" color="rgba(255,255,255,0.8)">
          © {year} <Text as="b" color="white">Nagarjuna Degree College</Text>. All Rights Reserved.
        </Text>
      </Flex>
      <Link
        href="https://toriiminds.com/"
        target="_blank"
        rel="noopener noreferrer"
        display="flex"
        alignItems="center"
        gap={2}
        textDecoration="none"
        _hover={{ textDecoration: "none" }}
      >
        <Text fontSize="0.8rem" color="rgba(255,255,255,0.65)">
          Powered by
        </Text>
        <img src={toriiLogo} alt="Torii Minds" style={{ height: "26px", marginLeft: "4px" }} />
      </Link>
    </Flex>
  );
}
