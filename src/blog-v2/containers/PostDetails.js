import React from "react";
import useData from "../hooks/useData";
import { useParams, Redirect, Link } from "react-router-dom";
import { Container, Feed, List, Comment, Header } from "semantic-ui-react";
import LoadingOverlay from "../components/LoadingOverlay";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function PostDetails() {
  const { postId } = useParams();

  console.log(postId);

  const [post, isLoading] = useData(`/posts/${postId}`, null);
  const [, , error] = useData(`/posts/${postId}`, {});
  const [comments] = useData(`/posts/${postId}/comments`, []);

  if (error && error.status === 404) {
    console.log(error);
    return <Redirect to={"/posts"} />;
  }

  return (
    <Container>
      <LoadingOverlay active={isLoading} />
      <TransitionGroup className="posts-details-list">
        {post && (
          <CSSTransition classNames="modal-transition" timeout={500}>
            <Feed.Event>
              <Feed.Label image="https://react.semantic-ui.com//images/avatar/small/joe.jpg" />
              <Feed.Content>
                <Feed.Summary>
                  <Link to={`/users/${post.userId}`}>{post.title}</Link>
                  <Feed.Date>3 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>{post.body}</Feed.Extra>
                <Feed.Meta>
                  <Feed.Content>
                    <Header>Comments</Header>
                    <List>
                      {comments.map((comment) => (
                        <Comment>
                          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                          <Comment.Content>
                            <Comment.Author as="a">
                              {comment.name}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.body}</Comment.Text>
                            <Comment.Actions>
                              <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      ))}
                    </List>
                  </Feed.Content>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Container>
  );
}
