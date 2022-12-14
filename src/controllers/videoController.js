import express from "express";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

const isHeroku = process.env.NODE_ENV === "production";

// export const home = (req, res) => {
//   Video.find({}, (error, videos) => {
//     console.log("erros", error);
//     res.render("home", { pageTitle: "Home", videos });
//   });
// };

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ createdAt: "desc" })
      .populate("owner");
    // console.log(videos);
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    return res.render("server-error");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner").populate("comments");
  // owner object 전체를 가져다가 채워준다
  if (!video) {
    //check if video is null
    return res.status(404).render("404", { pageTitle: "Video not found." });
    //without return, javascript will execute the following code as well
  }
  // console.log(video.hashtags);
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    //type이 다르기 때문에 String으로 만들어서 비교함
    req.flash("error", "Not authorized (Owner does not match)");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: video.title, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  // lowercase video: video object in my database
  // uppercase Video: video model
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    //type이 다르기 때문에 String으로 만들어서 비교함
    // console.log("video owner", video.owner, "user", _id);
    req.flash("error", "Not authorized (Owner does not match)");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Uploading Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { video, thumb } = req.files;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: isHeroku ? video[0].location : video[0].path,
      thumbUrl: isHeroku ? thumb[0].location : thumb[0].path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Uploading Video",
      errorMessage: error._message,
    });
  }
  return res.redirect("/");
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    //type이 다르기 때문에 String으로 만들어서 비교함
    req.flash("error", "Not authorized (Owner does not match)");
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const tagSearch = async (req, res) => {
  const keyword = `#${req.params.id}`;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      hashtags: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render("home", {
    pageTitle: `${keyword} search`,
    videos,
    description: `Videos tagged ${keyword}`,
  });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404); // send the status and kill the request
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  await video.save();
  return await res.status(201).json({ newCommentId: comment._id }); //201: created a new ressource
};

export const removeComment = async (req, res) => {
  const {
    session: { user },
    params: { id },
  } = req;

  // console.log(id, user);
  const comment = await Comment.findById(id);
  if (!comment) {
    return res.sendStatus(404); // send the status and kill the request
  }
  // console.log(comment.owner);
  if (String(user._id) !== String(comment.owner)) {
    req.flash("error", "Not authorized (Owner does not match)");
    return res.sendStatus(403); // send the status and kill the request
  }
  await Comment.findByIdAndDelete(id);
  return res.sendStatus(200);
};
