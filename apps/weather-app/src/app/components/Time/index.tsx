import { getShortTime } from '../../utils/formatDate';

type Props = {
  time: string;
};

export default function Time(props: Props) {
  return <div>{getShortTime(props.time)}</div>;
}
