const{DataTypes} = require('sequelize');

module.exports = model;

function model(sequelize){
    const attributes = {
        name: {type: DataTypes.STRING, allowNull: false},
        price: {type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0, validate:{
            args:[1],
            msg: 'Цена должна быть больше нуля'
        }}
    };

    return sequelize.define('Product', attributes)
}

