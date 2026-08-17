import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectDemoProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function SelectDemo({ value, onValueChange }: SelectDemoProps) {
  const handwerkerliste = [
    "Elektriker",
    "Sanitär",
    "Hauswartung",
    "Maurer",
    "Bodenleger",
    "Maler",
    "Gipser",
    "Schreiner",
  ];
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Wähle einen Handwerker aus" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Handwerker</SelectLabel>
          {handwerkerliste.map((handwerker) => (
            <SelectItem key={handwerker} value={handwerker}>
              {handwerker}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
