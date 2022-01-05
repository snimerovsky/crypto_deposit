import {createServer} from "./server";
require('dotenv').config()

const PORT = process.env.PORT;
const app = createServer()

app.server.listen(process.env.PORT || PORT, () => {
    app.logger.info(`App is running on port ${app.server.address().port}`);
});
