import { useCountryQuery } from "@/graphql/hooks";
import { useParams } from "react-router-dom";

export default function CountryDetails() {
  const { code } = useParams();
  const { data } = useCountryQuery({
    variables: {
      code: code ?? "",
    },
  });

  const country = data?.country

  return (
    <section className="flex flex-col items-center mt-5">
        <h1 className="text-9xl">{country?.emoji}</h1>
        <p>Name: {country?.name} ({country?.code})</p>
    </section>
  );
}
