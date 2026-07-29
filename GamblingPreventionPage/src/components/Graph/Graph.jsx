import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import styles from "./Graph.module.css";
function Graph({ chances, freq }) {
  const [data, setData] = useState(null);
  const params = new URLSearchParams();
  if (chances !== undefined) params.append("chances", chances);
  if (freq !== undefined) params.append("freq", freq);
  useEffect(() => {
    fetch(`https://gamblingapi-v8z9.onrender.com/gambling?${params.toString()}`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [chances, freq]);

  if (!data) return <p>Waking API..</p>;

  const chartData = {
    labels: data.HISTORY.map((h) => h.round),
    datasets: [
      {
        label: "  ",
        data: data.HISTORY.map((h) => h.currentMoney),
        borderColor: "gray",
        pointBackgroundColor: data.HISTORY.map((h) =>
          h.win ? "green" : "red",
        ),
        pointRadius: 2,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Survived for ${data.TRY_SURVIVED} rounds, ended up with $${data.FINAL_MONEY}`,
      },    legend: {
      display: false,
    },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default Graph;
