// 3rd party
import classnames from 'classnames';
// Components
import DayCard from '../DayCard';
import ProgressCard from '../ProgressCard';
import StatCard from '../StatCard';
import TodayCard from '../TodayCard';

type Props = {
  type: 'today' | 'day' | 'progress' | 'stat';
  ready: object | false;
  data: any;
  pending: boolean;
};

const TYPES = {
  today: TodayCard,
  day: DayCard,
  progress: ProgressCard,
  stat: StatCard,
};

const HEIGHT = {
  today: '100%',
  day: '270.08px',
  progress: '187.08px',
  stat: '118px',
};

export default function Card(props: Props) {
  const Component = TYPES[props.type];
  return (
    <div
      style={{ minHeight: HEIGHT[props.type] }}
      className={classnames(
        'card',
        props.pending && 'card-pending',
        !props.ready && 'card-empty'
      )}
    >
      {!props.pending && props.ready && <Component {...props.data} />}
    </div>
  );
}
