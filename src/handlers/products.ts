import prisma from "../utils/prisma-client";

export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.json({ data: user.products })
}

export const getOneProduct = async (req, res) => {
    const id = req.params.id;

    const product = await prisma.product.findFirst({
        where: {
            id,
            user_id: req.user.id
        }
    })

    res.json({ data: product })
}

export const createProduct = async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            user_id: req.user.id
        }
    })

    res.json({ data: product })
}

export const updateProduct = async (req, res) => {
    const update = await prisma.product.update({
        where: {
            id_user_id: {
                id: req.params.id,
                user_id: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    })

    res.json({ data: update })
}

export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_user_id: {
                id: req.params.id,
                user_id: req.user.id
            }
        }
    })

    res.json({ data: deleted })
}