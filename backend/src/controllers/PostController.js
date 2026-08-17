const Post = require('../models/Post');
const sharp = require('sharp');
const { Readable } = require('stream');
const cloudinary = require('../config/cloudinary');

function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'instagram-posts', format: 'jpg' },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        Readable.from(buffer).pipe(uploadStream);
    });
}

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },

    async store(req, res) {
        const {author, place, description, hashtags} = req.body;

        const resizedBuffer = await sharp(req.file.buffer).resize(500).jpeg({ quality: 70 }).toBuffer();

        const uploadResult = await uploadToCloudinary(resizedBuffer);

        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: uploadResult.secure_url
        });

        req.io.emit('post', post);

        return res.json(post);
    },

    async destroy(req, res) {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        req.io.emit('post:deleted', post._id);

        return res.status(204).send();
    }
};
