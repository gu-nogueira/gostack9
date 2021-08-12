import React from 'react';

import Profile from '../assets/profile.png';

import Comment from './Comment';

function Post() {
  return (
    <section className="card">
      <div className="profile">
        <img src={Profile} className="logo" />
        <p><b>Guguinha</b> <br/>
        <small>11 Ago 2021</small></p>
      </div>
      <p>Opa pessoal to apenas fazendo um layout aqui meu bls</p>
      <hr />
      <Comment />
      <Comment />
    </section>
  );
}

export default Post;