const Post = require('../models/Post');
const util = require("util");
const upload = require("../utils/upload");
const uploadAsync = util.promisify(upload);


exports.all = async (req, res) => {
    const posts = await Post.find({}).populate('user_id', 'name')
    res.json(posts)
};

exports.create = async (req, res) => {
    // รอให้อัปโหลดเสร็จ
    await uploadAsync(req, res);
    const { title, date, description, user_id } = req.body;
    const image = req.file ? req.file.filename : null;
    const post = new Post({
        user_id,
        title,
        date,
        image,
        description
    })
    await post.save()
    return res.status(201).json({ message: "Post created" })
};

exports.deletePost = async (req, res) => {
    const { id } = req.params
    const posts = await Post.deleteOne({ _id: id });
    res.json({ message: "Deleted post" })
}