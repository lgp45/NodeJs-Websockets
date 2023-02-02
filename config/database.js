if(process.env.NODE_ENV === "production")
{
    module.exports = {mongoURI: "mongodb+srv://lgp45:OXZSa1mwDRkwsULw@cluster0.6tdwqxl.mongodb.net/?retryWrites=true&w=majority"}
}
else
{
    module.exports = {mongoURI: "mongodb://localhost:27017/gameEntries"}
}