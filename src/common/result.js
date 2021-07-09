'use strict';
module.exports = {
    resultBean: (data, code, message) => {
        return {
            meta: {
                code: code,
                message: message
            },
            data: data
        }
    }
}