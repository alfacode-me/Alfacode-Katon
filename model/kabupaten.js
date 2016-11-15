var r = require('rethinkdb');
var db = require('../config/db');
var conn = null;

var table = 'kabupaten';

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
        model.name = (id, callback) => {
            r.table(table).get(id).run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result.nama);
            });
        };
        model.get = (level, callback) => {
            if (level.kabupaten) {
                r.table(table).filter({
                    id: level.id
                }).orderBy('nama').run(conn, (err, cursor) => {
                    cursor.toArray((err, result) => {
                        if (err) console.log(err);
                        else callback(result);
                    })
                });
            } else if (level.kecamatan) {
                r.table(table).filter({
                    id: level.kab
                }).orderBy('nama').run(conn, (err, cursor) => {
                    cursor.toArray((err, result) => {
                        if (err) console.log(err);
                        else callback(result);
                    })
                });
            } else if (level.desa) {
                r.table(table).filter({
                    id: level.kab
                }).orderBy('nama').run(conn, (err, cursor) => {
                    cursor.toArray((err, result) => {
                        if (err) console.log(err);
                        else callback(result);
                    })
                });
            } else {
                r.table(table).orderBy('nama').run(conn, (err, cursor) => {
                    cursor.toArray((err, result) => {
                        if (err) console.log(err);
                        else callback(result);
                    })
                });
            }
        };
        model.getall = (callback) => {
            r.table(table).merge(function (ds) {
                return {
                    total: r.db(db.db).table('anggota').filter({
                        kabupaten: ds('id')
                    }).count(),
                    total_desa: r.db(db.db).table('desa').filter({
                        kabupaten: ds('id')
                    }).count(),
                    total_kecamatan: r.db(db.db).table('kecamatan').filter({
                        kabupaten: ds('id')
                    }).count()
                }
            }).orderBy('nama').run(conn, (err, cursor) => {
                cursor.toArray((err, result) => {
                    if (err) console.log(err);
                    else callback(result);
                });
            });
        };
        model.delete = (id, callback) => {
            r.table(table).get(id).delete().run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
        model.pagi = (parampagi, callback) => {
            r.table(table).count().run(conn, (err, result) => {
                var pagi = {}
                pagi.data = result
                pagi.active = parampagi
                pagi.total = Math.ceil(pagi.data / 10)
                pagi.skip = 10 * (pagi.active - 1)
                if (pagi.active > 1 && pagi.active > pagi.total) {
                    pagi.status = 0
                } else {
                    pagi.status = 1
                }
                r.table(table).merge(function (ds) {
                    return {
                        total: r.db(db.db).table('anggota').filter({
                            kabupaten: ds('id')
                        }).count(),
                        total_desa: r.db(db.db).table('desa').filter({
                            kabupaten: ds('id')
                        }).count(),
                        total_kecamatan: r.db(db.db).table('kecamatan').filter({
                            kabupaten: ds('id')
                        }).count()
                    }
                }).orderBy('nama').skip(pagi.skip).limit(10).run(conn, (err, cursor) => {
                    cursor.toArray((err, result) => {
                        if (err) console.log(err);
                        else callback(pagi, result);
                    });
                });
            });
        };
        model.getbyid = (id, callback) => {
            r.table(table).get(id).run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        }
        model.update = (id, data, callback) => {
            r.table(table).get(id).update(data).run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
    }
});

module.exports = model;