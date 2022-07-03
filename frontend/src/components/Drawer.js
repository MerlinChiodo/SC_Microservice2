import DrawerItem from "./DrawerItem";
import {Drawer} from "@mantine/core";
import RouteContext from "../context/route/RouteContext";
import {useContext} from "react";
import {Link} from "react-router-dom";

function ShoppingCartDrawer() {

    const {cart_opened, setCart_opened, tickets} = useContext(RouteContext)
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
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p></p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                    <Link to="/login"
                       className="flex items-center justify-center rounded-md border border-transparent bg-neutral-content px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-neutral-content">Checkout</Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                        or <button type="button" className="font-medium text-accent hover:text-accent" onClick={()=>{setCart_opened(false)}}>Continue
                        Shopping<span aria-hidden="true"> &rarr;</span></button>
                    </p>
                </div>
            </div>
        </Drawer>
    )

}

export default ShoppingCartDrawer