import express from "express"
import Roteador from "./routes"

const app = express()

app.use(express.json())
app.use(Roteador)
app.listen(4000, () => console.log("Servidor Iniciado"))
