import express  from  "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

app.get("/", (req,res)=>{

    res.render("index.ejs");
});

app.post("/", async (req,res)=>{
   
    try {
        
        const response = await axios ({
            method: "get", 
            url: "https://lexicala1.p.rapidapi.com/search-definitions",
            params:{ 
                text: req.body.word, 
                language: "en",
            },
            headers: {
                 "x-rapidapi-key": "a4ef7d8e25msh1e80e2b8205319dp116b23jsne5a66f2332b7",
                "x-rapidapi-host": "lexicala1.p.rapidapi.com",
             }


        });

        let ranNum = Math.floor((Math.random () * 10));
        
        const definition = response.data.results?.[ranNum]?.definition || "Meaning not found";
        res.json({
            definition
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            definition: "Error fetching definition",
        });
    }



});


app.listen(port,()=>{

    console.log(`Server is running on port ${port}`);
});