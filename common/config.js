var debug_mode = true;

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
}

fs = ()=>{
    if(this.debug_mode)
        return {
            dir: '../data'
        }
}

module.exports = { 
    expressOptions, 
    connections
}