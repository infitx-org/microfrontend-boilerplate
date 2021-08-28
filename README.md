### Microfrontend Boilerplate

This is the boilerplate project to create microfrontends.

It is based on React / Redux and it is built in Typescript and developed with Webpack, Babel, Eslint, Prettier.

Includes React Router, Redux Saga, and @modusbox/react-components.

It provides a basic module structure ready to be used, a webpack configuration that exports the microfrontend so that it can be lazy loaded.

Microfrontends can be set up to act as hosts(parents), remotes(children) or
bi-directional apps where the host consumes remotes but can also be consumed by another host.

`microfrontend-boilerplate` is a default remote(child) boilerplate meant to expose
components to be consumed by a remote such as `microfrontend-shell-boilerplate`.

[microfrontend-shell-boilerplate](https://github.com/modusintegration/microfrontend-shell-boilerplate)

#### Available scripts

 - `yarn prettier` to prettify the codebase
 - `yarn lint` to lint the codebase
 - `yarn build` to produce the bundle(s)
 - `yarn serve` to run the production build locally
 - `yarn test` to run the tests


#### Structure

The file structure is quite similar to a standard module based structure; the only difference with a regular app where all source is bundled, here we are exporting an _Injector_.

Folders are modules and include separate files around React views and Redux structure.


#### Webpack configuration

Enabling code splitting for the microfrontend is done using the Webpack _ModuleFederationPlugin_.

The configuration is similar to the following:
```javascript
plugins: [
    new ModuleFederationPlugin({
      // Preferable to use a unique name and filename when
      // several remotes are being consumed
      name: 'app',
      library: { type: 'var', name: 'app' },
      filename: 'app.js',
      // Specify and expose components to be consumed
      exposes: {
        './App': './src/Injector',
        './Menu': './src/Menu',
      },
      shared: [
        'react',
        'react-dom',
        ...
      ],
      ...
```

#### Development setup

Application hosting configuration can be found in `.env`
When working with several host/remote applications it is a requirement that
`PUBLIC_PATH` and `DEV_PORT` are updated to avoid port collision.

```
DEV_PORT=3012
PUBLIC_PATH=http://localhost:3012/
```

#### Deployment - In Progress

This boilerplate is currently configured to deploy to [Vercel](https://vercel.com/docs)
using [Vercel for Github](https://vercel.com/docs/git/vercel-for-github)

`microfrontend-shell-boilerplate` can be made to be used with other SPA hosting services.
Just update `webpack.config.js` to pull and set env variables from a hosting service
into `DEV_PORT` and `PUBLIC_PATH`.

```javascript
const { DEV_PORT, VERCEL_URL } = process.env;
const { parsed } = require('dotenv').config({
  path: './.env',
});

const config = {
  DEV_PORT: DEV_PORT || parsed.DEV_PORT,
  PUBLIC_PATH: VERCEL_URL ? `https://${VERCEL_URL}/` : parsed.PUBLIC_PATH,
}
```

#### Resources

 - https://webpack.js.org/concepts/module-federation/
 - https://github.com/module-federation/module-federation-examples
 - https://github.com/modusintegration/microfrontend-boilerplate
