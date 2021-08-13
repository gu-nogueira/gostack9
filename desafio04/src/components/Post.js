import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

function Post({ data }) {

  return (
    <section className="card">
      <div className="profile">
        <img src={ data.author.avatar } className="logo" />
        <p><b>{ data.author.name }</b> <br/>
        <small>{ data.date }</small></p>
      </div>
      <p>{ data.content }</p>
      { data.comments ? data.comments.map(comment => <Comment key={comment.id} data={comment} />) : null }
    </section>
  );
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Post;