import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { MdMap } from "react-icons/md";
import Swal from "sweetalert2";

export function MapLocationControl({ label, value, onChange }: { label?: string; value: string; onChange: (v: string) => void }) {
  async function handleChange() {
    const { value: newUrl } = await Swal.fire({
      title: 'Google Maps Location',
      input: 'text',
      inputLabel: 'Enter the Google Maps Embed URL',
      inputValue: value,
      showCancelButton: true,
      confirmButtonColor: '#F6872A',
      cancelButtonColor: '#0e2455',
    });
    if (newUrl !== undefined) {
      onChange(newUrl.trim());
    }
  }


  return (
    <Box>
      {label && (
        <Text fontSize="xs" fontWeight={600} color="gray.500" mb={1}>
          {label}
        </Text>
      )}
      <Flex 
        gap={4} 
        align="center" 
        p={2} 
        borderWidth="1px" 
        borderColor="gray.200" 
        borderRadius="xl" 
        bg="gray.50"
      >
        <Box 
          w="120px" 
          h="68px" 
          borderRadius="lg" 
          overflow="hidden" 
          bg="gray.200" 
          flexShrink={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {value ? (
            <Flex direction="column" align="center" gap={1}>
               <MdMap size={24} color="#666" />
               <Text fontSize="8px" color="gray.500" fontWeight="bold">MAP URL</Text>
            </Flex>
          ) : (
            <MdMap size={24} color="#666" />
          )}
        </Box>
        <Box flex="1">
          <Flex align="center" gap={2} mb={1}>
            <Box w="8px" h="8px" borderRadius="full" bg={value ? "blue.500" : "gray.300"} />
            <Text fontSize="sm" fontWeight={700} color="gray.700">
              {value ? `Location Saved` : "No Location"}
            </Text>
          </Flex>
          <Text fontSize="xs" color="gray.500" mb={2} noOfLines={1} maxW="300px">
            {value ? "Map Link is active." : "Raw URL is hidden."}
          </Text>
          <Button 
            size="xs"
            variant="outline"
            borderColor="gray.300"
            bg="white"
            color="gray.700"
            _hover={{ bg: "gray.100" }}
            boxShadow="sm"
            onClick={handleChange}
          >
            {value ? "Change Location URL" : "Set Location URL"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
