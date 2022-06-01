import React from 'react'
import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { DatePicker } from '@mantine/dates';
import { Calendar } from 'tabler-icons-react';

const schema = z.object({
    title: z.string().min(2, { message: 'Title should have at least 2 letters' }),
    short_description: z.string().min(2, { message: 'Short description should have at least 2 letters' }),

})



function CalendarEntryForm(){

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            title: '',
            short_description: '',
            date: ''
        },
    });

    return(
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <div className="flex flex-row ml-6 mt-6 mr-6">
                    <div className="grow">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Titel</label>
                        <input type="text" id="titel"
                               className="basis-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Titel" required
                               {...form.getInputProps('title')}
                        />
                    </div>
                    <div className="ml-6">
                        <label htmlFor="message" className="block mb-3 text-sm font-medium text-gray-900 dark:text-gray-300">Datum</label>
                        <DatePicker
                                    placeholder="Datum auswählen"
                                    allowFreeInput
                                    inputFormat="DD/MM/YYYY"
                                    icon={<Calendar size={16}/>}
                                    {...form.getInputProps('date')}
                        ></DatePicker>
                    </div>
                </div>
                <div className="m-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kurzbeschreibung</label>
                    <input type="text" id="short_description"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Kurzbeschreibung" required
                           {...form.getInputProps('short_description')}
                    />
                </div>
                <div className="m-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Langbeschreibung</label>
                    <textarea id="long_description" rows="4"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Langbeschreibung">

                    </textarea>
                </div>


                <button type="submit"
                        className="text-white m-6 btn-primary hover:btn-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit sm:w-auto px-5 py-2.5 text-center dark:btn-primary dark:hover:btn-primary dark:focus:ring-blue-800">Veröffentlichen
                </button>
            </form>
    )
}

export default CalendarEntryForm
