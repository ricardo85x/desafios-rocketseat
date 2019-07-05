import React, { Component } from 'react'
import { render } from 'react-dom'

import './Comment.css'

function Comment({comentario}){

    let retorno =  []

    if (comentario.length == 0) {

        return <></>;

    } else {
        console.log("toma destraido")
        retorno.push(<hr/>)
    }

    retorno.push(comentario.map((item, i) => {

        return (
            <div key={ i + "_comment"} className="comments_container">

                    <div className="comment_item">

                        <div className="comment_avatar"> <img src={item.author.avatar} /> </div>
                        <div className="comment_msg">

                            <span className="comment_user">{item.author.name} </span> 
                            {item.content}

                        </div>
                    </div>

                </div>
            )
        })
    )

    return retorno;
  
}

export default Comment;