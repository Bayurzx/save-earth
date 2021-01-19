const { createClient } = require("@astrajs/collections")
const cassandra = require('cassandra-driver');


const myuuid = JSON.stringify(cassandra.types.TimeUuid.now());

const collection = 'thanks'


exports.handler = async function (event, context, callback) {
    const astraClient = await createClient({
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        username: process.env.ASTRA_DB_USERNAME,
        password: process.env.ASTRA_DB_PASSWORD,
    })

    const posts = astraClient
        .namespace(process.env.ASTRA_DB_KEYSPACE)
        .collection(collection)

        const body = JSON.parse(event.body)

        const data = {
          id: myuuid,
          username: body.username,
          notes: body.notes,
          donated: body.donated,
          created_at: new Date(),

        }

    try {
         await posts.create(myuuid, data);

        return {
            statusCode: 200
        }
    } catch (e) {
        console.error(e)
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}
