require('dotenv').config();

const CONFIG = {};
CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '5000';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mongo';
CONFIG.db_server = process.env.DB_SERVER || 'localhost';

CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '27017';

CONFIG.db_name = process.env.DB_NAME || 'student_widget';
CONFIG.db_user = process.env.DB_USER || undefined;
CONFIG.db_password = process.env.DB_PASSWORD || undefined;

CONFIG.log_path = 'log';

module.exports = CONFIG;
