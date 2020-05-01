interface BillableChartProps {
  title: string;
  firstData: {
    title: string;
    value: string;
  };
  secondData: {
    title: string;
    value: string;
  };
  percentage: number;
}

export default function BillableChart(props: BillableChartProps) {
  return (
    <div className="flex space-x-3">
      <div className="relative">
        <div className="absolute h-full w-full flex items-center justify-center">
          <div className="font-bold">{Math.round(props.percentage)}%</div>
        </div>
        <svg width="69" height="69" viewBox="0 0 42 42" className="donut">
          <circle
            className="donut-hole"
            cx="21"
            cy="21"
            r="15.9154943092"
            fill="#ffffff"
          />

          <circle
            className="donut-segment"
            cx="21"
            cy="21"
            r="15.9154943092"
            stroke="rgb(65, 180, 25)"
            fill="transparent"
            strokeWidth="5"
          />

          <circle
            className="donut-segmenx"
            cx="21"
            cy="21"
            r="15.9154943092"
            fill="transparent"
            strokeWidth="5"
            stroke="rgb(181, 229, 165)"
            strokeDasharray={`${100 - props.percentage} ${props.percentage}`}
            strokeDashoffset="25"
          />
        </svg>
      </div>
      <div>
        <div className="text-gray-700">{props.title}</div>
        <div className="text-gray-900 text-sm flex items-center space-x-1">
          <div
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: `rgb(65, 180, 25)` }}
          ></div>
          <div>
            <span className="font-bold">{props.firstData.value}</span>{" "}
            {props.firstData.title}
          </div>
        </div>
        <div className="text-gray-900 text-sm flex items-center space-x-1">
          <div
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: `rgb(181, 229, 165)` }}
          ></div>
          <div>
            <span className="font-bold">{props.secondData.value}</span>{" "}
            {props.secondData.title}
          </div>
        </div>
      </div>
    </div>
  );
}
