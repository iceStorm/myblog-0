db = db.getSiblingDB('pls_tools')

db.createCollection('settings')

db.settings.insertMany([
  {
    initialized_date: new Date()
  }
])
