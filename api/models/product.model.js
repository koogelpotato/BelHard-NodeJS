const{DataTypes} = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        name: {type: DataTypes.STRING, allowNull: false},
        price: {type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0}
    };

    return sequelize.define('Product', attributes)
}


