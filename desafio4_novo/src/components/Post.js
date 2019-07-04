import React, { Component } from 'react';
import { render } from 'react-dom';

import Comment from './Comment';

import './Post.css'

class Post extends Component {


    render() {

        return (
        <div className="post_container">
            <div className="user_info">
                <div className="post_avatar"> (avata)</div>
                <div className="post_username">Usuario postagem</div>
                <div className="post_data">4 de julho de 2019</div>
            </div>
            <div className="post_msg">
                Temos que desenver uma facebook fake!
            </div>
            <Comment />

        </div>

        )
    }
}


export default Post;