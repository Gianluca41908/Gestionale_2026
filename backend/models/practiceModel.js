const db = require('../db')

// GET tutte le pratiche
// const getAllPractices = (callback) => {
//     db.query("SELECT * FROM pratiche", callback)
// }

const getAllPractices = (callback) => {

    const sql = `
    SELECT 
      pratiche.id,
      pratiche.importo,
      pratiche.banca,
      pratiche.tipologia,
      pratiche.stato,
      clienti.ragioneSociale
    FROM pratiche
    JOIN clienti ON pratiche.cliente_id = clienti.id
  `

    db.query(sql, callback)
}

// CREATE pratica
const createPractice = (pratica, callback) => {

    const { cliente_id, importo, banca, tipologia, stato } = pratica

    const sql = `
    INSERT INTO pratiche (cliente_id, importo, banca, tipologia, stato)
    VALUES (?, ?, ?, ?, ?)
    `

    db.query(sql, [cliente_id, importo, banca, tipologia, stato], callback)
}

// UPDATE pratica
const updatePractice = (id, pratica, callback) => {
    const { cliente_id, importo, banca, tipologia, stato } = pratica;

    const sql = `
        UPDATE pratiche 
        SET cliente_id = ?, importo = ?, banca = ?, tipologia = ?, stato = ?
        WHERE id = ?
    `;

    db.query(sql, [cliente_id, importo, banca, tipologia, stato, id], callback);
};

// DELETE pratica
const deletePractice = (id, callback) => {
    const sql = `DELETE FROM pratiche WHERE id = ?`;

    db.query(sql, [id], callback);
};

module.exports = {
    getAllPractices,
    createPractice,
    updatePractice,
    deletePractice
}