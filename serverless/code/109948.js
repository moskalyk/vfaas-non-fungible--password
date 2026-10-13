/*
    load password
*/
module.exports.serverless = async function (x_coords_pw, y_coords_pw, threshold, unique_id) {
    await db.kv('/data').put('x'+ ':' + unique_id, JSON.stringify(x_coords_pw));
    await db.kv('/data').put('y'+ ':' + unique_id, JSON.stringify(y_coords_pw));
    await db.kv('/data').put('t'+ ':' + unique_id, JSON.stringify(threshold));
    return true;
};
