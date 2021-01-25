import React from "react";
import useData from "../hooks/useData";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoadingOverlay from "../components/LoadingOverlay";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import {
  Card,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
} from "semantic-ui-react";
import Album from "./Album";
import Posts from "./Posts";
import Todos from "./Todos";

export default function UserDetails() {
  const { userId } = useParams();
  const { path, url } = useRouteMatch(); // /users/:userId, /users/1
  const [, , error] = useData(`/users/${userId}`, {});

  console.log(path, url);

  const [user, isLoading] = useData(`/users/${userId}`, null);
  const [albums] = useData(`/users/${userId}/albums`, []);

  if (error && error.status === 404) {
    console.log(error);
    return <Redirect to={"/users"} />;
  }

  return (
    <Container>
      <LoadingOverlay active={isLoading} />
      <TransitionGroup className="user-details-list">
        {user && (
          <CSSTransition classNames="modal-transition" timeout={500}>
            <Grid>
              <Grid.Column width={6}>
                <Card>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Header>{user.name}</Card.Header>
                    <Card.Meta>
                      <span className="date">{user.email}</span>
                    </Card.Meta>
                    <Card.Description>
                      {user.address.city}, <br /> {user.address.street} <br />
                      {user.address.zipcode}, <br />
                      <Link to={`${url}/posts`}>User posts</Link>
                      <br />
                      <Link to={`${url}/todos`}>User todos</Link>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>{user.company.name}</Card.Content>
                  <Card.Content extra>
                    <Icon name="camera" />
                    {albums.length} Albums
                    <List>
                      {albums.map((album, i) => (
                        <List.Item key={i}>
                          <Link to={`${url}/albums/${album.id}`}>
                            {album.title}
                          </Link>
                        </List.Item>
                      ))}
                    </List>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={10}>
                <Switch>
                  <Route exact path={path}>
                    <Header as="h3">Choose an action </Header>
                  </Route>
                  <Route path={`${path}/albums/:albumId`}>
                    <Album />
                  </Route>
                  <Route path={`${path}/posts`}>
                    <Posts />
                  </Route>
                  <Route path={`${path}/todos`}>
                    <Todos />
                  </Route>
                  <Route path="*">
                    <Header as="h3">Choose an action</Header>
                  </Route>
                </Switch>
              </Grid.Column>
            </Grid>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Container>
  );
}
