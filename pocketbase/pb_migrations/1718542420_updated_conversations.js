/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jehpxnuj5cdkgod")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "op6ovglo",
    "name": "chat",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "xis11otnjha71iy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jehpxnuj5cdkgod")

  // remove
  collection.schema.removeField("op6ovglo")

  return dao.saveCollection(collection)
})
