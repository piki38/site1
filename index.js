var express = require("express")
var app = express();

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

port = 8000


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () =>
  console.log(`My app is listening on port ${port}!`),
);

app.use(express.json());


app.post("/login", (req, res) => {

  const username = req.body.name
  const email = req.body.email
  const password = req.body.password


  async function main() {
    const userResponse = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    })
    if (userResponse == null) {
      console.log("Invalid Credentials");
      return res.status(401).send("Invalid Credentials")  
    } else {
      console.log("welcome to home");
      return res.status(200).json({msg: 'Hi'});
    }
  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
});
