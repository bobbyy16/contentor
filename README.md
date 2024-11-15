# Overview

**Contentor** is a content-generating AI tool designed to streamline the creation of engaging and relevant content.

![Alt text](https://github.com/bobbyy16/contentor/blob/main/public/homePage.png)

## Table of Contents

1. [Introduction](#introduction)

2. [Tech Stack](#tech-stack)

3. [Features](#features)

4. [Installation Guide](#installation-guide)

5. [Contributing Guide](#contributing-guide)

## ✨🎈Introduction

Contentor is a web-based application built using **Next.js** and **TypeScript**. It is designed to create AI-driven content generation tools with modern development frameworks. The project aims to provide efficient and scalable content workflows to improve productivity, and it is deployable via **Vercel** for quick and easy hosting.

## ⌨️Tech Stack

- **React**: A JavaScript library for building user interfaces.

- **Next.js**: A React framework for server-side rendering and static site generation.

- **Gemini**: (Add a short description of its use in your project).

- **Clerk**: Authentication and user management made simple.

- **TailwindCSS**: A utility-first CSS framework for rapid UI development.

- **TypeScript**: A typed superset of JavaScript that adds static typing.

## 💻Features

- AI-driven content generation.

- Scalable and efficient automated content workflows.

- Server-side rendering and static site generation using Next.js.

- Integrated user management and authentication via Clerk.

- Stylish, responsive design using TailwindCSS.

- Easy deployment through Vercel.

## 🧑🏻‍💻Installation Guide

1.  _Clone this repository to your local machine:_

```
git clone https://github.com/bobbyy16/contentor.git
cd contentor
```

2.  _Install the required dependencies:_

```
npm install
```

3.  _Setup environment variables_

Create a .env.local file in the root directory and add the following values:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_GEMINI_API_KEY=
NEXT_PUBLIC_DRIZZLE_DB=
```

4.  _Run the application_

For development:

```
npm run dev
```

For production:

```
npm run build
npm start
```

## 📦 Settingup NeonDB and Clerk

1. Go to [Neon](https://neon.tech/) and sign up for a new account or log in if you already have one.

### Step 2: Create a Database

1. In your Neon dashboard, click on **Create Database**.

2. Enter a name for your database and select your preferred region.

3. Click on **Create** to provision your new database.

4. Choose next.js and go to tab .env just below and copy the 'DATABASE_URL'

5. Update your `.env.local` file to include the connection string:

## Creating Clerk

1. Create application in [Clerk](https://clerk.com/)

2. Choose next.js

3. In second step copy all the content of .env.local from **_clerk_** platform

4. Paste it in .env.local in your local machine

## 🛠️ Contributing Guide

1. Fork the repository

2. Create a feature branch (`git checkout -b feature-name`)

3. Commit your changes (`git commit -am 'Add new feature'`)

4. Push to the branch (`git push origin feature-name`)

5. Create a new Pull Request
