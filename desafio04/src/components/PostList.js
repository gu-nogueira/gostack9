import React, { Component } from 'react';

// Images
import Profile from '../assets/profile.png';
import Profile2 from '../assets/profile2.png';
import Profile3 from '../assets/profile3.png';

// Components
import Post from './Post';

class PostList extends Component {

  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Guguinha",
          avatar: Profile,
        },
        date: "03 Out 2007",
        content: "É só o começo?",
        comments: [
          {
            id: 1,
            author: {
              name: "Guzango o Guzera",
              avatar: Profile2
            },
            content: "Rapazinho, é sim com certeza."
          },
        ]
      },
      {
        id: 2,
        author: {
          name: "Gustavo Nogueira",
          avatar: Profile3
        },
        date: "12 Ago 2021",
        content: "Estou aqui pra te afirmar.",
      },
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
        { this.state.posts.map(post => <Post key={post.id} data={post} />) };
      </div>
    );
  }

}

export default PostList;
