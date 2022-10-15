import express from "express";
import Video from "../models/Video";

// export const home = (req, res) => {
//   Video.find({}, (error, videos) => {
//     console.log("erros", error);
//     res.render("home", { pageTitle: "Home", videos });
//   });
// };

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("server-error");
  }
};

export const watch = (req, res) => {
  const { id } = req.params;
  res.render("watch", {
    pageTitle: `Watching `,
  });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  res.render("edit", {
    pageTitle: `Editing `,
  });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Uploading Video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Uploading Video",
      errorMessage: error._message,
    });
  }

  return res.redirect("/");
};
