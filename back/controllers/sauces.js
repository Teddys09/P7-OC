const mongoose = require('mongoose');
// unlink pour supprimer les images
const { unlink } = require('fs');
//const { saucePouce } = require('./pouce');

const sauceSchema = new mongoose.Schema({
  userId: String,
  name: String,

  description: String,

  file: String,
  like: Number,
  likes: Number,
  dislikes: Number,
  usersLiked: [String],
  usersDisliked: [String],
});
const Sauce = mongoose.model('Sauce', sauceSchema);

function sauceHome(req, res) {
  console.log('Token user is true , we are in sauceHome');

  Sauce.find({})
    .then((sauces) => res.send(sauces))
    .catch((err) => console.log('SauceHomeerr', err));
}

function sauceCreate(req, res) {
  JSON.stringify(req.body);
  console.log('LALALALA', req.body);
  console.log(req.get('host'));
  const imageUrl = req.file.destination + req.file.filename;

  const { name, description, userId } = req.body;
  console.log(req.body.file);
  const sauce = new Sauce({
    userId: userId,
    name: name,
    file: req.protocol + '://' + req.get('host') + '/' + imageUrl,
    description: description,
    like: 0,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then((resSuccess) => {
      res.send({ message: resSuccess });
      return console.log('produit enregistré', resSuccess);
    })
    .catch((err) => console.log('Problème dans création du Post' + err));
}

function sauceId(req, res) {
  console.log(req.params.id);
  const id = req.params.id;
  console.log(id);
  Sauce.findById(id)
    .then((sauce) => {
      res.send(sauce);
    })
    .catch((err) => console.log(err));
}
function sauceIdPouce(req, res) {
  console.log('That', req.body);
  const { _id } = req.body;
  console.log('LALOO', _id);

  return Sauce.findById(_id);
}

function sauceDelete(req, res) {
  const id = req.params.id;

  Sauce.findByIdAndDelete(id)

    .then((sauce) => {
      imageDelete(sauce);
      res.send({ message: sauce });
    })
    .catch((err) => res.status(500).send({ message: err }));
}

function imageDelete(sauce) {
  console.log(sauce);
  const imageUrl = sauce.file;
  console.log('image a DELETE', sauce);
  const imageToDelete = sauce.file.split('/').at(-1);
  unlink(`images/${imageToDelete}`, (err) => {
    console.log(err);
  });
}

function sauceModify(req, res) {
  const id = req.body._id;

  const hasNewImage = req.file != null;

  const payload = makePayload(hasNewImage, req);

  Sauce.findByIdAndUpdate(id, payload)
    .then((dbResponse) => sendClientResponse(dbResponse, res))

    .catch((err) => console.error('PROBLEM UPDATING', err));
}

function makePayload(hasNewImage, req) {
  console.log('hasNewImage:', hasNewImage);
  console.log('reqbody', req.body);
  if (!hasNewImage) return req.body;
  const payload = req.body;
  payload.file = makeImageUrl(req);
  console.log('NOUVELLE IMAGE A GERER');
  console.log('voici le payload:', payload);
  return payload;
}
function makeImageUrl(req) {
  const imageUrl = req.file.destination + req.file.filename;
  return req.protocol + '://' + req.get('host') + '/' + imageUrl;
}
// 'http://localhost:3000/images/1653557517023-3.bmp',

function sendClientResponse(product, res) {
  if (product == null) {
    console.log('NOTHING TO UPDATE');
    return res.status(404).send({ message: 'Object not found in database' });
  }
  console.log('ALL GOOD, UPDATING:', product);

  return Promise.resolve(res.status(200).send(product)).then(() => product);
}
module.exports = {
  sauceHome,
  sauceCreate,
  sauceId,
  sauceDelete,
  sauceModify,
  sendClientResponse,
  sauceId,
  sauceIdPouce,
  // saucePouce,
};
