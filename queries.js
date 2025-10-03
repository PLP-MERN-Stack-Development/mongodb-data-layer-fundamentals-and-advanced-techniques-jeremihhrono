//books by specific genre
db.books.find({ genre: "Fiction" })




//books after certain year 
db.books.find({ published_year: { $gt: 1940 } })




//books by specific author
db.books.find({ author: "George Orwell" })




//update price by title
db.books.updateOne(
  { title: "Animal Farm" },
  { $set: { price: 22.00 } }
)




//delte book by title
db.books.deleteOne({ title: "The Art of War" })



//books in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})




//return title, author and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)


//sorting by price ascending order
db.books.find().sort({ price: 1 })


//sorting by price descending
db.books.find().sort({ price: -1 })


//pagination
db.books.find().skip(5).limit(5)

//average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", average_price: { $avg: "$price" } } }
])


//author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])


//group by decade and count
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])


//title index
db.books.createIndex({ title: 1 })


//compound index on author and published year
db.books.createIndex({ author: 1, published_year: -1 })








