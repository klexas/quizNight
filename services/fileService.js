// TODO: This is only facilitate reading/writing to the filesyste, 

// NOTE : Please implement you're own sanitization prior to this usage

var fs = require('fs');
let config = require('../common/config');
let consts = require('../common/constants');

module.exports = {
    exists: async (filePath) => {
        console.log(config.fs());
        return new Promise((resolve) => {
            fs.exists(config.fs().dir + filePath + consts.fs.data_type_ext, (res)=>{
                resolve(res);
            })
        })
    }
}