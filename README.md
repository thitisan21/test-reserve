## Project setup

```bash
$ pnpm install
```

## Compile and run the project

Before run you need to create a .env file like in the example .env.example and input PORT whatever you want. 
The default is set to 3000.

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

You can run with test or you can use swagger by http://localhost:{port}/api. 

```bash
# unit tests
$ pnpm run test

# test coverage
$ pnpm run test:cov
```
