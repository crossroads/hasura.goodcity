const axios = require('axios');

let meta = null;

async function preload(host, adminKey) {
  const url = `https://${host}/v1/query`;

  const { data } = await axios.default.post(url, {
    type: "export_metadata",
    args: {}
  }, {
    headers: {
      "x-hasura-admin-secret": adminKey
    }
  });

  meta = data;
}

module.exports = {
  preload,

  get meta() {
    return meta;
  }
}