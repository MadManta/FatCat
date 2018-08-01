module.exports = function (mongoose) {
    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true })

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to mLab Database!')
    });

    mongoose.Promise = Promise;
}