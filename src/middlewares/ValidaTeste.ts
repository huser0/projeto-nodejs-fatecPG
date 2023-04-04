import {Request, Response, NextFunction} from "express"

function ValidaTeste1 (req: Request, res:Response, next:NextFunction){
    const id = req.params.id;
    const num = req.query.num;

    if(Number(id) > 1000 || num == null){
        res.status(400).send("Parâmetros Inválidos");
    }

    return next();
}

export default ValidaTeste1