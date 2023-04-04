import {Router } from "express"
import ProdutoController from "./controllers/ProdutoController";
import TesteController from "./controllers/TesteController";
import ValidaTeste1 from "./middlewares/ValidaTeste";

const Roteador = Router();

Roteador.get("/teste/:id", ValidaTeste1, new TesteController().teste1)

Roteador.get('/produtos/:id', new ProdutoController().show)
Roteador.post('/produtos', new ProdutoController().store)
Roteador.put('/produtos/:id', new ProdutoController().update)
Roteador.delete('/produtos/:id', new ProdutoController().delete)
Roteador.put('/produtos/fornecedores/:id', new ProdutoController().associarFornecedores);

export default Roteador;