module.exports = {
  rootAPI: "/api/v1/",
  port: 8081,
  prod: false,
  urlAPI: "http://localhost:8080/api/v1/",
  db: {
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: 'password',
    database: 'database_name'
  },
  api: {
    port: 3000,
    baseURL: 'http://localhost:3000/api/v1/'
  }

}