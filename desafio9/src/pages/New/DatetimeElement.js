import React, { useState, useRef, useEffect } from 'react'
import { useField } from '@rocketseat/unform'

import { DatetimeElement } from './styles'
export default function ImagePreviewInput() {

    // const { defaultValue, registerField } = useField("imagePreview");
    const { defaultValue, registerField } = useField("InputDateTime");
    const [preview, setPreview] = useState(defaultValue ? defaultValue : new Date());
    const [date, setDate] = useState(defaultValue && defaultValue.id);

    const ref = useRef();

    useEffect(() => {

        console.log("le ref", ref)
        if (ref.current) {
            registerField({
                name: "date",
                ref: ref.current,
                path: "value"
            });
        }

    }, [ref])

    async function handleChange(e) {
        setDate(e);
    }

    return (

        <DatetimeElement ref={ref}   dateFormat="DD/MM/YYYY"   onChange={date => {setDate(date._d)  }}  isValidDate={(currentDate) => currentDate.isAfter(DatetimeElement.moment().subtract(2, 'day'))  } inputProps={{placeholder: 'Data do meetup', name: 'date'} } defaultValue="" locale="pt"/>

        
                // <input
                //     type="file"
                //     id="input_preview"
                //     name="input_preview"
                //     accept="image/*"
                //     data-batata={file}
                //     data-date={file}
                //     onChange={handleChange}
                //     ref={ref}
                // />
                
        
    )
}