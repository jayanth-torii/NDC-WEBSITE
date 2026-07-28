import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../auth/AuthContext";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <Box maxW="800px" mx="auto">
      <Heading size="xl" color="brand.navy" fontWeight={700} mb={5}>
        Admin Profile
      </Heading>
      <Box bg="white" borderRadius="md" boxShadow="card" overflow="hidden">
        <Box h="140px" bgGradient="to-r" gradientFrom="brand.navy" gradientTo="#1a365d" />
        <Box textAlign="center" mt="-60px" px={6} pb={6}>
          <Box
            w="120px"
            h="120px"
            mx="auto"
            borderRadius="full"
            border="4px solid white"
            boxShadow="0 4px 12px rgba(0,0,0,0.15)"
            bg="brand.orange"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="48px"
            fontWeight="bold"
          >
            {user?.name?.charAt(0) || "A"}
          </Box>
          <Heading size="lg" mt={4} fontWeight="bold">
            {user?.name || "Admin User"}
          </Heading>
          <Text color="gray.500">{user?.role || "Administrator"}</Text>

          <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4} mt={8} textAlign="left">
            <Box p={4} borderWidth="1px" borderColor="gray.100" borderRadius="md" bg="gray.50">
              <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide">
                Email Address
              </Text>
              <Text fontWeight={500} mt={1}>
                {user?.email || "Not provided"}
              </Text>
            </Box>
            <Box p={4} borderWidth="1px" borderColor="gray.100" borderRadius="md" bg="gray.50">
              <Text fontSize="xs" color="gray.500" textTransform="uppercase" letterSpacing="wide">
                Role
              </Text>
              <Text fontWeight={500} mt={1}>
                {user?.role || "Admin"}
              </Text>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
