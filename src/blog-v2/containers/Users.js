import React from "react";
import { Container, Grid, Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useData from "../hooks/useData";
import LoadingOverlay from "../components/LoadingOverlay";

export default function Users() {
  const [users, isLoading] = useData("/users", []);
  console.log(users);
  return (
    <Container>
      <LoadingOverlay active={isLoading} />
      <Grid columns="4">
        {users.map((user, i) => (
          <Grid.Column key={i}>
            <Card>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </Card.Header>
                <Card.Meta>
                  <span className="date">{user.email}</span>
                </Card.Meta>
                <Card.Description>
                  {user.address.street}, {user.address.suite},
                  {user.address.city}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </Container>
  );
}
