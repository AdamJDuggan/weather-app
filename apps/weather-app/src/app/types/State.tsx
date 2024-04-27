import Day from './Day';
import Temperature from './Tempreture';

type State = {
  search: string;
  pending: boolean;
  error: boolean;
  scale: Temperature;
  days: Array<Day>;
};

export default State;
