const fs = require('fs')

fs.copyFileSync('./src/database/orm.config.ts', './generate_ormconfig/orm.config.js')

const config = require('./orm.config')

function generateOrmConfigFile () {
    fs.writeFileSync(
        './ormconfig.json',
        JSON.stringify(config)
    )
}

generateOrmConfigFile ()
