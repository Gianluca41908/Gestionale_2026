const db = require('../db')

const getAllClients = (callback) => {

    const sql = "SELECT * FROM clienti"

    db.query(sql, callback)

}

const createClient = (cliente, callback) => {

    const { ragioneSociale, partitaIva, ateco, sedeLegale } = cliente

    const sql = `
    INSERT INTO clienti (ragioneSociale, partitaIva, ateco, sedeLegale)
    VALUES (?, ?, ?, ?)
    `

    db.query(sql, [ragioneSociale, partitaIva, ateco, sedeLegale], callback)
}

const deleteClient = (id, callback) => {
    const query = 'DELETE FROM clienti WHERE id = ?';
    db.query(query, [id], callback);
};

const updateClient = (id, cliente, callback) => {
    const { ragioneSociale, partitaIva, ateco, sedeLegale } = cliente;
    const query = `
    UPDATE clienti 
    SET ragioneSociale = ?, partitaIva = ?, ateco = ?, sedeLegale = ? 
    WHERE id = ?
  `;
    db.query(query, [ragioneSociale, partitaIva, ateco, sedeLegale, id], callback);
};



module.exports = {
    getAllClients,
    createClient,
    deleteClient,
    updateClient
}