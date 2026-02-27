"use server";

import bcrypt from "bcrypt";
import { getCollection } from "@/lib/db";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/rules";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";
// import { errors } from "jose";

export async function register(state, formData) {
  // this code delay the form registry
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const validatedFields = RegisterFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmpassword"),
  });

  // this is the updated code for zod pakage {"validationZodError"}
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      username: formData.get("username"),
      email: formData.get("email"),
    };
  }

  // extract the validated fields
  const { username, email, password } = validatedFields.data;

  // check if the user already exists
  const userCollection = await getCollection("users");
  if (!userCollection) {
    return { errors: { email: "server error" } };
  }

  // check if the user already exists
  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return { errors: { email: "User already exists" } };
  }

  // hash the password before storing it (omitted for brevity)
  const hashedPassword = await bcrypt.hash(password, 10);

  // store the user in the database
  const results = await userCollection.insertOne({
    username,
    email,
    password: hashedPassword,
  });

  // create a session
  await createSession(results.insertedId.toString());

  // redirect the user to an order page after successfully registering
  redirect("/dashboard");
}
// we use zod for validation (install zod package first)

export async function login(state, formData) {
  // validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // if any form fileds are invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  // extract form fields
  const { email, password } = validatedFields.data;

  // check if email exists in our DB
  const userCollection = await getCollection("users");
  if (!userCollection) return { errors: { email: "Server erro!" } };

  const existingUser = await userCollection.findOne({ email });
  if (!existingUser) return { errors: { email: "Invalid credentials." } };

  // check password
  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword) return { errors: { email: "Invalid credentials" } };

  // create session
  await createSession(existingUser._id.toString());

  console.log(existingUser);

  // redirect
  redirect("/dashboard");
}

// logot function
export async function logout() {
  const cookiestore = await cookies();
  cookiestore.delete("session");
  redirect("/");
}
