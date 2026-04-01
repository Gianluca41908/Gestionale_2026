const db = require('../db')

// GET tutte le pratiche
const getAllPractices = (callback) => {
    const sql = `
    SELECT 
      pratiche.id,
      pratiche.importo,
      pratiche.banca,
      pratiche.tipologia,
      pratiche.stato,
      pratiche.data_acquisizione,
      pratiche.data_delibera,
      pratiche.data_erogazione,
      pratiche.data_fattura,
      pratiche.numero_fattura,
      clienti.ragioneSociale
    FROM pratiche
    JOIN clienti ON pratiche.cliente_id = clienti.id
  `;
    db.query(sql, callback)
}

const getPracticeById = (id, callback) => {
    const sql = `
        SELECT 
            pratiche.*,
            clienti.ragioneSociale
        FROM pratiche
        JOIN clienti ON pratiche.cliente_id = clienti.id
        WHERE pratiche.id = ?
    `;

    db.query(sql, [id], callback);
};

// CREATE pratica
const createPractice = (pratica, callback) => {
    const { cliente_id, importo, banca, tipologia, stato,
        data_acquisizione, data_delibera, data_erogazione, data_fattura, numero_fattura } = pratica;

    const sql = `
    INSERT INTO pratiche 
    (cliente_id, importo, banca, tipologia, stato, data_acquisizione, data_delibera, data_erogazione, data_fattura, numero_fattura)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    // Se un campo data non è definito, inseriamo NULL
    const values = [
        cliente_id,
        importo,
        banca,
        tipologia,
        stato,
        data_acquisizione || null,
        data_delibera || null,
        data_erogazione || null,
        data_fattura || null,
        numero_fattura || null
    ];

    db.query(sql, values, callback);
};

// UPDATE pratica
const updatePractice = (id, pratica, callback) => {
    const { cliente_id, importo, banca, tipologia, stato,
        data_acquisizione, data_delibera, data_erogazione, data_fattura, numero_fattura } = pratica;

    const sql = `
    UPDATE pratiche
    SET cliente_id = ?, importo = ?, banca = ?, tipologia = ?, stato = ?,
        data_acquisizione = ?, data_delibera = ?, data_erogazione = ?, data_fattura = ?, numero_fattura = ?
    WHERE id = ?
  `;

    const values = [
        cliente_id,
        importo,
        banca,
        tipologia,
        stato,
        data_acquisizione || null,
        data_delibera || null,
        data_erogazione || null,
        data_fattura || null,
        numero_fattura || null,
        id
    ];

    db.query(sql, values, callback);
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
    deletePractice,
    getPracticeById
}