import Database from 'better-sqlite3'

const db = new Database('./data.db', {
  verbose: console.log
})

const museums = [
  {
    name: 'Archaelogical Museum of Egnatia',
    city:'Durres'
  },
  {
    name: 'National Museum of Albania',
    city: 'Tirana'
  },
  {
    name: 'Museum of War',
    city: 'Vlora'
  }
]

const works = [
  {
    name: 'Sword of Scanderbeg',
    picture: "museum.jpg",
    museumId: 1
  },
  {
    name: 'Sword of Muji',
    picture: "museum1.jpg",
    museumId: 1
  },
  {
    name: 'Helmet of partisans',
    picture: "museum2.jpg",
    museumId: 2
  },
  {
    name: 'Call to arms of partisans',
    picture: "museum3.jpg",
    museumId: 2
  },
  {
    name: 'Ancient albanians costumes',
    picture: "museum4.jpg",
    museumId: 3
  }
]

const dropMuseums = db.prepare(`DROP TABLE IF EXISTS museums;`)
const dropWorks = db.prepare(`DROP TABLE IF EXISTS works;`)

dropWorks.run()
dropMuseums.run()

const createMuseums = db.prepare(`
CREATE TABLE IF NOT EXISTS museums (
  id     INTEGER,
  name   TEXT NOT NULL,
  city  TEXT NOT NULL,
  PRIMARY KEY(id)
);
`)

const createWorks = db.prepare(`
CREATE TABLE IF NOT EXISTS works (
  id    	INTEGER,
  name  	TEXT NOT NULL,
  picture 	TEXT NOT NULL,
  museumId INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(museumId) REFERENCES museums(id)
);`)

createWorks.run()
createMuseums.run()

const createMuseum = db.prepare(`
INSERT INTO museums (name, city) VALUES (?, ?);
`)

const createWork = db.prepare(`
INSERT INTO works (name, picture, museumId) VALUES (?, ?, ?);
`)

for (const museum of museums) {
  createMuseum.run(museum.name, museum.city)
}

for (const work of works) {
  createWork.run(work.name, work.picture, work.museumId)
}