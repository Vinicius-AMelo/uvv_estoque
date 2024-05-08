import express from "express"
import router from "./routes.js"
import cors from "cors"
import mailsender from "./services/mailSender.js"

const app = express()
const port = 3001

app.use(express.json());
app.use(cors());
app.use(router)

// mailsender()


app.listen(port, () => console.log(`Servidor express rodando na porta ${port}`))