# Next.js | Teslo Shop App

- To run the project locally we need the database

```
docker-compose up -d
```

- -d means **detached**

## Configure env vars

Rename **.env.dist** to **.env** and fill the values

- MogoDB URL local

```
mongodb://localhost:27017/teslodb
```

# Install needed dependencies and start next in dev mode

```
yarn
yarn dev
```

## Fill Db with dummy data

Call:

```
http://localhost:3000/api/seed
```
