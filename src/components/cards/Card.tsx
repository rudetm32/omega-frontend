
interface CardProps {
  title: string;
  value: string | number;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default Card;
