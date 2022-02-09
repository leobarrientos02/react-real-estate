
import { useEffect, useState } from "react";
import { Flex, Box, Text, Spinner, Icon, Button, Select, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from 'react-icons/md';
import Image from "next/image";

// Data for select and option
import { filterData, getFilterValues } from "../utils/filterData";
// API
import { baseUrl, fetchApi } from "../utils/fetchApi";
// Image
import noresult from '../assets/images/noresult.svg';

const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData);
    const [searchTerm, setSearchTerm] = useState('');
    const [locationData, setLocationData] = useState();
    const [showLocations, setShowLocation] = useState(false);
    const router = useRouter();
    
    
    const searchProperties = (filterValues) =>{
        const path = router.pathname;
        const { query } = router;

        const values = getFilterValues(filterValues);

        values.forEach((item) =>{
            query[item.name] = item.value;
        })

        router.push({ pathname: path, query })
    };

    useEffect(() =>{
        if(searchTerm != ""){
            const fetchData = async () =>{
                const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
                setLocationData(data?.hits);
            };

            fetchData();
        }
    }, [searchTerm]);
    
    return(
        <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
            {filters.map((filter) => (
                <Box key={filter.queryName}>
                    <Select 
                        placeholder={filter.placeholder}
                        w='fit-content'
                        p='2'
                        onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
                    >
                        {filter?.items?.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Box>
            ))}
            <Flex flexDir='column'>
                <Button onClick={() => setShowLocation(!showLocations)} border='1px' borderColor='gray.200' marginTop='2' >
                    Search Location
                </Button>
                {showLocations && (
                    <Flex flexDir='column' pos='relative' paddingTop='2'>
                        <Input 
                            placeholder="Type Here"
                            value={searchTerm}
                            w='300px'
                            focusBorderColor='gray.300'
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm !== "" && (
                            <Icon 
                                as={MdCancel}
                                pos='absolute'
                                cursor='pointer'
                                right='5'
                                top='5'
                                zIndex='100'
                                onClick={() => setSearchTerm('')}
                            />
                        )}
                        {showLocations && (
                            <Box height='300px' overflow='auto'>
                                {locationData?.map((location) => (
                                    <Box
                                        key={location.id}
                                        onClick={() => {
                                            searchProperties({ locationExternalIDs: location.externalID });
                                            setShowLocation(false);
                                            setSearchTerm(location.name);
                                        }}
                                    >
                                        <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100'>
                                            {location.name}
                                        </Text>
                                    </Box>
                                ))}
                                { !locationData?.length && (
                                    <Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='5' marginBottom='5' >
                                        <Image src={noresult} alt='No Result :(' />
                                        <Text fontSize='xl' marginTop='3'>
                                            Waiting to search!
                                        </Text>
                                    </Flex>
                                )}
                            </Box>
                        )}
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

export default SearchFilters;