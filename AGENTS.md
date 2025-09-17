This file is destined to AI agents, to guide them through the task they are given.

# Context

This repository aims at deploying my portfolio to github pages.
The goal is to have a nice portfolio, with a polished look and fluid animations,
that present who I am, what I am looking for, what is my expertise, and
that showcase my achievements with visuals like images or videos.

# Environment Setup

When installing an npm package, you MUST use npm, and not another package manager.

I already configured tailwindcss to work with vite. It is FORBIDDEN to change my tailwindcss setup without presenting me beforehand why it is needed. Specifically, we don't need postcss here, tailwindcss is configured as a vite plugin.

I configured a venv with python and playwright installed, so that you can run the verification you need (cf. jules-scratch folder).

# Rules

- The data about me is all contained and structure in yaml files, in the data folder, and should be the only source of truth of the information to include in the portfolio.
- We should have a responsive layout (DesktopLayout/MobileLayout), and a UX thought to adapt to mobile users. The ...Layout components should only delimit which part of the screen is dedicated to which content type. Then we will have specific components to handle and display the data from the yaml files.
- The theme of the app should remain customizable: for this, we define a set of tokens (cf. the theme folder) to unify the css when it comes to colors or typographies. Those tokens should be used in absolute priority for the classNames, and we should fallback to tailwindcss classNames for things not covered by the theme.

# Content structure

The content structure is subject to change. Currently, we model the portfolio in the following way.

## Sections

The portfolio is a single page application. It has several sections, and we should be able to display eachs ection when clicking on it.

Main sections of the portfolio:

- About (who I am, what I am looking for currently, what is the skill set I am focused on currently)
- Journey (what are my past experiences, from the most recent to the last)
- Contact (every information to contact me)

Each section should have its corresponding yaml file to define the corresponding information.

## Journey

My journey is composed of periods of work, and each can contain 1 or more missions. Each mission is presented with the problem -> solution -> result pattern, and have corresponding hard and soft skills that it allowed me to work on. Finally, each mission can also have materials like images, videos or links, to showcase my work.

The layout of the journey section is therefore divided into 4 parts:

- a timeline to travel through the various periods of work
- a part dedicated to present the problem -> solution -> results pattern
- a part dedicated to show the skills used
- a part to show the supplementary materials (carousel for images or videos, and/or a list displaying the links)
