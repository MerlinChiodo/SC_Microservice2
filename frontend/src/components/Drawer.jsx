import DrawerItem from "./DrawerItem";
import {Drawer} from "@mantine/core";
import RouteContext from "../context/route/RouteContext";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";


function ShoppingCartDrawer() {

    const {cart_opened, setCart_opened, tickets} = useContext(RouteContext)
    const navigate = useNavigate()

    function calcSubtotal() {
        let sum = 0
            for (const index in tickets) {
                if (tickets[index].tarif){
                    let preis = tickets[index].tarif.preis * tickets[index].anzahl
                    sum += preis
                }
            }
            return sum
        }

    const handleClick = () => {
        if (tickets) {
            if (tickets[0].tripInfo !== undefined) {
                console.log(tickets)
                navigate("/login")
            }
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
                <div>
                    <p className="font-semibold mt-2 mb-6">Gesamtbetrag: {calcSubtotal()}€</p>
                   <button onClick={handleClick} className="flex mx-auto items-center w-1/2 justify-center rounded-md border border-transparent bg-neutral-content px-6 py-3 text-base font-medium text-white shadow-sm hover:accent-purple-800">
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