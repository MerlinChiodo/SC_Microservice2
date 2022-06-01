import React from 'react'


function NewsletterForm(){

    return(
        <form>
            <div className="m-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Titel</label>
                <input type="text" id="titel"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Titel" required/>
            </div>
            <div className="m-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kurzbeschreibung</label>
                <input type="text" id="kurzbeschreibung"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Kurzbeschreibung" required/>
            </div>
            <div className="m-6">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Langbeschreibung</label>
                <textarea id="message" rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Langbeschreibung"></textarea>
            </div>
            <button type="submit"
                    className="text-white ml-6 mb-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Veröffentlichen
            </button>
        </form>
    )
}
export default NewsletterForm