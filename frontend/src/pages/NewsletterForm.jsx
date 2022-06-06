import React from 'react'
import ForumForm from "../components/ForumForm";


function NewsletterForm(){

    return(

        <div className="container mx-auto p-6">
            <h1 className="font-medium leading-tight text-2xl mb-6">Newsletter Artikel</h1>
            <ForumForm eventType={"Newsletter"}></ForumForm>
        </div>

    )
}
export default NewsletterForm