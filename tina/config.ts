import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!, // ID Tina Cloud
  token: process.env.TINA_TOKEN!, // Token Tina Cloud
  build: {
    outputFolder: "admin", // cartella generata per l'admin
    publicFolder: "public", // cartella pubblica per media
  },
  media: {
    tina: {
      mediaRoot: "uploads", // sottocartella in /public per immagini
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Articoli",
        path: "content/posts",
        format: "mdx",
        ui: {
          filename: {
            slugify: (values) =>
              values?.title
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, ""),
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Data pubblicazione",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            options: [
              { value: "recensioni", label: "Recensioni" },
              { value: "schede-tecniche", label: "Schede Tecniche" },
              { value: "tutorial", label: "Tutorial" },
              { value: "news", label: "News" },
            ],
          },
          {
            type: "image",
            name: "coverImage",
            label: "Immagine di copertina",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenuto",
            isBody: true,
          },
        ],
      },
      {
        name: "pages",
        label: "Pagine Statiche",
        path: "content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titolo",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenuto",
            isBody: true,
          },
        ],
      },
    ],
  },
});


// Trigger Tina Cloud branch registration
// Trigger Tina Cloud branch registration