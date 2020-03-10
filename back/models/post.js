module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.TEXT, //매우긴글
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',  //한글+이모티콘
        collate: 'utf8mb4_general_ci', 
    });

    Post.associate = (db) => {
        db.Post.belongsTo(db.User, { as : 'User'});
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, { through : 'Like ', as: 'Liked'});
    };

    return Post;
};