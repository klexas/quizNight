# QuizNight

Throwaway project to setup remote 'pub-quizes' for quarantine.

Using static, light client (no transpiling). KnockoutJr & DurandalJs and BootstrapV3. 

Feeling nostalgic. 

NodeJS with socket.io just for fun, again only in Vanilla JS. 

## Requirements
 - NodeJs w/ npm 
     
    *(Build on v11.6.0 so can't speak to earlier versions)*


## Installation

NodeJS will self host if needed. However client folder is static so can be hosted anywhere. Just be sure to update the common/config.js file for domain/hosts & ports. WebSocket will always run through NodeJs' Socket.io module. 

```node
npm install && node main
```

By default, node will host the static content of `client/` on the address : `http://{config.host}:6969`


# Note : 
There is a static Websocket connection string in the client/app area. Please be sure to update this to your nodeJs websocket location. 

Also: This is very much WIP. 

## TODO
- Would like to add WebRTC to the rooms for Video & audio sharing. 
- Implement rooms properly for WebSockets so broadcasts are not polluted. 
- SSL implementation accross Websocket. 
- Score calculator & results control in Admin area


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests where appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
