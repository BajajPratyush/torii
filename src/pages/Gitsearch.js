import React from 'react';
import {  Flex , Input , Box , Text, Grid ,  useMediaQuery, Spacer, Button }from "@chakra-ui/react"

import axios from 'axios';


import Card from "../Comp/Card";
import Options from '../Comp/Option';
import Skeletons from '../Comp/Skeleton';
import { FaPlus } from 'react-icons/fa';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import {Link} from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';

function Gitsearch(props) {
    const [check] = useMediaQuery("(min-width: 1025px)")
    const [data ,setData]  = React.useState(null);
    const [searchTerm , setSearchTeam] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState(null);
    const getata = async() =>{
        var res = await axios.get('https://toriii.herokuapp.com/org')
        setData(res.data);
    }
    React.useEffect(getata,[]);

    return (
        <>
        <Box >
        <Flex align="center"  flexDirection={check ?  "row"  : "column"}  background="" >
        <div alignSelf="center"  position="absolute" >
        <Text
                     align="center"
                     ml={check ? "150" : "0"}
                     mt={check ? "-300" : "10"}
                     bgGradient="linear(to-l, cyan.300 ,#d391fa)"
                     bgClip="text"
                       fontSize="3xl"
                       fontWeight="extrabold"
                    //    position="absolute"

            >
               Your first Open Source Contribution made easy 
            </Text>
            <Text
                     align="center"
                     ml={check ? "150" : "0"}
                     mt={check ? "100" : "10"}
                     bgGradient="linear(to-l, #7928CA,#FF0080)"
                       bgClip="text"
                       fontSize="xl"
                       fontWeight="extrabold"
                    //    position="absolute"
                       >
                            Select a language or technology and start contributing : ) to
            </Text>
            <Text
                     align="center"
                     ml={check ? "150" : "0"}
                     mt={check?"0":"10"}
                     bgGradient="linear(to-l, #7928CA,#FF0080)"
                     
                     bgClip="text"
                     fontSize="5xl"
                     fontWeight="extrabold"
                     >
                 Open Source
            </Text>
            </div>
            <Spacer></Spacer>
           <img src="https://inchilly.sirv.com/Images/jungle-searching-1.png" height="70%" width={check?"50%":"100%"}   lazyload="off" />

        </Flex>
        <Flex>
           {/* {searchTerm} */}
            <Input placeholder="🔎Search" margin="1.5%" onChange={event => setSearchTeam(event.target.value)} />

            <Options  value={selectedValue} handleChange={event => setSelectedValue(event.target.value)} />
        </Flex>
        <SignedIn>
            <Link to="/addOrgination">
            <Button position="fixed" right="5%" bottom="5%" borderRadius="25" >
            <FaPlus/>
        </Button>
            </Link>
        </SignedIn>
        <SignedOut>

        <Button position="fixed" right="5%" bottom="5%" borderRadius="25" onClick={()=>(toast('You need to sign in to add a Repo/Orgination',{
    duration: 6000,  
      icon:'😞'
  }
  ))}>
            <FaPlus/>
        </Button>
        </SignedOut>
     {data ?  
     <>
      <Grid margin={check?"5%": "10%"}
          ml={check?"5%":"10%"}
          mr={check?"5%":"10%"}

         templateColumns={check ? "repeat(3,90fr)" : "repeat(1,80fr"}>  
         {
          data.filter(
              value =>{

                  if(searchTerm==""){
                      return value;
                  }else if(value.name.toLowerCase().includes(searchTerm.toLowerCase())){
                      return value;

                  }else{

                  }

                  if(selectedValue==""){
                      return value;
                  }else if((value.tags.indexOf(selectedValue)) !== -1){
                      return value;
                  }
              }
          ).filter(
            value =>{

              

                if(selectedValue==""||selectedValue==null){
                    return value;
                }else if((value.tags.indexOf(selectedValue)) !== -1){
                    return value;
                }
            }
          ).map(x =>
            
            <Card  
            ImgUrl={x.imageSrc} 
            MainText={x.name}
            Lang={x.tags}
          Des={x.description}
          Linki={x.projectLink}
          id={x._id}
          
          >

         </Card> 
         )
         } 
        </Grid>

     </>     
     :
    <>
    <Skeletons/>
    </>
     }
       
            
     </Box>
     <Toaster/>
        </>
    );
}

export default Gitsearch;