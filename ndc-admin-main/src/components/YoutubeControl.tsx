import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { MdVideocam } from "react-icons/md";
import Swal from "sweetalert2";

export function YoutubeControl({ label, value, onChange }: { label?: string; value: string; onChange: (v: string) => void }) {
  async function handleChange() {
    const { value: newId } = await Swal.fire({
      title: 'YouTube Video ID',
      input: 'text',
      inputLabel: 'Enter the YouTube Video ID (e.g. Md4YuxJ0sBQ)',
      inputValue: value,
      showCancelButton: true,
      confirmButtonColor: '#F6872A',
      cancelButtonColor: '#0e2455',
    });
    if (newId !== undefined) {
      onChange(newId.trim());
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
          bg="black" 
          flexShrink={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {value ? (
            <img 
              src={`https://img.youtube.com/vi/${value}/mqdefault.jpg`} 
              alt="YouTube Thumbnail"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <MdVideocam size={24} color="#666" />
          )}
        </Box>
        <Box flex="1">
          <Flex align="center" gap={2} mb={1}>
            <Box w="8px" h="8px" borderRadius="full" bg={value ? "red.500" : "gray.300"} />
            <Text fontSize="sm" fontWeight={700} color="gray.700">
              {value ? `YouTube Video` : "No Video"}
            </Text>
          </Flex>
          <Text fontSize="xs" color="gray.500" mb={2}>
            Preview shown above. Raw ID is hidden.
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
            {value ? "Change Video ID" : "Set Video ID"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
