"use strict";
function handleErrors(error, req, res, next) {
    console.log(error);
    if (error.code === 404) {
        return res
            .status(404)
            .json({ msg: 'resources are not founded', isError: true });
    }
    return res.status(500).json({
        msg: 'Something went wrong. Please try again later',
        isError: true,
    });
}
module.exports = handleErrors;
