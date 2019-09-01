import React, { useState, useRef, useEffect } from 'react'
import { useField } from '@rocketseat/unform'
import {MdCameraAlt} from 'react-icons/md'

import api from '~/services/api'

import { ImageContainer } from './styles'
export default function ImagePreviewInput({meetup}) {

    

    const { defaultValue, registerField } = useField("imagePreview");
    const [preview, setPreview] = useState(defaultValue ? defaultValue.url : null);
    const [file, setFile] = useState(defaultValue && defaultValue.id);

    if(meetup && !preview) {
        setFile(meetup.banner.id);
        setPreview(meetup.banner.url)
    }

    const ref = useRef();

    useEffect(() => {

        console.log("le ref", ref)
        if (ref.current) {
            registerField({
                name: "banner",
                ref: ref.current,
                path: "dataset.file"
            });
        }

    }, [ref])

    async function handleChange(e) {

        console.log("change 1111", e)

        const data = new FormData();
        data.append("file", e.target.files[0]);
        const response = await api.post("/files", data);
        const { id, url } = response.data;
        setFile(id);
        setPreview(url);
    }
    return (
        
            <label htmlFor="imagePreview">
                <input
                    type="file"
                    id="imagePreview"
                    accept="image/*"
                    data-file={file}
                    onChange={handleChange}
                    ref={ref}
                />
                <ImageContainer>
                    { preview ?  
                        <img src={preview} alt="" />
                        : 
                        ( 
                        <>
                            <MdCameraAlt size={30}/>
                            <strong>Selecionar Imagem agora</strong> 
                        </>
                        ) 
                    }
                    
                </ImageContainer>
            </label>
        
    )
}