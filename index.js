const MongonClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

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
