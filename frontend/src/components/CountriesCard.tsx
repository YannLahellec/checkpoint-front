import { useNavigate } from "react-router-dom";
import { useCountriesQuery } from "../graphql/hooks";
import { Card, CardTitle } from "./ui/card";

export default function CountriesCard() {
  const { data } = useCountriesQuery();
  const navigate = useNavigate();

  const handleClick = (code: string) => {
    navigate(`/country/${code}`);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-center mt-5 gap-4">
      {data?.countries.map((country) => (
        <Card
          key={country.id}
          className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleClick(country.code)}
        >
          <div>
            <CardTitle>{country.name}</CardTitle>
            <p>{country.emoji}</p>
          </div>
        </Card>
      ))}
    </section>
  );
}
