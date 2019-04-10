const Box = require("../models/Box");

class BoxController {
    async store(req, res) {


        const box = await Box.create({ title: req.body.title });

        return res.json(box);
        // return res.send("Conectado");
    }

    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path:"files",
            options: { sort: { createdAt: -1 } } //ordenar decrescente
        });

        return res.json(box);
    }
}

module.exports = new BoxController();

