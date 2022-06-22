import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';

const Post = () => {
  const [data, setData] = useState([]);
  const [updateLikes, setUpdateLikes] = useState(0);
  const [updateDislikes, setUpdateDislikes] = useState(0);
  const [test, setTest] = useState();
  let firstClick = true;
  let firstDisClick = true;

  let like = 0;
  let postId = '';
  let userLikes = '';
  const deletePost = (id, userId) => {
    console.log('hello');
    axios({
      method: 'delete',
      url: `http://localhost:5000/api/delete/${id}`,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      mode: 'cors',
      'Content-Type': 'multipart/form-data',
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.reload(false);
  };
  const admin = '62b3595fc3626d77bb79cf9a';
  const modifyPost = (id, userId) => {
    if (userId === localStorage.getItem('userId')) {
      return <a href={'/Modifier/?id=' + id}>Modifier</a>;
    }
    if (localStorage.getItem('userId') === admin) {
      return <a href={'/Modifier/?id=' + id}>Modifier</a>;
    } else {
      return;
    }
  };
  const deleteCard = (id, userId) => {
    if (userId === localStorage.getItem('userId')) {
      return <button onClick={() => deletePost(id, userId)}>Supprimer</button>;
    }
    if (localStorage.getItem('userId') === admin) {
      return <button onClick={() => deletePost(id, userId)}>Supprimer</button>;
    }
  };

  const handleLikes = (id) => {
    if (firstDisClick === false) {
      return;
    }
    if (firstClick) {
      console.log('true');
      like = 1;
      postId = id;
      userLikes = localStorage.getItem('userId');
      firstClick = false;
    } else {
      console.log('false');
      like = 0;
      postId = id;
      userLikes = localStorage.getItem('userId');
      firstClick = true;
    }
    console.log(like);
    incrementLike();
  };
  const handleDislikes = (id) => {
    if (firstClick === false) {
      return;
    }
    if (firstDisClick === true) {
      console.log('true');
      like = -1;
      postId = id;
      userLikes = localStorage.getItem('userId');
      firstDisClick = false;
    } else {
      console.log('false');
      like = 0;
      postId = id;
      userLikes = localStorage.getItem('userId');
      firstDisClick = true;
    }
    console.log(like);

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
      .then((res) => {
        setUpdateLikes(res.data.likes);
        setUpdateDislikes(res.data.dislikes);
      })
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
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="card-home">
      {data
        .slice(0)
        .reverse()
        .map((post) => (
          <div className={'card-post ' + post._id} key={post._id}>
            <p className="post-name"> {post.name}</p>
            <div>
              <img className="post-img" src={post.file} alt="" />
            </div>
            <p className="post-description">{post.description}</p>
            <FaRegThumbsUp
              key={post._id}
              data-foo={post._id}
              className={post._id}
              name="likes"
              onMouseUp={() => {
                handleLikes(post._id);

                console.log('click');
              }}
            />
            <p>{post.likes}</p>
            <FaRegThumbsDown
              className={post._id}
              name="dislikes"
              onMouseUp={() => {
                handleDislikes(post._id);
              }}
            />
            <p>{post.dislikes}</p>

            <div>{modifyPost(post._id, post.userId)}</div>
            <div>{deleteCard(post._id, post.userId)}</div>
          </div>
        ))}
    </div>
  );
};

export default Post;
