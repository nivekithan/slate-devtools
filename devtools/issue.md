I created a devtool that can be used with `slate` and `slate-react` to help with debugging.

My first thought was to create a pull request not an issue.

But since the devtool lives inside my side project, extracting that and making sure that it works with slate's lint and other requirements is a excruciating job and I don't know even know whether you will be interested that's why I created a issue before pull request

Below I have mentioned the features and problem it solves. Please have a look at it and let me know whether you are interested or not so that I can make a pr.

# Problem it solves

As a educative project I am building a text editor and I choose to use slatejs for that but debugging the code is really though since I have to look at `value` and `operation` of editor to figure out the problem.

I tried `console.log({value, operation})` and chrome devtools which solved simple bugs but once the app started to become complex, the bugs are also started to become complex (isolating the bug and reproducing bug also became challenging)

Thats why I built a devtool which helps me in identifying what went wrong and where it went wrong and also helps in reproducing the error without messing with business logic.

The way how I solved it can be seen in Feature section

# Features

## 1. DevSlate

![Showcasing DevSlate features](https://recordit.co/RV0eX8HKx9.gif)

The `DevSlate` component renderers the initial value from your richtext example

```javascript
// Rich text example

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text:
          ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }],
  },
];
```

`DevSlate` on its own can be only used to see the value. But using that with `PropertiesEditor` and `RenderHistory` is where it shines.

## 2. PropertiesEditor

![Showcasing PropertiesEditor features](https://recordit.co/muy7DG8Qsn.gif)

`PropertiesEditor` can be used to edit the properties of a `Node`.

`PropertiesEditor` uses `JSON`. So as long as the the property is supported my `JSON` you can edit it.

`PropertiesEditor` does not support editing `children` but does support editing `text`

## 3. RenderHistory

![Showcasing RenderHistory features](https://recordit.co/opxJCincUQ.gif)

`RenderHistory` records every single `Operation` that happened to the editor and allows you to see those changes and it also even allows to you to go back to that state and continue from that.

I was able to achieve this functionality by writing a custom `withHistory` plugin

## 4. ScriptEditor

![Showcasing ScriptEditor Features](https://recordit.co/eWVD0U2xpn.gif)

It allows you write and run any valid javascript code and you can also use `Transfroms` to apply any operations to the editor

# Disclaimer

_This devtool is similar to react-query devtool not like react devtool_

_I created the devtool using [vitejs](https://vitejs.dev/) , [windicss](https://windicss.netlify.app/), [jotai](https://github.com/pmndrs/jotait)_

- vitejs instead of create-react-app
- windicss instead of tailwindcss
- jotai for state management instead of redux

By the way styling are just a prototype not final version.

---

I want to add more information about `devtools` but I think this is enough to make a decision about whether you are interested in this or not.

If you are not interested then you can close the issue.

If you still feel that information is not enough to make a decision or you are interested then I can make a pr and then we can discuss about other things.

Before I make a pr I just have one question

- Where I should I create the project? My plan is to create the project at `packages/slate-devtools` is this okay?
