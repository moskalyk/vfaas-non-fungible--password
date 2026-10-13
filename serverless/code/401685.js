/*
    check password
*/
module.exports.serverless = async function (x_coords, y_coords, unique_id) {
    // get x coordinates & get y coordinates from function, & protect this function or rate limit
    
    // saved threshold
    const individual_thresh = JSON.parse(await db.kv('/data').get('t' + ':' + unique_id)).v
    
    // get x password
    const x_passwords = JSON.parse(await db.kv('/data').get('x'+ ':' + unique_id)).v;
    const y_passwords = JSON.parse(await db.kv('/data').get('y'+ ':' + unique_id)).v;
    
    // check threshold
    const isBelowThreshold = (currentValue) => currentValue.el < individual_thresh;

    return x_passwords.map((el, i) => {el: Math.abs(x_coords[i]-el)}).every(isBelowThresold) && y_passwords.map((el, i) => {el: Math.abs(y_coords[i]-el)}).every(isBelowThresold)
};
