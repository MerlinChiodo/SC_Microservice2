import React from 'react'

function InquiryItem({item}){

    return(
        <div>
        <div className="p-2 w-full bg-white border shadow-md sm:p-8 dark:bg-base-100 dark:border-base-100">
            <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Anfrage {item.anfrage_id}</h5>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-500">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p  className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Ticketart
                                </p>
                                <p  className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {item.ticket.ticket_art}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Institution
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {item.institution}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Verantwortlicher
                                </p>
                                <p  className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {item.verantwortlicher}
                                </p>
                            </div>
                        </div>
                    </li>

                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Anzahl der Passagiere
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {item.anzahlPassagiere}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="pt-3 pb-0 sm:pt-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Geltungstag
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {item.ticket.geltungstag}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    )
}

export default InquiryItem