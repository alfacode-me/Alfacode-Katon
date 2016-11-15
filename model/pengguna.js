var r = require('rethinkdb');
var db = require('../config/db');
var conn = null;

var table = 'pengguna';

var model = {};

r.connect(db, function (err, connection) {
    conn = connection;
    if (err) console.log("Database Error : " + err);
    else {
        model.save = (data, callback) => {
            r.table(table).insert(data).run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
        model.get = (data, callback) => {
            r.table(table).get(data).run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
        model.filter = (id_level, callback) => {
            r.table(table).filter({
                id_level: id_level
            }).run(conn, (err, cursor) => {
                cursor.toArray((err, result) => {
                    if (err) console.log(err);
                    else callback(result[0]);
                });
            });
        };
        model.update = (id_level, data, callback) => {
            r.table(table).filter({
                id_level: id_level
            }).update(data).run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
        model.delete = (id_level, callback) => {
            r.table(table).filter({
                id_level: id_level
            }).delete().run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
        model.checkuser = (username, password, callback) => {
            r.table(table).filter({
                username: username
            }).run(conn, (err, cursor) => {
                cursor.toArray((err, result) => {
                    if (result.length == 1) {
                        if (result[0].level == 'desa') {
                            r.table(table).get(result[0].id).merge(function (agt) {
                                return {
                                    info: r.db(db.db).table('desa').get(agt('id_level'))
                                }
                            }).run(conn, (err, result) => {
                                if (result.password == password) {
                                    callback({
                                        status: true,
                                        data: result
                                    })
                                } else {
                                    callback({
                                        status: false
                                    })
                                }
                            });
                        } else if (result[0].level == 'kecamatan') {
                            r.table(table).get(result[0].id).merge(function (agt) {
                                return {
                                    info: r.db(db.db).table('kecamatan').get(agt('id_level'))
                                }
                            }).run(conn, (err, result) => {
                                if (result.password == password) {
                                    callback({
                                        status: true,
                                        data: result
                                    })
                                } else {
                                    callback({
                                        status: false
                                    })
                                }
                            });
                        } else if (result[0].level == 'kabupaten') {
                            r.table(table).get(result[0].id).merge(function (agt) {
                                return {
                                    info: r.db(db.db).table('kabupaten').get(agt('id_level'))
                                }
                            }).run(conn, (err, result) => {
                                if (result.password == password) {
                                    callback({
                                        status: true,
                                        data: result
                                    })
                                } else {
                                    callback({
                                        status: false
                                    })
                                }
                            });
                        } else if (result[0].level == 'provinsi') {
                            r.table(table).get(result[0].id).merge(function (agt) {
                                return {
                                    info: r.db(db.db).table('provinsi').get('af29f190-a580-4e0d-8af2-f988b293227b')
                                }
                            }).run(conn, (err, result) => {
                                console.log(result);
                                if (result.password == password) {
                                    callback({
                                        status: true,
                                        data: result
                                    })
                                } else {
                                    callback({
                                        status: false
                                    })
                                }
                            });
                        } else {
                            callback({
                                status: false
                            })
                        }
                    } else {
                        callback({
                            status: false
                        })
                    }
                });
            });
        };
    }
});

module.exports = model;