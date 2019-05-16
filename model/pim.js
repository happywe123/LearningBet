const AV = require('../utils/av-live-query-weapp-min');

class Pim extends AV.Object {
  get done() {
    return this.get('done');
  }
  set done(value) {
    this.set('done', value);
  }

  get content() {
    return this.get('content');
  }
  set content(value) {
    this.set('content', value);
  }
}

AV.Object.register(Pim, 'Pim');
module.exports = Pim;
