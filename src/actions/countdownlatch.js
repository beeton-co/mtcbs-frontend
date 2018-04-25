let CountdownLatch = function (count) {
  this.count = count;

  this.waitBlock = function () {
  };
};
CountdownLatch.prototype.async = function (fn) {
  let _this = this;
  fn(function () {
    _this.count = _this.count - 1;
    if (_this.count <= 0) {
      return _this.waitBlock();
    }
  });
};
CountdownLatch.prototype.await = function (callback) {
  this.waitBlock = callback;
};

export default CountdownLatch;