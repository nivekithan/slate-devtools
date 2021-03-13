# Project is in development

You can try the `slate-devtools` in your project by

```bash
npm i -D slate-devtools jotai
```

We need to install `jotai` because for some reason `esbuild` is throwing error when I tried to build. You can check the issue [here](https://github.com/pmndrs/jotai/issues/354)

If you know solution for this please let me know.

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
