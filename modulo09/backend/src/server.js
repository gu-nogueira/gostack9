console.time("Load time");
console.log('Loading app...');
import app from './app';

app.listen(process.env.PORT || 2000);

console.log(`Listening in: ${process.env.APP_URL}`);
