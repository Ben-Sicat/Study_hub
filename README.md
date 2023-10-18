# whats up idiots

# TRANSITION TAYO SA NEXT AIGHT?!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Set up git mothafucka

Rinespeto na nga kita eh. Pero anong ginawa mo? Tiger. Tiger, alam ko pero hindi ako rinespeto tiger. Isipin mo 'yon, tiger. Hindi ako rinespeto tiger. Mukha lang akong makasalanan, mukha lang akong lasinggero. Pero ginawa akong lasingero! Tiger isipin mo 'yon. Isipin mo 'yon, tiger. Ginawa akong lasinggero ng titser na yan?! Ha?! Ano?! Ginawa akong lasinggero niyan... pare isipin mo 'yun tiger. Ginawa akong lasinggero ng tarantado na 'yan. Isipin mo, tiger, isipin mo! Tignan mo! Tiger... Tiger hindi ako lasing. Tiger hindi ako lasing.

okay first things first, we need to install git in your machine.
here's the [link](https://git-scm.com/downloads)

now you'll need to open your git bash terminal para cool; pero pwede naman kahit anong terminal.

so now we'll need to set up your information in your machine para alam ni git where to send your code, llike which account

so you'll need to input these commands; you'll need to have your github accounts set up before doing these steps.

```bash
$ git config --global user.name "(your name in github)"
$ git config --global user.email your.email@example.com
```

Replace "your.email@example.com" with your GitHub email. now na na-input na natin mga shit na yan run

```bash
$ git config --list
```

and check if tama ba information

## Dev env

okay since we're gonna be doing some web development let's install Node sa machine nyo

[Node.js](https://nodejs.org/en/download)

and with that mag kakaron na tayo ng shit we call npm and yes lahat ng natutunan sa comp org is gagamitin natin; yyung cli commands

tangina visual studio tayo ha.

## Dev

anw since may version control na tayo lets clone the repository sa github
cloning is basically fetching the code sa github
respository is the place were all the project's files are stored

so by now I've probably asked you to send me your email para ma add ko kayo as collaborators sa repository. So what you'll want to do is to go to the repository and open your terminal.

make a directory for our project in your system

```bash
$ mkdir studyHub_system
```

or what ever folder name you want

tapos navigate tayo don with

```bash
$ cd studyHub_system
```

so habang nasa loob na tayo ng project directory what you'll want to do is punta sa repository natin sa github and click yung code button na color green and copy the link there, tthen run this command

```bash
$ git clone link
```

replace "link" with the link na na-copy nyo

then tada!!!!

so ofcourse we'll be regularly pushing code sa repository and hindi automatically ma update yung sa local version nyo

## Pushing and Pulling Code

Now that you've cloned the repository, let's talk about how to keep your local copy of the code in sync with the remote repository on GitHub.

## Branches

So syempre here's the one of the main reason why we're using git. para we can work on different parts of the code without affecting the master branch which is what is in production. So we'll be creating branches for each of you and you'll be working on that branch. So when you want to push your code you'll need to push it to your branch and not the master branch.

### Creating a Branch

```bash
$ git checkout -b branch-name
```

so ayan na create na natin yung branch nyo and you'll be working on that branch. So everytime you want to push your code you'll need to push it to that branch.

### Switching Branches

```bash
$ git checkout branch-name
```

so if you want to switch to another branch you'll need to run this command

and syempre mga idiots tayo sobrang daming branch na magagawa so you'll need to check what branch you're currently working on

```bash
$ git branch
```

and it will show you the branch you're currently working on and the other branches

so para maiwasan narin yung magulong tree, everytime we complete a task we'll create a branch specific for that task and after we're done with that task we'll merge it to the master branch and close it.

command is

```bash
$ git branch -d branch-name
```

replace "branch-name" with the branch you want to delete

### Pushing Code

When you make changes to the code and want to share those changes with others or save them to the remote repository, you'll need to push your code.
So that di nyo masira yung master branch which is what is in production.

so here's the command

```bash
$ git add .
#so we're staging the changes we did to the code. the '.' represents everything in the directory that has been changed pero pwede naman specific files lang

$ git commit -m "message"
# Commit your changes with a descriptive message para di naman super confusion ano pinupush nyo code

# Push your changes to the remote repository
$ git push origin master
```

Replace "master" with the branch youre working on.

And after all that syemmpre I'll be the one to merge the code to the master branch para di naman magulo and di nyo masira yung master branch so you'll need to go to github and create a pull request on your code. Pag ka open nyo ng repository natin sa github may makikita kayong button na "pull request" and click nyo lang yun and follow the instructions there.

## Pulling Code

syempre everytime mag start ka mag code and before mag push ng code you'll to make sure na latest yung code sa local machine mo so you'll need to pull the code from the remote repository.

```bash
$ git fetch origin master
# Fetch the latest code from the remote repository

$ git merge origin/master
# Pull the latest code from the remote repository

```

again replace "master" with the branch youre currently working on.

## Merging Code

So syempre we'll be working on different parts of the code and we'll be merging it to the master branch. So everytime you want to merge your code to the master branch you'll need to create a pull request on github. So pag ka open nyo ng repository natin sa github may makikita kayong button na "pull request" and click nyo lang yun and follow the instructions there.

## Attendance

Ramos, Eric - Done

poem by borat

In Kazakhstan, where sky so blue,
My mankini shines, my thong so true.
With hairy chest and crooked smile,
I'll make you laugh, just for a while.

I travel far, both near and yon,
To find the humor in everyone.
From fancy cities to the wild, wild West,
Borat's adventures are the zaniest, at best.

I wrestle with gypsies, in muddy delight,
And ask strange questions in the middle of night.
My accent, it's thick, like molasses in snow,
But I'm Borat from Kazakhstan, don't you know?

I bring a mirror to reflect your quirks,
And uncover your biases, with comedy that works.
With my camera in hand, and a notepad too,
I expose your prejudices, it's what I do!

So raise a glass, a shot of Kazakhstani brew,
To Borat, who'll always make you giggle and woo.
In a world so nutty, in satire we jest,
I'm Borat, from Kazakhstan, and I'm the best!
