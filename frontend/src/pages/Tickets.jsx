import {Accordion, NumberInput, useAccordionState} from "@mantine/core";
import {DatePicker} from "@mantine/dates";
import {Calendar} from "tabler-icons-react";

function Tickets() {

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const [state, handlers] = useAccordionState({ total: 2, initialItem: 0 });

    return(
        <div className="container mx-auto 2xl p-6 bg-base-100">
            <Accordion
                state={state}
                onChange={handlers.setState}
                styles={{item: {maxWidth: 672, marginLeft: "auto", marginRight: "auto"}}}
                iconPosition="right">
                <Accordion.Item label="Gruppenticket">
                    <div className="container mx-auto">
                        <div className="font-medium text-sm">Gruppenticket gültig im Stadtgebiet Münster</div>
                        <form onSubmit={handleSubmit} className="p-4 flex flex-col">
                            <DatePicker
                                styles={{input: {borderRadius: 10, height: "auto", lineHeight: 2.5},}}
                                icon={<Calendar size={16}/>}
                                placeholder="Datum auswählen"
                                required
                                label="Geltungstag"
                                defaultValue={new Date()}>
                            </DatePicker>
                            <NumberInput
                                styles={{input: {borderRadius: 10, height: "auto", lineHeight: 2.5}}}
                                defaultValue={1}
                                label="Personenanzahl"
                                required
                            />
                            <button type='submit' className="btn-secondary rounded-lg text-white mt-4 btn-sm mx-auto">Ticket kaufen</button>
                        </form>
                    </div>
                </Accordion.Item>
                <Accordion.Item label="StadtTicket">
                    <div className="container mx-auto">
                        <div className="font-medium text-sm">Gruppenticket gültig im Stadtgebiet Münster</div>
                        <form onSubmit={handleSubmit} className="p-4 flex flex-col">
                            <DatePicker
                                styles={{input: {borderRadius: 10, height: "auto", lineHeight: 2.5},}}
                                icon={<Calendar size={16}/>}
                                placeholder="Datum auswählen"
                                required
                                label="Geltungstag"
                                defaultValue={new Date()}>
                            </DatePicker>
                            <NumberInput
                                styles={{input: {borderRadius: 10, height: "auto", lineHeight: 2.5}}}
                                defaultValue={1}
                                label="Personenanzahl"
                                required
                            />
                            <button type='submit' className="btn-secondary rounded-lg text-white mt-4 btn-sm mx-auto">Ticket kaufen</button>
                        </form>
                    </div>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Tickets