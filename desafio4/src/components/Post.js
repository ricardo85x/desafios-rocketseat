import React, { Component } from 'react';
import { render } from 'react-dom';

import Comment from './Comment';

import './Post.css'

function Post({ posts }) {

    console.log(posts)





    return posts.map((item, i) => {

        console.log(item.author.avatar)

        return (
            <>


            <div key={i} className="post_container">
                <div className="user_info">
                    <div className="post_avatar">
                        <img src={item.author.avatar} />
                    </div>
                    <div className="post_username">{item.author.name}</div>
                    <div className="post_data">{item.date}</div>
                </div>
                <div className="post_msg">
                    {item.content}
                </div>
                <Comment comentario={item.comments} className="comentario1" />

            </div>

            

            </>
        )
    })

    




  
    
}


export default Post;