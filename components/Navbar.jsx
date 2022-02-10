import Link from "next/link";
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer, Icon } from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey, FiSun } from 'react-icons/fi';

const Navbar = () => (
    <Flex p='2' borderBottom='1px' borderColor='gray.100'>
        <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
            <Link href='/' paddingLeft='2'>Realtor</Link>
        </Box>
        <Spacer />
        <Box>
            <Menu>
                <MenuButton as={ IconButton } icon={ <FcMenu /> } variant='outlined' color='red.400' />
                <MenuList>
                    <Link href='/' passHref>
                        <MenuItem icon={<FcHome />} >Home</MenuItem>
                    </Link>
                    <Link href='/search' passHref>
                        <MenuItem icon={<BsSearch />} >Search</MenuItem>
                    </Link>
                    <Link href='/search?purpose=for-sale' passHref>
                        <MenuItem icon={<FcAbout />} >Buy Property</MenuItem>
                    </Link>
                    <Link href='/search?purpose=for-rent' passHref>
                        <MenuItem icon={<FiKey />} >Rent Property</MenuItem>
                    </Link>
                        {/* <MenuItem 
                            icon={<FiSun />} 
                            onClick={() => {
                                var text = document.getElementById('mode-text');
                                var element = document.body;
                                if(text.innerText == "Dark Mode"){
                                    text.innerText = "Light Mode";
                                    element.style.backgroundColor = "black";
                                }
                                else if(text.innerText == "Light Mode"){
                                    text.innerText = "Dark Mode";
                                    element.style.backgroundColor = "white";
                                }
                            }} 
                        >
                        <span id="mode-text">Dark Mode</span>
                        </MenuItem> */}
                </MenuList>
            </Menu>
        </Box>
    </Flex>
)

export default Navbar;

