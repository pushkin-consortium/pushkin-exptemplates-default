const pWorker = require('pushkin-worker').default;

const options = {
	amqpAddress: process.env.AMQP_ADDRESS || 'amqp://localhost',
	readQueue: 'newexp_quiz_dbread',
	writeQueue: 'newexp_quiz_dbwrite',
	taskQueue: 'newexp_quiz_taskworker',
};

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_url = process.env.DB_URL;
const db_name = process.env.DB_NAME;

const db_conn_address = `postgres://${db_user}:${db_pass}@${db_url}/${db_name}`;

const worker = new pWorker(options);
worker.init()
	.then(() => {
		worker.handle('test', data => {
			console.log(`handling test method got data: ${data}`);
			return `successfully got ${data}`;
		});
		worker.useDefaultHandles(db_conn_address, 'newexp');
		worker.start();
	})
	.catch(err => {
		console.error(`failed to initialize worker: ${err}`);
	});

