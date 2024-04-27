// React
import { ReactNode } from 'react';
// 3rd party
import classnames from 'classnames';

type Props = {
  title: string;
  render: ReactNode;
  cardClass: string;
};

export default function StatCard(props: Props) {
  const Child = props.render;
  return (
    <div className={classnames(props.cardClass, 'card stat-card')}>
      <h2>{props.title}</h2>
      <Child />
    </div>
  );
}
