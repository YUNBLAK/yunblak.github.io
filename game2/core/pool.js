export class ObjectPool {
  constructor(limit) { this.limit = limit; this.items = []; this.cursor = 0; }
  add(item) {
    if (this.items.length < this.limit) {
      this.items.push(item);
    } else {
      this.items[this.cursor] = item;
      this.cursor = (this.cursor + 1) % this.limit;
    }
    return item;
  }
  update(fn) {
    let writeIndex = 0;
    for (let readIndex = 0; readIndex < this.items.length; readIndex++) {
      const item = this.items[readIndex];
      if (fn(item) !== false) this.items[writeIndex++] = item;
    }
    this.items.length = writeIndex;
    if (this.cursor >= writeIndex) this.cursor = 0;
  }
  clear() { this.items.length = 0; this.cursor = 0; }
}
