import passport from "passport";
import local from "passport-local"
import { userModel } from "../models/user.model";
import { createHash } from "../utils/bcrypt";

const LocalStrategy = local