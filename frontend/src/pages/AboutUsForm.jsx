import React from 'react'
import {useState} from 'react'
import {postEvent} from "../eventController";


function AboutUsForm() {


    const handleSubmit = (e) => {
        e.preventDefault()
            postEvent('/event/updateAboutUs', {
                    event_id: 2003,
                    event_name: "Updated About US",
                    service_name: "stadtbus",
                    about_us: e.target.about_us.value,
                    date: new Date().toISOString(),
                    picture: "",
                    url: "http://" +e.target.website.value
                }
            ).then(res=> console.log(res))
    }

    return(
        <>
            <div className="container mx-auto p-6">
                <h1 className="font-medium leading-tight text-2xl mb-6">About Us</h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="website" className="mb-2 text-sm font-medium text-gray-900">
                        Website
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm ">
                          http://
                        </span>
                            <input
                                type="text"
                                name="website"
                                defaultValue={"vps2290194.fastwebserver.de:9720"}
                                minLength={2}
                                id="website"
                                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none rounded-r-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 "
                                placeholder="www.example.com"
                                required
                            />
                    </div>
                </div>
                <div>
                <label htmlFor="about_us" className="block mb-2 mt-6 text-sm font-medium text-gray-900 ">About Us Text</label>
                    <textarea
                          id="about_us"
                          minLength={2}
                          rows="4"
                          placeholder="About Us"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          required
                    >
                    </textarea>
                </div>
                <div>
                        <label className="block mb-2 mt-6 text-sm font-medium text-gray-900 ">Bildupload</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true">
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    <button type="submit"

                            className="btn-primary text-white mt-6  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit sm:w-auto px-5 py-2.5 text-center ">Veröffentlichen
                    </button>
            </form>
            </div>
        </>
    )

}

export default AboutUsForm