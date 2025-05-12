import { useNavigate } from "react-router-dom";
import { useCountriesQuery } from "../graphql/hooks";
import { Card, CardTitle } from "./ui/card";

export default function CountriesCard() {
  const { data } = useCountriesQuery();
  const navigate = useNavigate();

  const handleClick = (countryId: number) => {
    navigate(`/country/${countryId}`);
  };

  return (
    <section className="flex flex-wrap justify-center mt-5 gap-4">
      {data?.countries.map((country) => (
        <Card
          key={country.id}
          className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleClick(country.id)}
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
