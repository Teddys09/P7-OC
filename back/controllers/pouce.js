const { sauceIdPouce, sendClientResponse } = require('./sauces');

function saucePouce(req, res) {
  const { like, userId } = req.body;

  if (![1, -1, 0].includes(like))
    return res.status(403).send({ message: 'Invalid like value' });

  sauceIdPouce(req, res)
    .then((post) => updatePouce(like, userId, post))
    .then((post) => post.save())
    .then((req) => sendClientResponse(req, res))
    .catch((err) => console.log('Problème Update', err));
}

function updatePouce(like, userId, post) {
  if (like === 1 || like === -1) return incrementPouce(userId, like, post);
  return resetPouce(userId, post);
}

function resetPouce(userId, post) {
  const { usersLiked, usersDisliked } = post;
  if ([usersLiked, usersDisliked].every((arr) => arr.includes(userId)))
    return Promise.reject('User seems to have voted both ways');

  if (![usersLiked, usersDisliked].some((arr) => arr.includes(userId)))
    return Promise.reject('User seems to not have voted');

  if (usersLiked.includes(userId)) {
    --post.likes;
    post.usersLiked = post.usersLiked.filter((id) => id !== userId);
  } else {
    --post.dislikes;
    post.usersDisliked = post.usersDisliked.filter((id) => id !== userId);
  }

  return post;
}

function incrementPouce(userId, like, post) {
  const { usersLiked, usersDisliked } = post;

  const votersArray = like === 1 ? usersLiked : usersDisliked;
  if (votersArray.includes(userId)) return post;
  votersArray.push(userId);

  like === 1 ? ++post.likes : ++post.dislikes;

  return post;
}

module.exports = { saucePouce };
