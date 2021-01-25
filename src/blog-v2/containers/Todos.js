import React from "react";
import { useParams, Redirect } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import { Container, Header, List, Icon } from "semantic-ui-react";
import useData from "../hooks/useData";

export default function Todos() {
  const { userId } = useParams();
  const [, , error] = useData(`/users/${userId}`, {});
  const [todos, isFetching] = useData(`/users/${userId}/todos`, []);

  console.log(todos);
  console.log(isFetching);

  if (error && error.status === 404) {
    console.log(error);
    return <Redirect to={"/users"} />;
  }

  return (
    <Container>
      <LoadingOverlay active={isFetching} />
      <Header>Todos</Header>
      <List animated verticalAlign="middle">
        {todos.map((todo, id) => (
          <List.Item key={id}>
            <Icon name="book" />
            <List.Content>
              <List.Header>{todo.title}</List.Header>
              <List.Description>
                {todo.completed ? "Completed" : "No completed"}
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Container>
  );
}
