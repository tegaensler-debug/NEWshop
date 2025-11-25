"use server";

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { BlogFormSchema } from "@/lib/rules";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(state, formData) {  
  // check if user is signed in
  const user = await getAuthUser();
  if (!user) return redirect("/login");

  //validate form data
  const title = formData.get("title");
  const content = formData.get("content");

  const validatedFields = BlogFormSchema.safeParse({ title, content });

  //if form data is invalid, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  //save post to database
  try {
    const postsCollection = await getCollection("posts");
    await postsCollection.insertOne({
      title: validatedFields.data.title,
      content: validatedFields.data.content,
      userId: ObjectId.createFromHexString(user.userId),
    });
  } catch (error) {
    return {
      errors: { general: "Failed to create post. Please try again." },
      title,
      content,
    };
  }

  // Here you would typically store the post in a database
  redirect("/dashboard");
}

export async function UpdatePost(state, formData) {
  // check if user is signed in
  const user = await getAuthUser();
  if (!user) return redirect("/login");

  //validate form data
  const title = formData.get("title");
  const content = formData.get("content");
  const postId = formData.get("postId");

  const validatedFields = BlogFormSchema.safeParse({ title, content });

  //if form data is invalid, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      title,
      content,
    };
  }

  // find the post
  const postsCollection = await getCollection("posts");
  const post = await postsCollection.findOne({
    _id: ObjectId.createFromHexString(postId),
  });

  // check if the user owns this post
  if (user.userId !== post.userId.toString()) return redirect("/");

  //update post to database
  postsCollection.findOneAndUpdate(
    { _id: post._id },
    {
      $set: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
      },
    }
  );

  // Here you would typically store the post in a database
  redirect("/dashboard");
}

export default async function deletePost(formData) {
  // Check if the user is signed in
  const user = await getAuthUser();
  if (!user) return redirect("/");

  // Find the post
  const postsCollection= await getCollection('posts')
  const post = await postsCollection.findOne({
    _id: ObjectId.createFromHexString(formData.get('postId')) 
  })

  // check if the auth user is the owns the post
  if (user.userId !== post.userId.toString()) return redirect("/");

  // Delete post
  postsCollection.findOneAndDelete({_id: post._id})

  revalidatePath("/dashboard")  
}