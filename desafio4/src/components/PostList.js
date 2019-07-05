import React, { Component } from 'react';
import Post from './Post';
import './PostList.css';

class PostList extends Component {

    state = {
        posts: [
          {
            id: 1,
            author: {
              name: 'Ricardo',
              avatar: 'https://avatars2.githubusercontent.com/u/6313560?s=40&v=4'
            },
            date: '04 Jun 2019',
            content: 'Pessoal, alguém sabe se a Rocketseat está contratando?',
            comments: [
              {
                id: 1,
                author: {
                  name: 'Ricardo',
                  avatar: 'https://avatars2.githubusercontent.com/u/6313560?s=40&v=4'
                },
                content: "Estão falando que sim. Mas vai la no discord para conferir"
              }
            ],
          },
          {
            id: 2,
            author: {
              name: 'Ricardo',
              avatar: 'https://avatars2.githubusercontent.com/u/6313560?s=40&v=4'
            },
            date: '05 Jun 2019',
            content: 'Vamos ver como vai ficar esta outra postagem',
            comments: [
              {
                id: 1,
                author: {
                  name: 'Ricardo',
                  avatar: 'https://avatars2.githubusercontent.com/u/6313560?s=40&v=4'
                },
                content: "eh.. poderia ficar melhor, vamos ver como vai se sair com muito muito muiito muiiiito muiiiito mais texto"
              },
              {
                id: 2,
                author: {
                  name: 'Ricardo',
                  avatar: 'https://avatars2.githubusercontent.com/u/6313560?s=40&v=4'
                },
                content: "é... até que não ficou mais ou menos.."
              }
            ],
          },

          {
            id: 3,
            author: {
              name: 'Ricardo',
              avatar: 'https://avatars2.githubusercontent.com/u/6313560?s=40&v=4'
            },
            date: '06 Jun 2019',
            content: 'Bora para o react native',
            comments: [],
          },
          
        ]
      };

    render() {


        return (

            <div className="postlist">

               <div className="container"> 

                    <Post posts={this.state.posts} />
               
               </div>

            </div>

        )
    }
}

export default PostList;