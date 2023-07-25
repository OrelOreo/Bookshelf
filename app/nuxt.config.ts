// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'fr'
            },
            title: "Bookshelf",
            meta: [
                { charset: "utf-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1"
                },
                {
                    name: "keywords",
                    content: "Bookshelf, livre, Bibliothèque, Favoris, Collection, Ajouter, Enregistrer, Note, Catégorie, Modifier, Supprimer, Liste, Gestion des livres, application web, formulaire"
                },
                {
                    name: "description",
                    content: "Bookshelf est une application Web où vous pouvez ajouter vos livres favoris dans une bibliothèque en ligne personnalisée. Stockez les détails de chaque livre, attribuez-leur une note et partagez vos commentaires. Découvrez une nouvelle façon de gérer votre collection de livres avec Bookshelf !"
                }
            ]
        }
    },
    modules: ['@pinia/nuxt','@nuxtjs/tailwindcss'],
    typescript: {
        strict: true
    },
    runtimeConfig: {
        public: {
            API_SERVER: process.env.API_SERVER_URL,
        }
      }
})
