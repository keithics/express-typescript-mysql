import app from './app';
import {config} from './config/config';
const port = config.PORT
const chalk = require('chalk');
/**
 * Start the server
 */
const env = process.env.NODE_ENV || 'development';
app.listen(port, () => {
  console.log(chalk.blue(`Express MYSQL REST API running on http://localhost:${port}`));
  console.log(chalk.green(`Express GraphSQL running on http://localhost:${port}/graphql`));
  console.log(chalk.yellow(`Running at ENV : ${env}`));
  console.log('--');
  console.log();
});


