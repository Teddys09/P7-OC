import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';

const Post = () => {
  const [data, setData] = useState([]);
  const [like, setLike] = useState(0);
  const [postId, setPostId] = useState('');
  const [userLikes, setUserLikes] = useState('');
  const [likes, setLikes] = useState();
  const [disLikes, setDisLikes] = useState();

  const deletePost = (id, userId) => {
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
    if (like === -1) {
      setLike(Number(0));
      setPostId(id);

      setUserLikes(localStorage.getItem('userId'));
    }
    if (like === 1) {
      setLike(Number(0));
      setPostId(id);

      setUserLikes(localStorage.getItem('userId'));
    }
    if (like === 0) {
      setLike(Number(1));

      setPostId(id);
      setUserLikes(localStorage.getItem('userId'));
    }
  };

  const handleDislikes = (id) => {
    if (like === 1) {
      setLike(Number(0));
      setPostId(id);

      setUserLikes(localStorage.getItem('userId'));
    }
    if (like === -1) {
      setLike(Number(0));
      setPostId(id);

      setUserLikes(localStorage.getItem('userId'));
    }
    if (like === 0) {
      setLike(Number(-1));

      setPostId(id);
      setUserLikes(localStorage.getItem('userId'));
    }
  };

  useEffect(() => {
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
        setLikes([res.data.likes]);
        setDisLikes([res.data.dislikes]);
      })
      .catch((err) => console.log(err));
  }, [like]);

  useEffect(() => {
    axios({
      method: 'get',

      url: 'http://localhost:5000/api/home',

      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [likes, disLikes]);

  return (
    <div className="card-home">
      {data
        .slice(0)
        .reverse()
        .map((post) => (
          <div className={'card-post ' + post._id} key={post._id}>
            <p className="post-name"> {post.name}</p>
            <div className="post-img-div">
              <img className="post-img" src={post.file} alt="" />
            </div>
            <p className="post-description">{post.description}</p>
            <div className="card-container-like">
              <div className="card-div-like">
                <FaRegThumbsUp
                  className={'card-like ' + post._id}
                  name="likes"
                  onMouseUp={() => {
                    handleLikes(post._id);
                  }}
                />
                <p>{post.likes}</p>
              </div>
              <div className="card-div-like">
                <FaRegThumbsDown
                  className={'card-like ' + post._id}
                  name="dislikes"
                  onMouseUp={() => {
                    handleDislikes(post._id);
                  }}
                />
                <p>{post.dislikes}</p>
              </div>
            </div>
            <div className="hold-modify-delete">
              <div className="card-modify">
                {modifyPost(post._id, post.userId)}
              </div>
              <div className="card-delete">
                {deleteCard(post._id, post.userId)}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Post;
