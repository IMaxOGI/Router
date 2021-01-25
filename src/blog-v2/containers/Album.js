import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { Container, Header, Image } from "semantic-ui-react";
import LoadingOverlay from "../components/LoadingOverlay";
import useData from "../hooks/useData";
import Glide from "../components/Glide";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function Album() {
  const { userId, albumId } = useParams();
  const [album, , error] = useData(`/albums/${albumId}`, {});
  const [photos, isFetching] = useData(`/albums/${albumId}/photos`, []);

  if (error && error.status === 404) {
    console.log(error);
    return <Redirect to={`/users/${userId}`} />;
  }

  return (
    <Container>
      <LoadingOverlay active={isFetching} />
      <TransitionGroup className="album-list">
        <Header>{album.title}</Header>
        {photos.length > 0 && (
          <CSSTransition classNames="modal-transition" timeout={500}>
            <Glide>
              {photos.map((photo) => (
                <Image src={photo.url} rounded />
              ))}
            </Glide>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Container>
  );
}
