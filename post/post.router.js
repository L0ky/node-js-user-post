import { Router } from 'express'
import { auth } from '../middlewares/auth.middleware.js'
import { createPost, deletePost, getPosts, getSinglePost, updatePost } from './post.controller.js'

const router = Router()

/**
 * GET /api/post
 * @summary Get all posts
 * @tags Post
 * @return { object } 200 - sucess response
 */
router.get('/', getPosts)

/**
 * POST /api/post
 * @summary Create a new post
 * @tags Post
 * @param { Post } request.body.required - the new post
 * @return { Post } 201 - sucess response
 * @security BearerAuth
 */
router.post('/', auth, createPost)

/**
 * GET /api/post/{id}
 * @summary Get one Post
 * @tags Post
 * @param { string } id.path.required - id of Post
 * @return { object } 200 - success response
 * @security BearerAuth
 */
router.get('/:id', auth, getSinglePost)

/**
 * PUT /api/post/{id}
 * @summary Update one Post
 * @tags Post
 * @param { string } id.path.required - id of Post
 * @param { Post } request.body.required - the new post
 * @return { object } 200 - success response
 * @security BearerAuth
 */
router.put('/:id', auth, updatePost)

/**
 * DELETE /api/post/{id}
 * @summary Delete one Post
 * @tags Post
 * @param { string } id.path.required - id of Post
 * @return { object } 200 - success response
 * @security BearerAuth
 */
router.delete('/:id', auth, deletePost)

export {
    router as routerPost
}