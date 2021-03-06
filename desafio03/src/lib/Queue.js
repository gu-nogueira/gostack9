import Bee from 'bee-queue';
import redisConfig from '../config/redis';

// Jobs
import OrderMail from '../app/jobs/OrderMail';
import CancellationMail from '../app/jobs/CancellationMail';

const jobs = [OrderMail, CancellationMail];

class Queue {

  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
    console.timeEnd("Load time");
    console.log("Complete!");
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }

}

export default new Queue();
