import React from "react";
import { Container, Feed } from "semantic-ui-react";
import LoadingOverlay from "../components/LoadingOverlay";
import { Link, useParams } from "react-router-dom";
import useData from "../hooks/useData";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function Post() {
  const { userId } = useParams();
  const postsPath = userId ? `/users/${userId}/posts` : "/posts";
  const [posts, isLoading] = useData(postsPath, []);
  console.log(posts);

  return (
    <Container>
      <LoadingOverlay active={isLoading} />
      <TransitionGroup className="posts-list">
        {posts.map((post, id) => (
          <CSSTransition classNames="modal-transition" timeout={500} key={id}>
            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com//images/avatar/small/joe.jpg" />
              <Feed.Content>
                <Feed.Summary>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  <Feed.Date>3 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>{post.body}</Feed.Extra>
                <Feed.Meta></Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Container>
  );
}
