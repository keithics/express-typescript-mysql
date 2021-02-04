import app from './app';
const port = 3000

/**
 * Start the server
 */
app.listen(port, () => {
  console.log('Express TS running on http://localhost:' + port);
  console.log('--');
  console.log();
});


