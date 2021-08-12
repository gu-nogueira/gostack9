import React, { Component } from 'react';

// Components
import Post from './Post';

class PostList extends Component {

  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: "http://url-da-imagem.com/imagem.jpg"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "http://url-da-imagem.com/imagem.jpg"
            },
            content: "Conteúdo do comentário"
          }
        ]
      },
      {
        id: 2
        // Restante dos dados de um novo post
      }
    ]
  };

  componentDidMount() {

  }
  componentDidUpdate() {
    
  }
  componentWillUnmount() {

  }

  render() {
    return (
      <div className="container">
        <Post/>
        <Post/>
      </div>
    );
  }

}

export default PostList;
