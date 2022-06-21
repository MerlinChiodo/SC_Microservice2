import React from 'react'
import {useState} from "react";
import {postEvent} from "../eventController";
import {useForm, zodResolver} from "@mantine/form";
import {DatePicker} from "@mantine/dates";
import {Calendar} from "tabler-icons-react";
import {z} from "zod";

const schema = z.object({
    title: z.string().min(2, { message: 'Title should have at least 2 letters' }),
    short_description: z.string().min(2, { message: 'Short description should have at least 2 letters' }),
    date: z.date(),
    long_description: z.string().optional()
})

function CalendarEntryForm(){


    const [btnDisable, setBtnDisable] = useState(true)

    const handleChange = (event) =>{
        form.setFieldValue(`${event.currentTarget.id}`, event.currentTarget.value)
        if (!(form.validate().hasErrors)){
            setBtnDisable(false)
        }
    }

    const handleSubmit = (e) => {
                postEvent("/event/sendCalendarEntry", {
                    event_id: 2002,
                    event_name: "newServicePost",
                    service: "stadtbus",
                    title: form.values.title,
                    short_description: form.values.short_description,
                    long_description: form.values.long_description,
                    picture_url: "mopo",
                    event_on: form.values.date.toISOString()
        })
    }


    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            title: 'Events im Stadtbus',
            short_description: "",
            long_description: "",
            date: new Date()
        },
    });

    return(
    <div className="container mx-auto p-6">
        <h1 className="font-medium leading-tight text-2xl mb-6">Kalendereintrag</h1>
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="flex ">
                <div className="flex-1">
                    <label htmlFor="title"
                           className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Titel</label>
                    <input type="text"
                           id="title"
                           minLength={2}
                           className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Titel"
                           required
                           value={form.values.title}
                           onChange={handleChange}
                    />
                </div>
                <div className="flex-initial ml-10">
                    <label htmlFor="datepicker" className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Datum</label>
                    <DatePicker id="datepicker"
                                placeholder="Datum auswählen"
                                allowFreeInput
                                inputFormat="DD/MM/YYYY"
                                icon={<Calendar size={16}/>}
                                {...form.getInputProps('date')}
                    ></DatePicker>
                </div>
            </div>
            <div className="mt-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kurzbeschreibung</label>
                <input type="text"
                       id="short_description"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Kurzbeschreibung"
                       required
                       minLength={2}
                       value={form.values.short_description}
                       onChange={handleChange}
                />
            </div>
            <div className="mt-6">
                <label htmlFor="long_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Langbeschreibung</label>
                <textarea id="long_description"
                          rows="4"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Langbeschreibung"
                          value={form.values.long_description}
                          onChange={handleChange}
                >
                    </textarea>
            </div>
            <div className="mt-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bildupload</label>
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
                    disabled={btnDisable}
                    className="text-white mt-6 btn-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit sm:w-auto px-5 py-2.5 text-center dark:btn-primary dark:hover:btn-primary dark:focus:ring-blue-800">Veröffentlichen
            </button>
        </form>
    </div>
    )
}
export default CalendarEntryForm