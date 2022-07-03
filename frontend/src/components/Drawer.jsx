import DrawerItem from "./DrawerItem";
import {Drawer} from "@mantine/core";
import RouteContext from "../context/route/RouteContext";
import {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";


function ShoppingCartDrawer() {

    const {cart_opened, setCart_opened, tickets} = useContext(RouteContext)
    const navigate = useNavigate()

 /*   function calcSubtotal(){
        let tickets = JSON.parse(localStorage.getItem("tickets"));
        let sum = 0
        for(const ticket in tickets){
                let preis = ticket.tarif.preis * ticket.anzahl
                sum += preis
            }
        return sum
    }*/
    const handleClick = () => {
        if(tickets.length !== 0){
            navigate("/login")
        }

    }

    return(
        <Drawer
            opened={cart_opened}
            onClose={() => setCart_opened(false)}
            title="Warenkorb"
            padding="xl"
            size="xl"
            position="right"
        >
            <div className="container overflow-auto h-2/3">
            {tickets &&
                tickets.map((ticket, index)=>(
                    <DrawerItem ticket={ticket} index={index}></DrawerItem>))}
            </div>
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="mt-6">
                   <button onClick={handleClick} className="flex mx-auto items-center w-1/2 justify-center rounded-md border border-transparent bg-neutral-content px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-neutral-focus">
                        Checkout
                   </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                        oder <button type="button" className="font-medium text-accent hover:text-accent" onClick={()=>{setCart_opened(false)}}>Weiter Einkaufen<span aria-hidden="true"> </span></button>
                    </p>
                </div>
            </div>
        </Drawer>
    )

}

export default ShoppingCartDrawer