const MongonClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations')

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

/*
MongonClient.connect(url,(err, client) => {
    assert.equal(err,null);
    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    //insert record
    collection.insertOne({"name": "Uthappizza", "description": "test"},
     (err, result) => {
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);

        //readback and display dB dishes collection
        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);
            
            console.log("Found:\n");
            console.log(docs);

            //drop dishes collection
            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);

                client.close();
            });
        });
    }); 
});
*/
MongonClient.connect(url,(err, client) => {
    assert.equal(err,null);
    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
    "dishes", (result) => {
        console.log("Insert Document:\n", result.ops);

        dboper.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, { name: "Vadonut" },
                { name: "Updated Test" }, "dishes",
                (result) => {
                    console.log("Updated Document:\n", result.result);

                    dboper.findDocuments(db, "dishes", (docs) => {
                        console.log("Found Updated Documents:\n", docs);
                        
                        db.dropCollection("dishes", (result) => {
                            console.log("Dropped Collection: ", result);

                            client.close();
                        });
                    });
                });
        });
    });
});