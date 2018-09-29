import { db } from "./firebase";

import User from "../models/User";

// User API
export const doCreateUser = (user: User) => db.ref(`users/${user.id}`).set(user);

export const onceGetUsers = () => db.ref("users").once("value");
