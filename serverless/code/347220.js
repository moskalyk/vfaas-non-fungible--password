module.exports.serverless = async function (point1x, point2x, point1y, point2y, unique_id, x_coords, y_coords) {
    const is_recorded = JSON.parse(await db.kv('/data').get(point1x+point2x+point1y+point2y));
    if(is_recorded.status /*check timing for rate limiting*/){
        return vm('401685').serverless(x_coords, y_coords, unique_id);
    } else {
        await db.kv('/data').put(point1x+point2x+point1y+point2y, Date.now());
        return false;
    }
};
