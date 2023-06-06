import { useEffect, useState } from "react";
import api from "../../actions/api";
import Post from "../../components/Post/Post";
import { IPost } from "../../interfaces/IPost";
import "./Posts.css";
import { FiLogOut } from 'react-icons/fi'
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let Username = JSON.parse(localStorage.getItem("username") || "{}");

  useEffect(() => {
    api
      .get("/careers/")
      .then((res) => {
        setPosts(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const submitPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api
      .post("/careers/", {
        username: Username,
        title: titleInput,
        content: contentInput,
      })
      .then(() => {
        alert("Success");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deletePost = async (deletedPost: IPost) => {
    try {
      await api.delete(`/careers/${deletedPost.id}/`);
      posts.filter((post) => post.id !== deletedPost.id);
      setPosts([...posts]);
      alert("Success");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const editPost = async (editedPost: IPost) => {
    try {
      const response = await api.put(`/careers/${editedPost.id}/`, {
        title: titleInput,
        content: contentInput
      });
      setPosts(response.data);
      alert("Success");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="posts-container">
      <div className="posts-content">
        <nav className="posts-navbar">
          <h3>CodeLeap Network</h3>
          <Link to="/"  title="Logout">
            <FiLogOut size={20} color={'#fff'}/>
          </Link>
        </nav>
        <form className="posts-form" onSubmit={submitPost}>
          <div className="posts-inputs">
            <h3>Hey {Username}, What's on your mind?</h3>
            <p>Title</p>
            <input
              type="text"
              value={titleInput}
              placeholder="Hello world"
              onChange={(event) => setTitleInput(event.target.value)}
            />
            <p>Content</p>
            <textarea
              cols={30}
              rows={5}
              value={contentInput}
              placeholder="Content here"
              onChange={(event) => setContentInput(event.target.value)}
            ></textarea>
            <div className="posts-button">
              <button
                type="submit"
                disabled={titleInput === "" || contentInput === ""}
              >
                Create
              </button>
            </div>
          </div>
          {isLoading ? (
            <h2 className="posts-loading">Loading posts...</h2>
          ) : (
            posts.map((post: IPost) => {
              return (
                <>
                  <Post
                    key={post.id}
                    content={post.content}
                    id={post.id}
                    created_datetime={post.created_datetime}
                    title={post.title}
                    username={post.username}
                    deletePost={() => deletePost(post)}
                    editPost={() => editPost(post)}
                    setEditedTitle={setTitleInput}
                    setEditedContent={setContentInput}
                  />
                </>
              );
            })
          )}
        </form>
      </div>
    </div>
  );
};

export default Posts;
