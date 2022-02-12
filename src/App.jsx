import Navbar from "./components/Navbar";
import "./app.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { InputForm } from "./components/InputForm";
import TextComment from "./components/TextComment";

function App() {
  const initialValues = { nama: "", email: "", comments: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
    //eslint-disable-next-line
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.nama) {
      errors.nama = "Wajib diisi!";
    }
    if (!values.email) {
      errors.email = "Format email salah!";
    } else if (!regex.test(values.email)) {
      errors.email = "Ini bukan format email yang valid!";
    }
    if (!values.comments) {
      errors.comments = "Wajib diisi!";
    }
    return errors;
  };

  const [comments, setComments] = useState([]);
  const url = process.env.REACT_APP_COMMENTS_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  const handleUpvote = (id) => {
    const newComments = comments.map((comment) => {
      if (comment.id === id) {
        comment.point += 1;
      }
      return comment;
    });
    setComments(newComments);
  };

  const handleDownvote = (id) => {
    const newComments = comments.map((comment) => {
      if (comment.id === id) {
        comment.point -= 1;
      }
      return comment;
    });
    setComments(newComments);
  };

  const handleReplyUpvote = (id) => {
    const newComments = comments.map((comment) => {
      comment.replies.map((reply) => {
        if (reply.id === id) {
          reply.point += 1;
        }
        return reply;
      });
      return comment;
    });
    setComments(newComments);
  };

  const handleReplyDownvote = (id) => {
    const newComments = comments.map((comment) => {
      comment.replies.map((reply) => {
        if (reply.id === id) {
          reply.point -= 1;
        }
        return reply;
      });
      return comment;
    });
    setComments(newComments);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="main-wrapper">
          <div className="content-post">
            <h1>
              Lampu Webcam tiba-tiba menyala sendiri tanpa membuka aplikasi
              webcam
            </h1>
            <p>
              Mau tanya, akhir-akhir ini webcam sering nyala sendiri. Apakah ada
              yang tahu penyebabnya dan solusi untuk memperbaiki hal itu? Apakah
              ada kemungkinan laptop saya di-hack karena kasus terjadi tiap
              terkoneksi di internet.
            </p>
            <div className="comments-section">
              <h2>
                <span>Komentar</span>
              </h2>
              {comments.map((comment) => (
                <div className="comments-post" key={comment.id}>
                  <div className="img-profile">
                    <img
                      src={comment.avatar}
                      style={{ width: "80px", height: "80px" }}
                      alt="profile"
                    />
                  </div>
                  <div className="comments-content">
                    <h4>{comment.author}</h4>
                    <span>{comment.date}</span>
                    <p>{comment.message}</p>
                    <div className="vote-section">
                      <span>{comment.point} Point</span>
                      <button
                        className="btn-upvote"
                        onClick={() => handleUpvote(comment.id)}
                      >
                        <i className="fa fa-arrow-up icon"></i>
                      </button>
                      <button
                        className="btn-downvote"
                        onClick={() => handleDownvote(comment.id)}
                      >
                        <i className="fa fa-arrow-down icon"></i>
                      </button>
                    </div>
                    {comment.replies.map((reply) => (
                      <div className="reply-comments-post" key={reply.id}>
                        <div className="img-profile">
                          <img
                            src={reply.avatar}
                            style={{ width: "50px", height: "50px" }}
                            alt="profile"
                          />
                        </div>
                        <div className="reply-comments-content">
                          <h4>{reply.author}</h4>
                          <span>{reply.date}</span>
                          <p>{reply.message}</p>
                          <div className="reply-vote-section">
                            <span>{reply.point} Point</span>
                            <button
                              className="reply-btn-upvote"
                              onClick={() => handleReplyUpvote(reply.id)}
                            >
                              <i className="fa fa-arrow-up icon"></i>
                            </button>
                            <button
                              className="reply-btn-downvote"
                              onClick={() => handleReplyDownvote(reply.id)}
                            >
                              <i className="fa fa-arrow-down icon"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="add-comments-section">
              <h2>
                <span>Tambahkan Komentar</span>
              </h2>
            </div>
            <div className="wrapper-form">
              <form onSubmit={handleSubmit}>
                <InputForm
                  type="text"
                  name="nama"
                  placeholder="Nama"
                  value={formValues.nama}
                  onChange={handleChange}
                  isSubmit={isSubmit}
                />
                <p>{isSubmit && formErrors.nama}</p>
                <InputForm
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleChange}
                  isSubmit={isSubmit}
                />
                <p>{isSubmit && formErrors.email}</p>
                <TextComment
                  name="comments"
                  rows="10"
                  placeholder="Komentar Anda"
                  value={formValues.comments}
                  onChange={handleChange}
                  isSubmit={isSubmit}
                />
                <p>{isSubmit && formErrors.comments}</p>
                <button type="reset" className="btn-reset">
                  Reset
                </button>
                <button className="btn-submit">Submit</button>
              </form>
            </div>
          </div>
          <div className="post-popular">
            <h3>Diskusi 5 Teratas</h3>
            <div className="post-list">
              <div className="post-item">
                <div className="box-number">
                  <p>1</p>
                </div>
                <a href="/">Bersihkan laptop dari butiran debu</a>
              </div>
              <div className="post-item">
                <div className="box-number">
                  <p>2</p>
                </div>
                <a href="/">Cara akses website menggunakan koneksi openVPN</a>
              </div>
              <div className="post-item">
                <div className="box-number">
                  <p>3</p>
                </div>
                <a href="/">Batas aman overclock PC rakitan</a>
              </div>
              <div className="post-item">
                <div className="box-number">
                  <p>4</p>
                </div>
                <a href="/">
                  Cara mengetahui akun facebook di-hack melalui aplikasi
                </a>
              </div>
              <div className="post-item">
                <div className="box-number">
                  <p>5</p>
                </div>
                <a href="/">
                  Tutorial: langkah-langkah mencegah website untuk track user
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
