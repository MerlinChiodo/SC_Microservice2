import React from 'react'
import ForumForm from "../components/ForumForm";


function CalendarEntryForm(){

    return(
        <div className="container mx-auto p-6">
            <h1 className="font-medium leading-tight text-2xl mb-6">Kalendereintrag</h1>
            <ForumForm eventType={"Calendar"}></ForumForm>
        </div>
    )
}
export default CalendarEntryForm