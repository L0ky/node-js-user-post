import { Post } from "./post.model.js"

const getAll = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getSingle = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findOne({_id : id})
        if (!post) {
            res.status(404).json(null)
        }
        res.status(200).json(post)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

const create = async (req, res) => {
    const { body } = req
    try {
        const post = await Post.create(body)
        res.status(201).json(post)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const update = async (req, res) => {
    try {

        const { body : data, params : { id } } = req
        const post = await Post.findByIdAndUpdate({_id : id}, data, {returnOriginal: false})
        res.status(200).json(post)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        await Post.deleteOne({_id : id})
        res.status(200).json({ message: 'Post deleted' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

export {
    getAll    as getPosts,
    getSingle as getSinglePost,
    update    as updatePost,
    remove    as deletePost,
    create    as createPost,
}