module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        src: {
            type: DataTypes.STRING(200), //매우긴글
            allowNull: false,
        },
    }, {
        charset: 'utf8',  //한글+이모티콘
        collate: 'utf8_general_ci', 
    });

    Image.associate = (db) => {
        db.Post.belongsTo(db.Post);
    };

    return Image;
};