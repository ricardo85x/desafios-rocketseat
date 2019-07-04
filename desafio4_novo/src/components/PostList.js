import React, { Component } from 'react';
import { render } from 'react-dom';
import Post from './Post';
import './PostList.css';

class PostList extends Component {

    render() {


        return (

            <div className="postlist">

               <div className="container"> 

                    <Post />
               
               </div>

            </div>

        )
    }
}

export default PostList;