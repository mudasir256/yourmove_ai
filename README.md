# YourMove UI

## Thank you 🙏

First and foremost, I just wanted to thank you for choosing me to complete your project for you, I really appreciate it! I hope you are pleased with what I have provided. If at any moment you have any questions about it or issues, please do not hesitate to reach out to me on Uplink.

Thanks again!

## Introduction

The UI is a TypeScript based React project built with [Vite](http://vitejs.dev) and some other libraries.

It uses:

- `TailwindCSS` for styling
- `Heroicons` for icons
- `HeadlessUI` for some transitions
- `Axios` for HTTP requests
- `Zustand` for state management
- `Formik` for forms
- `yup` for validation
- `stripe` for payment stuff

# Environment File

The UI requires the location of the YourMove API. It retrieves this using the environment file in the root directory of the project `.env` or the environment itself.

It looks like:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

The above value is for local development only. You can copy `.env-example` and rename it `.env`. When
deployed, this value is the URL of the deployed API.

## Running the UI

After pulling the code you need to install dependencies (you only need to do this once and then everytime the dependencies change).

```
npm install
```

Then, to run the UI, simply run:

```
npm run dev
```

## Conclusion/Contact

I think that just about does it! If at any point you run into any issues with setup, or you have any queries or questions, please do not hesitate to contact me. Your satisfaction is my number one priority!

Thank you again for choosing me to work on your project, I hope we get to work to again together in the future!!
