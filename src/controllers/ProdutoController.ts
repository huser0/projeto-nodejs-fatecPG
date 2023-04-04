import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

class ProdutoController {
    async index(req: Request, res: Response) {
        const prisma = new PrismaClient()
        const produtos = await prisma.produto.findMany(
            {
                orderBy: { nome: 'asc' },
                select: {
                    nome: true, // Seleciona as propriedades desejadas de Produto
                    preco: true,
                    categoria: {
                        select: { nome: true } //Traz do Model relacionado apenas o nome
                    }
                }
            }
        )

        res.status(200).json(produtos)
    }

    async show(req: Request, res: Response) {
        const prisma = new PrismaClient()
        const produto = await prisma.produto.findUnique(
            {
                where: { id: Number(req.params.id) },
                select: {
                    id: true,
                    nome: true,
                    preco: true,
                    categoria: {
                        select: { nome: true }
                    }
                }
            }
        )

        res.status(200).json(produto)
    }

    async store(req: Request, res: Response) {
        const prisma = new PrismaClient()
        // Obtém json vindo do cliente
        const { nome, preco, categoriaId } = req.body;
        // console.log(dados);
        const novoProduto = await prisma.produto.create(
            {
                data: {
                    nome: nome,
                    preco: preco,
                    categoria: {
                        connect: { id: Number(categoriaId) } // Associa produto à categoria
                    }
                },
                select: {
                    id: true,
                    nome: true,
                    preco: true,
                    categoria: true // Traz todos os dados de categoria
                }
            }
        )

        res.status(200).json(novoProduto)
    }

    async update(req: Request, res: Response) {
        const prisma = new PrismaClient()
        const { nome, preco, categoriaId } = req.body
        const produtoAlterado = await prisma.produto.update(
            {
                where: { id: Number(req.params.id) },
                data: {
                    nome: nome,
                    preco: preco,
                    categoria: { connect: { id: categoriaId } }
                },
                select: {
                    id: true,
                    nome: true,
                    preco: true,
                    categoria: true
                }
            }
        )

        res.status(200).json(produtoAlterado);
    }

    async delete(req: Request, res: Response) {
        const prisma = new PrismaClient();
        await prisma.produto.delete(
            {
                where: { id: Number(req.params.id) }
            }
        )

        res.status(200).json({ excluido: true });
    }

    async associarFornecedores(req: Request, res: Response){
        //Exemplo de json recebido: {fornecedores: [1,2]}
        const {fornecedores} = req.body;
        const dados = fornecedores.map((x:any) => {return {id: x}});
        const prisma = new PrismaClient();
        const produtoAlterado = await prisma.produto.update({
            where: {id: Number(req.params.id)},
            data: {
                fornecedores: {connect: dados} //associa produto à categoria
            },
            select: {
                nome: true,
                preco: true,
                categoria: true,
                fornecedores: true
            }
        })
        return res.status(200).json(produtoAlterado)

    }

}



export default ProdutoController