const { createClient } = require("@astrajs/collections")
const cassandra = require('cassandra-driver');
const Point = cassandra.geometry.Point;

// creates unique universal ID with respect to time/ Date()
const myuuid = JSON.stringify(cassandra.types.TimeUuid.now());
// define your collection here it automatically creates one if you dont have yet
const collection = 'wildlife'


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
      name: body.name,
      caption: body.caption,
      description: body.description,
      username: body.username,
      email: body.email,
      ofClass: body.ofClass,
      location: body.location,
      attended_to: false,
      created_at: body.created_at,
      images: body.photo,
      coord: body.coord,
      button_visible: true,
      endanger: body.endanger,
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
