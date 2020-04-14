var debug_mode = true;
var file_settings = {
    storagePath: 'c:\\tmp\\'
};

const expressOptions = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['html', 'json'],
    index: false,
    maxAge: '1d',
    redirect: false
};

// TODO: Something like a SW Load balancer / Proxy
const connections = {
    entry: {
        hostname: 'localhost', // hostname / IP address
        port: 6969,
        websocketPort: 6970
    },
    user: {
        hostname: 'localhost',
        port: 6968
    }
};


// Probably best not to edit this
// TODO: Will be moved to data access layer area
 fs = function(){
    if (debug_mode)
        return {
            dir: file_settings.storagePath
        }
    else
        throw Error('Not in debug mode. Do not use this method. ');
    };

module.exports = { 
    expressOptions, 
    connections,
    fs,
    debug_mode
}