import React, {useEffect, useState} from 'react'
import InquiryItem from "../components/InquiryItem";


function Inquiries(){

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [reload, setReload] = useState(false)


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
        <>
            <h1 className="font-medium leading-tight text-2xl p-6 text-center">Loading...</h1>
        </>
    ) : (
        <div className="container mx-auto">
            <button
                onClick={fetchInquiries}
                className="bg-base-200 hover:bg-base-300 font-bold py-2 px-4 rounded inline-flex items-center m-4 ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="p-2">Refresh</span>
            </button>
            {items.map((item) => (
                <InquiryItem item={item} key={item.anfrage_id} ></InquiryItem>
            ))}

        </div>
    )
}

export default Inquiries