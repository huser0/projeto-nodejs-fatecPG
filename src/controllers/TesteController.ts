import {Request, Response} from "express"

class TesteController {
    teste1(req: Request, res: Response){
        const x = req.query.num
        const y = req.params.id
        return res.send(`Resultado: ${Number(x) + Number(y)}`);
}}

export default TesteController;