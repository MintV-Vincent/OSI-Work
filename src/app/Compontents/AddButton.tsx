import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Group,
  Button,
  TextInput,
  NumberInput,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { createMaterialRow } from "Functions/Create/MapCreate";
import { materialRowMap } from "Library/Types";
import { useAtom } from "jotai";
import TextInputForm from "./Forms/TextInputForm";
interface AddButtonInterface {
  atom: any;
  data: materialRowMap[];
  setData: React.Dispatch<React.SetStateAction<materialRowMap[]>>;
}

export function AddButton({ atom, data, setData }: AddButtonInterface) {
  const [opened, { open, close }] = useDisclosure(false);
  const [, setMaterial] = useAtom(atom);

  const form = useForm<{
    material: string;
    custom: number | undefined;
    price: number | undefined;
  }>({
    initialValues: { material: "", custom: undefined, price: undefined },
    validate: (values) => ({
      material: values.material.length < 1 ? "Invalid Material" : null,
      custom: values.custom === undefined ? "Code is required" : null,
      price:
        values.price === undefined
          ? "Price is required"
          : values.price < 0
          ? "Positive Numbers Only"
          : null,
    }),
  });

  return (
    <Group position="center">
      <Modal opened={opened} onClose={close} title="Add Material" centered>
        <Box maw={340} mx="auto">
          <form
            onSubmit={form.onSubmit((values) => {
              if (
                form &&
                values.custom != undefined &&
                values.price != undefined &&
                values.material != ""
              ) {
                setMaterial(
                  values.material,
                  values.material,
                  values.price,
                  "cost * exchange",
                  values.custom,
                  "Added"
                );
                const newRow = createMaterialRow(data.length + 1);
                setData([...data, newRow]);

                values.material = "";
                values.custom = undefined;
                values.price = undefined;
                close();
              }
            })}
          >
            <TextInputForm form={form} text={"Formula"} />
            <TextInput
              required
              label="Material"
              placeholder="Material"
              {...form.getInputProps("material")}
            />
            <NumberInput
              required
              mt="sm"
              label="Code"
              placeholder="Code"
              {...form.getInputProps("custom")}
            />
            <NumberInput
              required
              mt="sm"
              label="Price"
              placeholder="Price"
              {...form.getInputProps("price")}
            />

            <Group position="right" mt="md">
              <Button type="submit" className="">
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Modal>
      <Button onClick={open} className="z-50">
        Add Material
      </Button>
    </Group>
  );
}
