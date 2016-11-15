var r = require('rethinkdb');
var db = require('../config/db');
var conn = null;

var table = 'anggota';

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
        model.get = (id, callback) => {
            r.table(table).get(id).merge(function (agt) {
                return {
                    desa: r.db(db.db).table('desa').get(agt('desa')),
                    kecamatan: r.db(db.db).table('kecamatan').get(agt('kecamatan')),
                    kabupaten: r.db(db.db).table('kabupaten').get(agt('kabupaten'))
                }
            }).run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
        model.getall = (callback) => {
            r.table(table).merge(function (agt) {
                return {
                    desa: r.db(db.db).table('desa').get(agt('desa')),
                    kecamatan: r.db(db.db).table('kecamatan').get(agt('kecamatan')),
                    kabupaten: r.db(db.db).table('kabupaten').get(agt('kabupaten'))
                }
            }).orderBy('nama').run(conn, (err, cursor) => {
                cursor.toArray((err, result) => {
                    if (err) console.log(err);
                    else callback(result);
                });
            });
        };
        model.update = (id, data, callback) => {
            r.table(table).get(id).update(data).run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
        model.delete = (id, callback) => {
            r.table(table).get(id).delete().run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
        model.deletebydesa = (value, callback) => {
            r.table(table).filter({
                desa: value
            }).delete().run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
        model.deletebykecamatan = (value, callback) => {
            r.table(table).filter({
                kecamatan: value
            }).delete().run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
        model.deletebykabupaten = (value, callback) => {
            r.table(table).filter({
                kabupaten: value
            }).delete().run(conn, (err, result) => {
                if (err) console.log(err);
                else callback(result);
            });
        };
        model.pagi = (parampagi, callback) => {
            r.table(table).count().run(conn, (err, result) => {
                var pagi = {}
                pagi.data = result
                pagi.active = parampagi
                pagi.total = Math.ceil(pagi.data / 20)
                pagi.skip = 20 * (pagi.active - 1)
                if (pagi.active > 1 && pagi.active > pagi.total) {
                    pagi.status = 0
                } else {
                    pagi.status = 1
                }
                r.table(table).merge(function (agt) {
                    return {
                        desa: r.db(db.db).table('desa').get(agt('desa')),
                        kecamatan: r.db(db.db).table('kecamatan').get(agt('kecamatan')),
                        kabupaten: r.db(db.db).table('kabupaten').get(agt('kabupaten'))
                    }
                }).orderBy('nama').skip(pagi.skip).limit(20).run(conn, (err, cursor) => {
                    cursor.toArray((err, result) => {
                        if (err) console.log(err);
                        else callback(pagi, result);
                    });
                });
            });
        };
        model.pagidesa = (parampagi, paramid, callback) => {
            r.table(table).filter({
                desa: paramid
            }).count().run(conn, (err, result) => {
                var pagi = {}
                pagi.data = result
                pagi.active = parampagi
                pagi.total = Math.ceil(pagi.data / 20)
                pagi.skip = 20 * (pagi.active - 1)
                if (pagi.active > 1 && pagi.active > pagi.total) {
                    pagi.status = 0
                } else {
                    pagi.status = 1
                }
                r.table(table).filter({
                    desa: paramid
                }).merge(function (agt) {
                    return {
                        desa: r.db(db.db).table('desa').get(agt('desa')),
                        kecamatan: r.db(db.db).table('kecamatan').get(agt('kecamatan')),
                        kabupaten: r.db(db.db).table('kabupaten').get(agt('kabupaten'))
                    }
                }).orderBy('nama').skip(pagi.skip).limit(20).run(conn, (err, cursor) => {
                    cursor.toArray((err, result) => {
                        if (err) console.log(err);
                        else callback(pagi, result);
                    });
                });
            });
        };
        model.pagikecamatan = (parampagi, paramid, callback) => {
            r.table(table).filter({
                kecamatan: paramid
            }).count().run(conn, (err, result) => {
                var pagi = {}
                pagi.data = result
                pagi.active = parampagi
                pagi.total = Math.ceil(pagi.data / 20)
                pagi.skip = 20 * (pagi.active - 1)
                if (pagi.active > 1 && pagi.active > pagi.total) {
                    pagi.status = 0
                } else {
                    pagi.status = 1
                }
                r.table(table).filter({
                    kecamatan: paramid
                }).merge(function (agt) {
                    return {
                        desa: r.db(db.db).table('desa').get(agt('desa')),
                        kecamatan: r.db(db.db).table('kecamatan').get(agt('kecamatan')),
                        kabupaten: r.db(db.db).table('kabupaten').get(agt('kabupaten'))
                    }
                }).orderBy('nama').skip(pagi.skip).limit(20).run(conn, (err, cursor) => {
                    cursor.toArray((err, result) => {
                        if (err) console.log(err);
                        else callback(pagi, result);
                    });
                });
            });
        };
        model.pagikabupaten = (parampagi, paramid, callback) => {
            r.table(table).filter({
                kabupaten: paramid
            }).count().run(conn, (err, result) => {
                var pagi = {}
                pagi.data = result
                pagi.active = parampagi
                pagi.total = Math.ceil(pagi.data / 20)
                pagi.skip = 20 * (pagi.active - 1)
                if (pagi.active > 1 && pagi.active > pagi.total) {
                    pagi.status = 0
                } else {
                    pagi.status = 1
                }
                r.table(table).filter({
                    kabupaten: paramid
                }).merge(function (agt) {
                    return {
                        desa: r.db(db.db).table('desa').get(agt('desa')),
                        kecamatan: r.db(db.db).table('kecamatan').get(agt('kecamatan')),
                        kabupaten: r.db(db.db).table('kabupaten').get(agt('kabupaten'))
                    }
                }).orderBy('nama').skip(pagi.skip).limit(20).run(conn, (err, cursor) => {
                    cursor.toArray((err, result) => {
                        if (err) console.log(err);
                        else callback(pagi, result);
                    });
                });
            });
        };
    }
});

module.exports = model;