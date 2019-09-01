import React, { useState, useRef, useEffect } from 'react'
import { useField } from '@rocketseat/unform'
import DatetimeElement from 'react-datetime'

export default function InputDateTime() {

    const { defaultValue, registerField,error } = useField("InputDateTime");
    const [date, setDate] = useState(defaultValue && defaultValue);

    const ref = useRef();

    useEffect(() => {

        if (ref.current) {
            registerField({
                name: "date",
                ref: ref.current,
                path: "dataset.date"
            });
        }

    }, [ref])

    function handleChange(e){
        setDate(e._d)
    }
    
    return (
        <>
            <input  
                ref={ref} 
                data-date={date} 
                onChange={handleChange} 
                type="hidden"
                name="input_date" 
                id="input_date"  
            />
            <DatetimeElement   
                dateFormat="DD/MM/YYYY"   
                onChange={handleChange}  
                timeFormat="HH:mm"
                timeConstraints={
                    { 
                        hours: { 
                            min: 0,
                            max: 23 
                        }, 
                        minutes: { 
                            min: 0, 
                            max: 59,
                            step: 30
                        },
                    }
                }
                isValidDate={
                    (currentDate) => 
                        currentDate.isAfter(DatetimeElement.moment().subtract(1, 'day'))  
                }
                inputProps={{placeholder: 'Data do meetup'} } 
                defaultValue="" 
                locale="pt"
            />
            {error && <span>{error}</span>}
        </>                
    )
}