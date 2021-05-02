import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"), 
        pattern: /^[\w-]+\d+\.[jt]s$/, 
    },
    entities: [Post, User],
    dbName: "lireddit",
    type: "postgresql",
    debug: !__prod__,
    user: "andrewlyon"
} as Parameters<typeof MikroORM.init>[0];