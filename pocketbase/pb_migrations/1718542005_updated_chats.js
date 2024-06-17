/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xis11otnjha71iy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gauqdm2r",
    "name": "content",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xis11otnjha71iy")

  // remove
  collection.schema.removeField("gauqdm2r")

  return dao.saveCollection(collection)
})
