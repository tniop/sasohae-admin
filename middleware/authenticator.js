const passport = require("passport");

function passportAutheticator() {
    return passport.authenticate("jwt", { session: false });
}

module.exports = passportAutheticator;
