# vFileField

## Slots

| Name      | Description |
| --------- | ----------- |
| `default` | &nbsp;      |

## Props

| Name       | Type                     | Description | Default     |
| ---------- | ------------------------ | ----------- | ----------- |
| `accept`   | `String`                 |             | `undefined` |
| `v-model`  | `Object` &#124; `String` |             | `undefined` |
| `required` | `Boolean`                |             | `false`     |

## Data

| Name              | Type      | Description | Initial value |
| ----------------- | --------- | ----------- | ------------- |
| `currentFileName` | `unknown` |             | `null`        |
| `currentFileData` | `any`     |             | `undefined`   |
| `isFileLoaded`    | `boolean` |             | `false`       |
| `isChipOpen`      | `boolean` |             | `true`        |

## Methods

### reset()

**Syntax**

```typescript
reset(): void
```

### validate()

**Syntax**

```typescript
validate(): unknown
```

### fileSelected()

**Syntax**

```typescript
fileSelected(e: unknown): void
```

### openDialog()

**Syntax**

```typescript
openDialog(): void
```

### loadData()

**Syntax**

```typescript
loadData(): void
```
