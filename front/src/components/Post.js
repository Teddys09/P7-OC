import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';

const Post = () => {
  const [data, setData] = useState([]);
  const [test, setTest] = useState('');
  let like = '';
  let postId = '';
  let userLikes = '';
  console.log(test);
  const handleLikes = (e) => {
    if (e) {
      console.log(e);

      like = 1;
      console.log(like);

      postId = e.target.classList.value;

      console.log(postId);

      userLikes = localStorage.getItem('userId');
    }
    incrementLike();
  };
  const handleDislikes = (e) => {
    if (e) {
      like = -1;

      postId = e.target.classList.value;

      userLikes = localStorage.getItem('userId');
    }
    incrementLike();
  };
  const incrementLike = () => {
    axios({
      method: 'post',

      url: 'http://localhost:5000/api/post/like',

      data: {
        like: like,
        likes: 0,
        dislikes: 0,
        _id: postId,
        userId: userLikes,
        usersLiked: [],
        usersDisliked: [],
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios({
      method: 'get',

      url: 'http://localhost:5000/api/home',

      headers: {
        Authorization: localStorage.getItem('token'),
      },
      // withCredentials: true,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="card-home">
      {data.map((post) => (
        <div className={'card-post ' + post._id} key={post._id}>
          <p className="post-name"> {post.name}</p>
          <div>Image</div>
          <p className="post-description">{post.description}</p>
          <FaRegThumbsUp
            key={post._id}
            className={post._id}
            name="likes"
            onClick={(e) => {
              handleLikes(e);

              console.log('click');
            }}
          />
          <p>{post.likes}</p>{' '}
          <FaRegThumbsDown
            className={post._id}
            name="dislikes"
            onClick={(e) => {
              handleDislikes(e);
            }}
          />
          <p>{post.dislikes}</p>
        </div>
      ))}
    </div>
  );
};

export default Post;
