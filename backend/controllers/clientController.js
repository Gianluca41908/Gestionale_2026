const clientModel = require('../models/clientModel')

const getClients = (req, res) => {

    clientModel.getAllClients((err, results) => {

        if (err) {
            return res.status(500).json(err)
        }

        res.json(results)
    })
}

const addClient = (req, res) => {

    clientModel.createClient(req.body, (err, result) => {

        if (err) {
            return res.status(500).json(err)
        }

        res.json({
            id: result.insertId,
            ...req.body
        })
    })
}

const deleteClient = (req, res) => {
    const id = req.params.id;

    clientModel.deleteClient(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Errore server' });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Cliente non trovato' });
        res.json({ message: 'Cliente eliminato con successo' });
    });
};

const updateClient = (req, res) => {
    const id = req.params.id;
    const cliente = req.body;

    clientModel.updateClient(id, cliente, (err, result) => {
        if (err) return res.status(500).json({ message: 'Errore server' });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Cliente non trovato' });
        res.json({ message: 'Cliente aggiornato con successo' });
    });
};

module.exports = {
    getClients,
    addClient,
    deleteClient,
    updateClient
}