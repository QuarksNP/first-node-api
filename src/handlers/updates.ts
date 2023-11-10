import prisma from "../utils/prisma-client"

export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
           id: req.params.id 
        }
    })

    res.json({ data: update })
}

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            user_id: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return[...allUpdates, ...product.updates]
    }, [])

    res.json({ data: updates })

}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.product_id
        }
    })

    if(!product) {
        return res.json({ message: "NOP" })
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {
                connect: {
                    id: product.id
                }
            }
        }
    })

    return res.json({ data: update })
}

export const updatedUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            user_id: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return[...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if(!match) {
        return res.json({ message: "NOPE" })
    }

    const updated = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({ data: updated })
}

export const deletedUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            user_id: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return[...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if(!match) {
        return res.json({ message: "NOPE" })
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: deleted })
}