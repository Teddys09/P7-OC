const { sauceIdPouce, sendClientResponse } = require('./sauces');

function saucePouce(req, res) {
  const { like, userId } = req.body;

  console.log(req.body);

  if (![1, -1, 0].includes(like))
    return res.status(403).send({ message: 'Invalid like value' });
  console.log('la req', req.body);
  sauceIdPouce(req, res)
    .then((post) => updatePouce(like, userId, post))
    .then((post) => post.save())

    .then((req) => sendClientResponse(req, res))
    .catch((err) => console.log('Problème Update', err));
}

function updatePouce(like, userId, post) {
  console.log('reqqq', like);
  if (like === 1 || like === -1) return incrementPouce(userId, like, post);
  return resetPouce(userId, res);
}

function resetPouce(sauce, userId, res) {
  console.log('reset?');
  const { usersLiked, usersDisliked } = sauce;
  if ([usersLiked, usersDisliked].every((arr) => arr.includes(userId)))
    return Promise.reject('User seems to have voted both ways');

  if (![usersLiked, usersDisliked].some((arr) => arr.includes(userId)))
    return Promise.reject('User seems to not have voted');

  if (usersLiked.includes(userId)) {
    --sauce.likes;
    sauce.usersLiked = sauce.usersLiked.filter((id) => id !== userId);
  } else {
    --sauce.dislikes;
    sauce.usersDisliked = sauce.usersDisliked.filter((id) => id !== userId);
  }

  return sauce;
}

function incrementPouce(userId, like, post) {
  console.log('User', like);
  let { likes, dislikes } = post;
  const { usersLiked, usersDisliked } = post;
  console.log(likes);
  const votersArray = like === 1 ? usersLiked : usersDisliked;
  if (votersArray.includes(userId)) return post;
  votersArray.push(userId);
  console.log(like);
  like === 1 ? ++likes : ++dislikes;
  console.log(likes);
  console.log('LaLe', post);
  return post;
}

module.exports = { saucePouce };
