import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CountriesDocument, useAddCountryMutation } from "@/graphql/hooks";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().length(2, "Country code must be exactly 2 characters"),
  emoji: z.string().optional(),
  // continent: z.string().optional(),
});

export default function AddCountryForm() {
  const [AddCountry] = useAddCountryMutation({
    refetchQueries: [{query: CountriesDocument}]
  });
  // const { data: continentsData } = useContinentsQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      emoji: "",
      // continent: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await AddCountry({
        variables: {
          data: {
            name: data.name,
            code: data.code,
            emoji: data.emoji ?? "",
            // continent: {id: data.continent}
          },
        },
      });
    } catch (error) {
      console.error("Error submiting form", error);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8 bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap gap-4 items-end justify-center"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>code</FormLabel>
                <FormControl>
                  <Input placeholder="code" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem>
                <FormLabel>emoji</FormLabel>
                <FormControl>
                  <Input placeholder="emoji" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* no time to finish  */}
          {/* <FormField
            control={form.control}
            name="continent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>contienent</FormLabel>
                <Select
                onValueChange={field.onChange} 
                defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select continent"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {continentsData?.continents.map((continent) => (
                      <SelectItem key={continent.id} value={continent.id}>
                        {continent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          /> */}
          <div className="w-full md:w-auto flex justify-center md:justify-start">
            <Button type="submit" className="bg-fuchsia-500">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
