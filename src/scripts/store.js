const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
    constructor(options) {
        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(userDataPath, options.configName + '.json');
        this.data = parseDataFile(this.path, options.defaults);
    }

    get(key) {
        return this.data[key];
    }
    set(key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
    del(path) {
        let p = this.path
        if(path) p =  path
        deleteDataFile(p);
        console.log('Deleted config file...')
    }
}

function parseDataFile(filePath, defaults) {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch(error) {
        return defaults;
    }
}

function deleteDataFile(filePath) {
    try {
        fs.unlinkSync(filePath);
    } catch(error) {
        console.error(error)
    }
}

module.exports = Store;