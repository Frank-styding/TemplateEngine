export class UpdateFunction<T> {
  constructor(public callback: (prev?: T) => T) {}
  prev?: T;
  call() {
    const result = this.callback(this.prev);
    this.prev = result;
  }
}
