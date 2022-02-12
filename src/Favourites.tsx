import {
    Button,
    Center,
    Code,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure
} from "@chakra-ui/react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/store";
import Quote, {CurrentQuote} from "./models/qoutes";
import {setCurrentQuote} from "./store/historySlice";


function QuoteElement(quote : Quote) {

    let shortQuote = quote.text.length  > 25 ? quote.text.slice(0,15).concat("...")  : quote.text;

    if(quote.author != null) {
        let authorInitials = quote.author.split(" ");

        let firstInitial = authorInitials[0].slice(0, 1);
        let lastInitial = authorInitials.length - 1 > 0 ? authorInitials[authorInitials.length - 1].slice(0, 1) : "";
        return <>
            <Code colorScheme={'white'} id={'text'}>{shortQuote}</Code>


            <Code ml={"20px"}  colorScheme={'blue'} id={'author'}>{firstInitial}{lastInitial && "."}{lastInitial}</Code>
        </>;
    }
    else{
        return <> <Code colorScheme={'white'} id={'text'}>{shortQuote}</Code>

            <Code ml={"20px"} colorScheme={'gray'} id={'author'}>Unknown</Code>
        </>
    }
}

export default function Favourites(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const QuoteMachine = useSelector((state : RootState)=> state.history.allQuotes)
    const favouriteQuotes = useSelector((state : RootState)=> state.history.favouriteQuotes)
    const dispatch = useDispatch();

    return (
        <>
            <Button colorScheme='teal' onClick={onOpen}>
        Favourites
        </Button>
        <Drawer

    isOpen={isOpen}
    placement='right'
    onClose={onClose}
        >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
        <DrawerHeader>Favourite quotes</DrawerHeader>

    <DrawerBody>
        {favouriteQuotes.map((x) => {
            let quote = QuoteMachine[x];
            return (<Center key={x} height='50px' onClick={() =>{
                let currentQuoteClicked: CurrentQuote = {
                    id: x,
                    quote: quote
                }
                dispatch(setCurrentQuote(currentQuoteClicked))
            }}>
                {QuoteElement(quote)}
            </Center>)
        })}
    </DrawerBody>

    <DrawerFooter>
    <Button variant='outline' mr={3} onClick={onClose}>
        Cancel
        </Button>

        </DrawerFooter>
        </DrawerContent>
        </Drawer>
        </>
)
}