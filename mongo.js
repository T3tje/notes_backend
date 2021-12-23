const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstackopen:${password}@cluster0.mwzy7.mongodb.net/note-app?retryWrites=true&w=majority`
  

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result  => {
    result.forEach(note => { 
        console.log(note);
    })
})


const note = new Note({
  content: 'Ik pe Ba mi La gu Njonga',
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
})

const note2 = new Note({
  content: 'Lala, Lulu, lili',
  date: new Date(),
  important: false,
})

note2.save().then(result => {
  console.log('note2 saved!')
  mongoose.connection.close()
})

