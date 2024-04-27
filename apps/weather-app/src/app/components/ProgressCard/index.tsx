// 3rd party
import classnames from 'classnames';

type Props = {
  type: 'humidity' | 'cloud';
  progress: number;
  cardClass: string;
};

const TYPES = {
  humidity: { title: 'Humidity', backgroundColor: '#A9FF53' },
  cloud: { title: 'Cloud cover', backgroundColor: '#FAFF00' },
};

export default function ProgressCard(props: Props) {
  const { title, backgroundColor } = TYPES[props.type];

  return (
    <div className={classnames(props.cardClass, 'card progress-card')}>
      <h2>{title}</h2>
      <h3>{Math.round(props.progress)}%</h3>
      <div className="percent-symbol">
        <span>%</span>
      </div>
      <div className="progress-bar-container">
        <div
          style={{ width: `${props.progress}%`, backgroundColor }}
          className="progress-bar"
        />
      </div>
      <div className="progress-percent">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
}
