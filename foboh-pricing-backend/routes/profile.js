router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.post("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.put("/:id", (req, res) => {
  res.json({ message: "Hello World" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Hello World" });
});
module.exports = router;
