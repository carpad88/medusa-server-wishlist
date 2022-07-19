<p align="center">
  <a href="https://www.medusa-commerce.com">
    <img alt="Medusa" src="https://user-images.githubusercontent.com/7554214/129161578-19b83dc8-fac5-4520-bd48-53cba676edd2.png" width="100" />
  </a>
</p>
<h1 align="center">
  Medusa Starter with Wishlist
</h1>
<p align="center">
This repo provides the skeleton to get you started with using <a href="https://github.com/medusajs/medusa">Medusa</a>. Follow the steps below to get ready.
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

## Prerequisites

This starter has minimal prerequisites and most of these will usually already be installed on your computer.

- [Install Node.js](https://nodejs.org/en/download/)
- [Install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Install Postgres](https://www.postgresql.org)

## Quick start

1. **Clone this repository**

```zsh
  git clone git@github.com:carpad88/medusa-server-wishlist.git medusa-wishlist
```

2. **Install dependencies**

```zsh
  cd medusa-wishlist
  yarn
```

3. **Link to your database**

> To be able to run migrations you need to use a **Postgres database**.

Update the `medusa-config.js` with your postgres database URL 

```js
const DATABASE_URL = process.env.DATABASE_URL || "<link to your postgres database>";
```

4. **Build and run migrations**

Run the next commands to build and run your migrations

```zsh
yarn run build && medusa migrations run 
```
5. **Seed your store**

To seed your medusa store run the following command:

```zsh
medusa seed -f ./data/seed.json
```

This command seeds your database with some sample data to get you started, including a store, an administrator account, a region and a product with variants. What the data looks like precisely you can see in the `./data/seed.json` file.


6. **Start development**

You should now be able to start developing your site.

```zsh
yarn start
```

5. **Open the source code and start editing!**

   Your server is now running at `http://localhost:9000`!





