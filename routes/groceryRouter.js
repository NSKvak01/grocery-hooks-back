var express = require('express');
var router = express.Router();

let {
    getAllGroceries,
    createGrocery,
    updateGrocery,
    deleteGrocery,
    sortByPurchased
} = require("./controller/groceryController")

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get("/get-all-groceries", getAllGroceries)
router.post("/create-grocery", createGrocery)
router.put("/update-grocery-by-id/:id", updateGrocery)
router.delete("/delete-grocery-by-id/:id", deleteGrocery)
router.get("/sort-by-purchased", sortByPurchased)

module.exports = router;