import fastify from 'fastify';
import pino from 'pino';
const server = fastify({
    logger: pino({
        level: 'info',
        messageKey: 'message'
    })
});
server.listen(2020).then(address => {
    console.log(`服务正在运行， 地址：${address}`);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
