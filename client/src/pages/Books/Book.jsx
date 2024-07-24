import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/failure.css";
import "react-simple-toasts/dist/theme/success.css";
import Image from "./Image";
import "./Book.css";
import Dashboard from "../../components/Dashboard/Dashboard";
function Book() {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [uploadImg, setUploadImg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    previewFiles(file);
  };
  // render preview files
  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    console.log(image);
  };
  //handle the upload image and submit the form fields
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const result = await axios.post(
        "http://localhost:3000/api/books/admin/newbooks",
        {
          image: image,
          title: title,
          description: description,
          author: author,
          amount: amount,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      console.log(result);

      if (result && result.data) {
        console.log("Result Data:", result.data);
        toast(result.data.message, { theme: "success" });
        // if (result.data.public_id) {
        //   const uploadedImg = result.data.public_id;
        //   // console.log(uploadedImg)
        //   setUploadImg(uploadedImg);
        //   toast(message, { theme: "success" });
        // } else {
        //   console.log("public_id is undefined in the response data");
        // }
      }
    } catch (error) {
      console.log("Error during handleSubmit:", error);
      toast(message, { theme: "failure" });
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  return (
    <div>
      <Dashboard />
      <div className="flexContainer">
        <div className="title">
          {" "}
          <h3 className="title1">
            {loading ? <p>Please wait...</p> : <p>add books</p>}
          </h3>
        </div>

        <div className="formContainer" onSubmit={(e) => handleSubmit(e)}>
          <form action="" className="book">
            <input type="file" onChange={(e) => handleChange(e)} />
            <label htmlFor="title">title</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
            <label htmlFor="author">author</label>
            <input
              type="text"
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />

            <label htmlFor="description">description</label>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="amount">amount</label>
            <input
              type="number"
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />

            <button>submit</button>
          </form>
          <div className="showimg">
            <img src={image} alt="picture of an image" />
          </div>

          {/* <Image  uploadImg={uploadImg}  /> */}
        </div>
      </div>
    </div>
  );
}

export default Book;
