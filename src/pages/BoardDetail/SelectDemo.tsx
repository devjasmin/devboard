import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
  const handwerkerliste = [
    "Elektriker",
    "Sanitär",
    "Hauswartung",
    "Maurer",
    "Bodenleger",
    "Maler",
    "Gipser",
  ];
  return (
    <Select>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Wähle einen Handwerker aus" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Handwerker</SelectLabel>
          <SelectItem value="Elektriker">Elektriker</SelectItem>
          <SelectItem value="Sanitär">Sanitär</SelectItem>
          <SelectItem value="Hauswart">Hauswartung</SelectItem>
          <SelectItem value="Maurer">Maurer</SelectItem>
          <SelectItem value="Bodenleger">Bodenleger</SelectItem>
          <SelectItem value="Maler">Maler</SelectItem>
          <SelectItem value="Gipser">Gipser</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
