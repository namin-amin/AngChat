/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jehpxnuj5cdkgod")

  collection.viewRule = "sender.id = @request.auth.id || receiver.id = @request.auth.id"
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jehpxnuj5cdkgod")

  collection.viewRule = ""
  collection.createRule = "id = @request.auth.id"

  return dao.saveCollection(collection)
})
