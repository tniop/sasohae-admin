const passport = require("passport");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const admins = require("../models/admins");

const passportconfig = {
    usernameField: "adminNickname",
    passwordField: "password",
};

async function validation(adminNickname, password, done) {
    try {
        const existAdmin = await admins.findOne({ adminNickname });
        if (existAdmin) {
            const comparePassword = await bcrypt.compare(
                password,
                existAdmin.password
            );
            if (comparePassword) {
                done(null, existAdmin);
                return;
            } else {
                done(null, false, {
                    errorMessage: "비밀번호가 일치하지 않습니다!",
                });
                return;
            }
        }
        done(null, false, {
            errorMessage: "관리자정보가 존재하지 않습니다!",
        });
    } catch (err) {
        console.log(err);
    }
}

const JWTConfig = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: process.env.JWT_SECRET_KEY,
    passReqToCallback: true,
};

async function jwtVerify(req, payload, done) {
    try {
        const existAdmin = await admins.findOne({
            adminNickname: payload.nickname,
        });
        if (existAdmin) {
            req.user = existAdmin;
            done(null, existAdmin);
            return;
        }
        done(null, false, {
            errorMessage: "올바르지 않은 인증정보 입니다!",
        });
    } catch (err) {
        console.log(err);
    }
}

function passportConfig() {
    passport.use("local", new localStrategy(passportconfig, validation));
    passport.use("jwt", new JWTStrategy(JWTConfig, jwtVerify));
}

module.exports = passportConfig;
