import React from 'react';

function Comment({ data }) {
  return (
    <div className="comment">
      <hr />
      <div className="profile">
          <img src={ data.author.avatar } className="logo" />
          <span><b>{ data.author.name }: </b>{ data.content }</span>
      </div>
    </div>
  ); 
}

export default Comment;