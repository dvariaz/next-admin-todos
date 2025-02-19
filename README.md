# Development

> Set environment variables in `.env` file

* Install dependencies
```
yarn
```

* Start database
```
docker-compose up -d
``` 

* Start dev server
```
yarn dev
```

* Seed database
```
Send a post request to `/api/seed`
```


# Prisma commands
* Initialize prisma files
```
npx prisma init
```

* Migrate database
```
npx prisma migrate
```

* Generate prisma client
```
npx prisma generate
```
