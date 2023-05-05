export class CounterService {
  public counter = 0;

  public addCount() {
    this.counter++;
  }

  public removeCount() {
    this.counter--;
  }
}

export const CounterServiceAPI = new CounterService();
