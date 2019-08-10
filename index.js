require('dotenv').config();
require('module-alias/register');

const Queuing = require('@src/Queuing.js');
const queuing = new Queuing();
queuing.load();
