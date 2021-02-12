import { useState } from "react";
import styled from "@emotion/styled";
import {
  Container,
  Flex,
  Spacer,
  Text,
  List,
  ListItem,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { useGetItems } from "../../hooks/useGetItems";
import { useAddItem } from "../../hooks/useAddItem";
import { useDeleteItem } from "../../hooks/useDeleteItem";

const Wrapper = styled(Container)({
  borderRadius: 6,
  backgroundColor: "#fff",
  border: "solid 1px rgb(226, 232, 240)",
  boxShadow:
    "0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)",
  padding: "10px 30px",
  marginTop: 40,
});

const Item = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "solid 1px rgb(226, 232, 240)",
  padding: 15,
  "&:last-of-type": {
    borderBottom: 0,
  },
});

function TodoList() {
  const [itemValue, setItemValue] = useState("");
  const [displayAddInput, setDisplayAddInput] = useState(false);
  const { data: items, status: getStatus } = useGetItems();
  const { mutate: addItem, status: addItemStatus } = useAddItem();
  const { mutate: deleteItem } = useDeleteItem();

  console.log(getStatus);

  const onAddItem = () => {
    if (itemValue) {
      addItem(
        { text: itemValue },
        {
          onSuccess: () => {
            setDisplayAddInput(false);
          },
        }
      );
    }
  };

  const onDelete = (id) => () => {
    deleteItem({ id });
  };

  return (
    <Wrapper>
      <Flex alignItems="center">
        <Text fontSize="4xl">Reminders</Text>
        <Spacer />
        <AddIcon
          aria-label="Add Icon"
          role="button"
          cursor="pointer"
          onClick={() => setDisplayAddInput((prev) => !prev)}
        />
      </Flex>
      <List>
        {getStatus === "error" && <Item>Upps! items not found</Item>}
        {getStatus === "success" &&
          items.map((item) => (
            <Item key={item.id}>
              {item.text}{" "}
              <DeleteIcon
                role="button"
                aria-label={`Delete ${item.text}`}
                color="gray.400"
                cursor="pointer"
                onClick={onDelete(item.id)}
              />
            </Item>
          ))}
        {displayAddInput && (
          <Item>
            <InputGroup size="sm">
              <Input
                pr="4.7rem"
                placeholder="Eg. Drink Water"
                onChange={(e) => setItemValue(e.target.value)}
                border="0"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={onAddItem}>
                  Add item
                </Button>
              </InputRightElement>
            </InputGroup>
            {addItemStatus === "error" && (
              <Text color="crimson" fontSize="0.875rem" pl="0.75rem">
                Upps! error trying to add a new item
              </Text>
            )}
          </Item>
        )}
      </List>
    </Wrapper>
  );
}

export default TodoList;
