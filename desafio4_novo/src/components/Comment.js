import React, { Component } from 'react'
import { render } from 'react-dom'

import './Comment.css'

class Comment extends Component {

    render() {

        return (

            <div className="comments_container">

                <div className="comment_item">

                    <div className="comment_avatar"> (avatar) </div>
                    <div className="comment_msg">

                        <span className="comment_user">Ricardo F</span>
                        Este é o quarto desafio da rocketseat feito em react.

                    </div>
                </div>

            </div>

        )
    }
}

export default Comment;