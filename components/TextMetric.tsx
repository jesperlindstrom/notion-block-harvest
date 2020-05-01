interface TextMetricProps {
  title: string;
  value: string;
}

export default function TextMetric(props: TextMetricProps) {
  return (
    <div>
      <div className="text-gray-700">{props.title}</div>
      <div className="text-gray-900 text-3xl font-bold">{props.value}</div>
    </div>
  );
}
