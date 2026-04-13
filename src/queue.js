
const { Queue } = require('bullmq');
const IORedis = require('ioredis');
const conn = new IORedis(process.env.REDIS_URL);

const q = new Queue('eval',{connection:conn});

exports.addJob = async (path,jd)=>{
  const job = await q.add('eval',{path,jd});
  return job.id;
}
