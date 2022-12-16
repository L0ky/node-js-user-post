import express       from "express"
import mongoose      from "mongoose"
import { routerApi } from "./routers/api.router.js"
import config        from "./config.js"
import cors          from "cors"

import { swaggerOptions }  from "./swagger-options.js"
import expressJSDocSwagger from "express-jsdoc-swagger"

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/?retryWrites=true&w=majority`)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));

const app = express()

/**
 * POST /api/Post
 * @summary Create a new Post
 * @tags Post
 * @param { Post } request.body.required - the new Post
 * @return { Post } 201 - success response
 */

app.use(express.json())

// app.use(cors ({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     preflightContinue: false,
//     optionsSuccessStatus: 204
// }))

expressJSDocSwagger(app)(swaggerOptions)

app.use('/api', routerApi)

app.use('/user', routerApi)

app.listen(parseInt(config.port), console.log('listen' + config.port))
