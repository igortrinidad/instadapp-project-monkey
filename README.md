# ChatGPT Prompt Generator

This repository contains a project built with Nuxt.js 3 that aims to assist users in generating prompts for ChatGPT with customized inputs using the OpenAI API integration.

## Overview

The Project Monkey ChatGPT Prompt Generator is a web application that allows users to easily create prompts for interacting with the OpenAI ChatGPT API. The application provides a user-friendly interface where users can input their desired conversation context and generate custom inputs for the prompts based on their specific requirements.

## Features

- **User-Friendly Interface:** The application offers a clean and intuitive interface, making it easy for users to navigate and generate prompts.
- **Customizable Inputs:** Users can input their desired conversation context, including both user messages and assistant responses. They have the flexibility to specify different conversation turns, allowing for more dynamic and interactive prompts.
- **OpenAI API Integration:** The project leverages the OpenAI API integration to interact with the ChatGPT model, enabling users to generate responses based on their customized prompts.
- **Copy to Clipboard:** Generated prompts can be copied to the clipboard with a single click, facilitating easy integration into other applications or platforms.

## Getting Started

To run the ChatGPT Prompt Generator locally, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/igortrinidad/project-monkey-prompt-generator
```

2. Install the dependencies:

```shell
cd project-monkey-prompt-generator
cp .env.example .env # Add your own OpenAi api key
npm install
npm run serve
```

3. Start the development server:

```shell
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. Input your desired conversation context by adding user messages and assistant responses in the provided text fields.
2. Click the "Run Prompt" button to create a prompt based on the input conversation.
3. Copy the generated prompt to the clipboard using the "Copy to Clipboard" button.
4. Utilize the prompt in your ChatGPT interactions with the OpenAI API.

## Contributing

Contributions to the ChatGPT Prompt Generator project are welcome! If you encounter any bugs, have feature requests, or want to contribute enhancements, please submit an issue or create a pull request.

## License

The ChatGPT Prompt Generator is open source and available under the [MIT License](https://opensource.org/licenses/MIT). Feel free to modify and distribute the code according to the terms of the license.

## Acknowledgements

- The project utilizes the [Nuxt.js](https://nuxtjs.org) and [TailwindCSS](https://tailwindcss.com) for building the web application.
- The OpenAI API integration enables interaction with the ChatGPT model.