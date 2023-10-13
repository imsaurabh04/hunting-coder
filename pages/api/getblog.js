// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs"

export default function handler(req, res) {
  const query = req.query.slug
  fs.readFile(`blogdata/${query}.json`, "utf-8", (err, data) => {
    if (err){
      res.status(500).json({error: "No such blog found!"})
    }
    res.status(200).json(JSON.parse(data))
  })
}
