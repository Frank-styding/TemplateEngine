export class UpdateFunction {
  constructor(public callback: (prev?: any) => any) {}
  prev?: any;
  call() {
    const result = this.callback(this.prev);
    this.prev = result;
  }
}
