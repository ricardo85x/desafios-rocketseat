import Bee from 'bee-queue';
import SubscriptionMail from '../app/jobs/SubscriptionMail';
import redisConf from '../config/redis';

const jobs = [SubscriptionMail];

class Queue {
  constructor() {
    this.queues = {};

    console.log('Deb 2');

    this.init();
  }

  init() {
    console.log('Deb 3');
    jobs.forEach(({ key, handle }) => {
      console.log(`${key}`);
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConf,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    console.log(`adicionando a queue ${queue} - job ${job}`);
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    console.log('processando queue!');
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      console.log(`job ${job}  bee - ${bee} - handle ${handle}`);

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}:  FAILED`, err);
  }
}

export default new Queue();
