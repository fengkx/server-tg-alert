# server-tg-alert

Send alert message to your telegram when server resource usage touch the upper bound.

```plain
dist/
  main.js // bundled API
  action.js // bundled action
```

## Usage
0. (Optional, only required if you edit the ts files)
```
npm run build
```

1. set up API in the server
```sh
# Run server directly on port 2211
node dist/main.js

#Use micro https://github.com/vercel/micro/
npx micro dist/main.js
```

2. Set up GitHub Action
[Example](https://github.com/fengkx/server-tg-alert/blob/master/.github/workflows/check.yml)

[Marketplace](https://github.com/marketplace/actions/server-alert-in-telegram)
