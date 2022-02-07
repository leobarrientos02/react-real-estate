import { Box } from "@chakra-ui/react";

const d = new Date();
const Footer = () => (
    <Box textAlign='center' color='gray.600' borderTop='1px' borderColor='gray.100'>
        2021-{d.getFullYear()} Realtor, Inc.
    </Box>
)

export default Footer;
