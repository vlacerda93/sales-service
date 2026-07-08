const app = require('./app');
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Sales service running on port ${PORT}`);
});
