const zulip = require('../lib/');

const config = {
  username: process.env.ZULIP_USERNAME,
  password: process.env.ZULIP_PASSWORD,
  realm: process.env.ZULIP_REALM,
};

zulip(config).then((z) => {
  // Retrieve events from a queue, blocking until there is an event (or the request timesout)
  const params = {
    queue_id: process.env.ZULIP_QUEUE_ID,
    last_event_id: -1,
    dont_block: false,
  };
  return z.events.retrieve(params).then(console.log);
    // Prints
    // { msg: '',
    //   result: 'success',
    //   handler_id: 2005928,
    //   events:
    //     [ { flags: [Object], message: [Object], type: 'message', id: 0 },
    //       { type: 'heartbeat', id: 1 },
    //       { flags: [], message: [Object], type: 'message', id: 2 },
    //       { flags: [], message: [Object], type: 'message', id: 3 },
    //       { flags: [], message: [Object], type: 'message', id: 4 } ] }
}).catch(err => console.log(err.message));
