import React, {useEffect, useState} from 'react'
import InquiryItem from "./InquiryItem";

function Inquiries(){

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const fetchInquiries = async () => {
        const response = await fetch("/inquiry/getAllInquiries")
        const data = await response.json()
        setItems(data.msg)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchInquiries()
    }, [])



    return isLoading ? (

        <h1 className="font-medium leading-tight text-2xl p-6 text-center">Loading...</h1>
    ) : (
        <div className="container mx-auto">
            {items.map((item) => (
                <InquiryItem item={item}></InquiryItem>
            ))}
        </div>
    )
}

export default Inquiries