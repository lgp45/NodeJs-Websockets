if(process.env.NODE_ENV === "production")
{
    module.exports = {mongoURI: "mongodb+srv://lgp45:OXZSa1mwDRkwsULw@cluster0.6tdwqxl.mongodb.net/?retryWrites=true&w=majority"}
    console.log("Server is running online using Render...");
}
else
{
    module.exports = {mongoURI: "mongodb://localhost:27017/gameEntries"}
    console.log("Server is running locally...\n")
}