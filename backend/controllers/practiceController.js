const practiceModel = require('../models/practiceModel')

// GET tutte le pratiche
const getPractices = (req, res) => {
    practiceModel.getAllPractices((err, results) => {
        if (err) {
            return res.status(500).json(err)
        }
        res.json(results)
    })
}

// CREATE pratica
const createPractice = (req, res) => {
    const statiValidi = ['In lavorazione', 'Erogata', 'Fatturata', 'Deliberata']

    if (!statiValidi.includes(req.body.stato)) {
        return res.status(400).json({ error: 'Stato non valido' })
    }

    // Passiamo direttamente req.body al model
    practiceModel.createPractice(req.body, (err, result) => {
        if (err) {
            return res.status(500).json(err)
        }
        res.json({ message: 'Pratica creata' })
    })
}

// UPDATE pratica
const updatePractice = (req, res) => {
    const { id } = req.params
    const statiValidi = ['In lavorazione', 'Erogata', 'Fatturata', 'Deliberata']

    // Controlliamo lo stato solo se presente nel body
    if (req.body.stato && !statiValidi.includes(req.body.stato)) {
        return res.status(400).json({ error: 'Stato non valido' })
    }

    // Passiamo direttamente req.body al model
    practiceModel.updatePractice(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err)

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pratica non trovata' })
        }

        res.json({ message: 'Pratica modificata con successo' })
    })
}

// DELETE pratica
const deletePractice = (req, res) => {
    const { id } = req.params

    practiceModel.deletePractice(id, (err, result) => {
        if (err) return res.status(500).json(err)

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pratica non trovata' })
        }

        res.json({ message: 'Pratica eliminata con successo' })
    })
}

module.exports = {
    getPractices,
    createPractice,
    updatePractice,
    deletePractice
}