import express from "express";
import Video from "../models/Video";

export const home = (req, res) => {
  Video.find({}, (error, videos) => {
    console.log("erros", error);
    res.render("home", { pageTitle: "Home", videos });
  });
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

export const postUpload = (req, res) => {
  return res.redirect("/");
};
