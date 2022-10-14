import express from "express";

const fakeUser = {
  username: "Nicolas",
  loggedIn: false,
};

export const trending = (req, res) => {
  const videos = [
    {
      title: "Hello",
      rating: 5,
      comments: 2,
      createdAt: "2 minutes ago",
      views: 59,
      id: 1,
    },
    {
      title: "Video #2",
      rating: 4,
      comments: 20,
      createdAt: "2 hours ago",
      views: 60,
      id: 2,
    },
    {
      title: "Whatsup",
      rating: 5,
      comments: 3,
      createdAt: "1 week ago",
      views: 100,
      id: 3,
    },
  ];
  res.render("home", { pageTitle: "Home", fakeUser: fakeUser, videos });
};

export const watch = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
