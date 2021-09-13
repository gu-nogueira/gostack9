console.time("Load time");
console.log("Loading app...");

import app from './app';

app.listen(2000);

console.log('Server is listening in: http://localhost:2000');
