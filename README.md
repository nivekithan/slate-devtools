# The project is in development

`slate-devtools` as name suggests it is devtool for [slatejs](https://github.com/ianstormtaylor/slate) which will assist you in debugging the code

To know about features take loot at this [issue](https://github.com/ianstormtaylor/slate/issues/4112)

# Features

Currently working on finishing these tasks

- [x] Provide some feedback on current state in `RenderHistory`
- [x] Differentiate between operations happened in devtools and operations happened in app
- [x] Update the working of `AppOperations` so that every single of batch of operations will not be considered as single operation
- [x] Add a cleanup function so that unnecessary operations in `RenderHistory` will not be shown

# Roadmap

- [x] Release the tool in npm
- [x] Features
- [ ] Improve the look
- [ ] Write tests
- [ ] Add support for multiple editors

You can try the `slate-devtools` in your project by

```bash
npm i -D slate-devtools
```

Once you installed you can use devtools in your project

```typescript

import {Devtools} from "slate-devtools"

const Editor = () => {

    const [value, setValue] = useState(initaialValue);
    const editor = useMemo(() => withReact(createEditor()), []);

    return (
        <div>
            <div>
                <Slate value={value} editor={editor} onChange={setValue}>
                    <Editable>
                </Slate>
            </div>
            <Devtools value={value} editor={editor} />
        </div>
    )
}

```

The props for `Devtools` are

```typescript
type DevtoolsProps = {
  value: Node[]; // NodeList value to show in devtools
  editor: ReactEditor; // Corresponding editor
  module?: {
    [index: string]: unknown;
  };
  open?: boolean;
  height?: string;
  style?: CSSProperties;
};
```

## `value`

`value` takes `Node[]` which you pass to `editor`

## `editor`

`editor` takes `ReactEditor` of the `value` you passed

## module

The `module` takes an object whose `value` will be exposed by their `keys` in `ScriptEditor`

## open

Setting `open` to `true` will make the `Devtools` to open by default.

By default it is set to `false`

## height

Set the height of the `Devtools` by default it is `325px`

## style

Use it to change the position of the `Open Button`

# Disclaimer

The project is in super early life of its development as a result I still didnt implement any animations, visual feedback is not good enough, its not responsive, styling can be improved a lot, `RenderHistory` does not provide a lot of useful information and it is filled with unnecessary information.

I am working on fixing these as soon as possible
