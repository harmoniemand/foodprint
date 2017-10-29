export function assign(obj, attr, value, nodebug) {
    obj[attr] = value;
    if (nodebug !== true){
        let value_ = null;
        if (value) {
            value_ = Array.isArray(value) ? value.length + " items" : typeof value === "function" ? 'Function' : value;
        }
        console.log(`Assign '${value_}' to the attribute '${attr}' of object type '${obj.constructor.name}'`);
    }
    return Promise.resolve(obj);
}

export function inspect(msg, val) {
    if (!val) {
        val = msg;
        msg = "INSPECTION:"
    };
    console.log(msg, val);
    return Promise.resolve(val);
}

export function handle(msg, err) {
    console.error(msg, err);
    return Promise.reject(err);
}