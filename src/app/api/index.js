import express from "express"
import router from "./routes.js"
import cors from "cors"

const app = express()
const port = 3001

app.use(express.json());
app.use(router)
// app.use(cors());



app.listen(port, () => console.log(`Servidor express rodando na porta ${port}`))