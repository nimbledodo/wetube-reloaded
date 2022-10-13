import express from "express";

export const trending = (req, res) => res.send("Hpme page Videos");
export const watch = (req, res) => res.send(`Watch Video #${req.params.id}`);
export const edit = (req, res) => res.send("Edit Video");
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
