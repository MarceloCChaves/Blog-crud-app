import { IPost } from "../../interfaces/IPost";
import { FiEdit, FiTrash } from "react-icons/fi";
import "./Post.css";
import { useState } from "react";
import Modal from "react-modal";

const Post = ({
  content,
  created_datetime,
  title,
  id,
  username,
  deletePost,
  editPost,
  setEditedTitle,
  setEditedContent,
}: IPost) => {
  let Username = JSON.parse(localStorage.getItem("username") || "{}");
  const postDate = new Date(created_datetime);
  const fullDatePost = `${
    postDate.getMonth() + 1
  }/${postDate.getDate()}/${postDate.getFullYear()} at ${postDate.getHours()}:${
    postDate.getMinutes() < 10
      ? "0" + postDate.getMinutes()
      : postDate.getMinutes()
  }`;
  const [modalIsOpenDelete, setIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  return (
    <div className="post-container" key={id}>
      <div className="post-title">
        <p>{title}</p>
        {Username === username ? (
          <div className="post-icons">
            <button
              onClick={() => {
                setIsOpenDelete(!modalIsOpenDelete);
              }}
            >
              <FiTrash size={25} />
            </button>
            <button
              onClick={() => {
                setIsOpenEdit(!modalIsOpenEdit);
              }}
            >
              <FiEdit size={25} />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="post-info">
        <p>@{username}</p>
        <p>{fullDatePost}</p>
      </div>
      <p className="post-content">{content}</p>
      {modalIsOpenDelete && (
        <Modal isOpen={modalIsOpenDelete} className="post-modal">
          <h3>Are you sure you want to delete this item?</h3>
          <div className="post-modal-buttons">
            <button
              type="button"
              className="post-modal-buttons-cancel"
              onClick={() => {
                setIsOpenDelete(!modalIsOpenDelete);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="post-modal-buttons-delete"
              onClick={() => deletePost(id)}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
      {modalIsOpenEdit && (
        <Modal isOpen={modalIsOpenEdit} className="post-modal">
          <div className="post-modal-inputs">
            <h3>Edit item</h3>
            <p>Title</p>
            <input
              type="text"
              value={title}
              placeholder="Hello world"
              onChange={(event) => setEditedTitle(event.target.value)}
            />
            <p>Content</p>
            <textarea
              cols={30}
              rows={5}
              value={content}
              placeholder="Content here"
              onChange={(event) => setEditedContent(event.target.value)}
            ></textarea>
            <div className="post-modal-buttons">
              <button
                type="button"
                className="post-modal-buttons-cancel"
                onClick={() => {
                  setIsOpenEdit(!modalIsOpenEdit);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="post-modal-buttons-edit"
                onClick={() => editPost(id)}
              >
                Edit
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Post;
