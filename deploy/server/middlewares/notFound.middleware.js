"use strict";
function notFoundHandler(req, res) {
    res.json({ msg: 'resources are not founded!', isError: true });
}
module.exports = notFoundHandler;
